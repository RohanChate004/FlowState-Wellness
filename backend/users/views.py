from django.db.models import Sum
from meditation.models import MeditationSession
from yoga.models import YogaSession
from datetime import date, timedelta, timezone

from django.contrib.auth import logout

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import DailyWellness

from .serializers import (
    RegisterSerializer,
    EmailLoginSerializer,
    DailyWellnessSerializer,
)

class RegisterView(APIView):

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.save()

            return Response(
                {
                    "message": "Account created successfully.",
                    "user": {
                        "id": user.id,
                        "name": user.first_name,
                        "email": user.email,
                    },
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )



class LoginView(TokenObtainPairView):

    serializer_class = EmailLoginSerializer

class GoogleJWTView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Google authentication required."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        user = request.user

        if not user.is_active:
            return Response(
                {"detail": "This account is inactive."},
                status=status.HTTP_401_UNAUTHORIZED,
            )


        user = request.user

        # Never issue JWTs to inactive accounts
        if not user.is_active:
            return Response(
                {
                    "detail": "This account is inactive."
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken.for_user(user)

        response = Response(
            {
                "message": "Google login successful.",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "name": user.first_name,
                    "email": user.email,
                },
            },
            status=status.HTTP_200_OK,
        )

        # We no longer need the Django session after
        # converting the Google login into our JWT login.
        logout(request)

        return response

class MeView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        return Response(
            {
                "id": user.id,
                "name": user.first_name,
                "email": user.email,
            }
        )

class DailyWellnessView(APIView):

    permission_classes = [IsAuthenticated]

    def get_today_record(self, user):
        today = timezone.localdate()

        wellness, created = DailyWellness.objects.get_or_create(
            user=user,
            date=today,
            defaults={
                "sessions": 0,
                "sleep_hours": 0,
                "water_cups": 0,
                "streak_days": 0,
                "wellness_score": 0,
            },
        )

        return wellness

    def calculate_activity(self, user, today):
        yoga_count = YogaSession.objects.filter(
            user=user,
            completed_at__date=today,
        ).count()

        meditation_count = MeditationSession.objects.filter(
            user=user,
            completed_at__date=today,
        ).count()

        return yoga_count + meditation_count

    def calculate_streak(self, user, today):
        yoga_dates = set(
            YogaSession.objects.filter(
                user=user
            ).values_list(
                "completed_at__date",
                flat=True
            )
        )

        meditation_dates = set(
            MeditationSession.objects.filter(
                user=user
            ).values_list(
                "completed_at__date",
                flat=True
            )
        )

        active_dates = (
            yoga_dates |
            meditation_dates
        )

        if today not in active_dates:
            return 0

        streak = 0
        current_date = today

        while current_date in active_dates:
            streak += 1
            current_date -= timedelta(days=1)

        return streak

    def calculate_score(
        self,
        sleep_hours,
        water_cups,
        sessions,
    ):
        # ------------------------------------------------------
        # Sleep: maximum 40 points
        # Ideal target = 8 hours
        # ------------------------------------------------------

        sleep_score = min(
            float(sleep_hours) / 8,
            1
        ) * 40

        # ------------------------------------------------------
        # Water: maximum 30 points
        # Target = 8 cups
        # ------------------------------------------------------

        water_score = min(
            float(water_cups) / 8,
            1
        ) * 30

        # ------------------------------------------------------
        # Activity: maximum 30 points
        # 3 activities = full activity score
        # ------------------------------------------------------

        activity_score = min(
            sessions / 3,
            1
        ) * 30

        score = round(
            sleep_score +
            water_score +
            activity_score
        )

        return min(score, 100)

    def sync_wellness(self, user, wellness):
        today = wellness.date

        sessions = self.calculate_activity(
            user,
            today
        )

        streak = self.calculate_streak(
            user,
            today
        )

        score = self.calculate_score(
            wellness.sleep_hours,
            wellness.water_cups,
            sessions,
        )

        wellness.sessions = sessions
        wellness.streak_days = streak
        wellness.wellness_score = score

        wellness.save(
            update_fields=[
                "sessions",
                "streak_days",
                "wellness_score",
                "updated_at",
            ]
        )

        return wellness

    # ==========================================================
    # GET
    # ==========================================================

    def get(self, request):

        wellness = self.get_today_record(
            request.user
        )

        wellness = self.sync_wellness(
            request.user,
            wellness
        )

        serializer = DailyWellnessSerializer(
            wellness
        )

        return Response(
            serializer.data
        )

    # ==========================================================
    # PATCH
    # ==========================================================

    def patch(self, request):

        wellness = self.get_today_record(
            request.user
        )

        serializer = DailyWellnessSerializer(
            wellness,
            data=request.data,
            partial=True,
        )

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        wellness = serializer.save()

        wellness = self.sync_wellness(
            request.user,
            wellness
        )

        return Response(
            DailyWellnessSerializer(
                wellness
            ).data
        )

class ActivityHistoryView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        wellness_records = DailyWellness.objects.filter(
            user=request.user
        ).order_by("date")

        meditation_sessions = MeditationSession.objects.filter(
            user=request.user
        )

        meditation_by_date = {}

        for session in meditation_sessions:

            date_key = session.completed_at.date().isoformat()

            if date_key not in meditation_by_date:
                meditation_by_date[date_key] = 0

            meditation_by_date[date_key] += 1


        history = []

        for wellness in wellness_records:

            date_key = wellness.date.isoformat()

            meditation_count = meditation_by_date.get(
                date_key,
                0
            )

            session_count = wellness.sessions or 0

            total_activities = (
                session_count +
                meditation_count
            )

            history.append({

                "date": date_key,

                "sessions": session_count,

                "meditation_sessions": meditation_count,

                "total_activities": total_activities,

                "sleep_hours": float(
                    wellness.sleep_hours or 0
                ),

                "water_cups": wellness.water_cups or 0,

                "streak_days": wellness.streak_days or 0,

                "wellness_score": wellness.wellness_score or 0,

            })

        return Response({
            "history": history
        })