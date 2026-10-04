from datetime import timedelta

from django.contrib.auth import logout
from django.utils import timezone

from meditation.models import MeditationSession
from yoga.models import YogaSession

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

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
                flat=True,
            )
        )

        meditation_dates = set(
            MeditationSession.objects.filter(
                user=user
            ).values_list(
                "completed_at__date",
                flat=True,
            )
        )

        active_dates = yoga_dates | meditation_dates

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
        sleep_score = min(
            float(sleep_hours) / 8,
            1,
        ) * 40

        water_score = min(
            float(water_cups) / 8,
            1,
        ) * 30

        activity_score = min(
            sessions / 3,
            1,
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
            today,
        )

        streak = self.calculate_streak(
            user,
            today,
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

    def get(self, request):
        wellness = self.get_today_record(request.user)

        wellness = self.sync_wellness(
            request.user,
            wellness,
        )

        return Response(
            DailyWellnessSerializer(wellness).data
        )

    def patch(self, request):
        wellness = self.get_today_record(request.user)

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
            wellness,
        )

        return Response(
            DailyWellnessSerializer(wellness).data
        )


class ActivityHistoryView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        wellness_records = DailyWellness.objects.filter(
            user=request.user
        ).order_by("date")

        yoga_sessions = YogaSession.objects.filter(
            user=request.user
        )

        meditation_sessions = MeditationSession.objects.filter(
            user=request.user
        )

        yoga_by_date = {}
        meditation_by_date = {}

        for session in yoga_sessions:
            date_key = timezone.localtime(
                session.completed_at
            ).date().isoformat()

            yoga_by_date[date_key] = (
                yoga_by_date.get(date_key, 0) + 1
            )

        for session in meditation_sessions:
            date_key = timezone.localtime(
                session.completed_at
            ).date().isoformat()

            meditation_by_date[date_key] = (
                meditation_by_date.get(date_key, 0) + 1
            )

        # Include dates that have activity even if a DailyWellness
        # record has not been created for that date yet.
        active_dates = (
            set(yoga_by_date.keys()) |
            set(meditation_by_date.keys()) |
            {
                record.date.isoformat()
                for record in wellness_records
            }
        )

        wellness_map = {
            record.date.isoformat(): record
            for record in wellness_records
        }

        history = []

        for date_key in sorted(active_dates):

            wellness = wellness_map.get(date_key)

            yoga_count = yoga_by_date.get(date_key, 0)
            meditation_count = meditation_by_date.get(
                date_key,
                0,
            )

            total_activities = (
                yoga_count +
                meditation_count
            )

            history.append(
                {
                    "date": date_key,

                    # Keep sessions as the total completed
                    # yoga + meditation activity for the day.
                    "sessions": total_activities,

                    "yoga_sessions": yoga_count,

                    "meditation_sessions": meditation_count,

                    "total_activities": total_activities,

                    "sleep_hours": float(
                        wellness.sleep_hours
                        if wellness
                        else 0
                    ),

                    "water_cups": (
                        wellness.water_cups
                        if wellness
                        else 0
                    ),

                    "streak_days": (
                        wellness.streak_days
                        if wellness
                        else 0
                    ),

                    "wellness_score": (
                        wellness.wellness_score
                        if wellness
                        else 0
                    ),
                }
            )

        return Response(
            {
                "history": history
            }
        )
