from django.db.models import Sum
from meditation.models import MeditationSession
from datetime import date

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

    def get(self, request):

        today = date.today()

        wellness, created = DailyWellness.objects.get_or_create(
            user=request.user,
            date=today,
            defaults={
                "sessions": 0,
                "sleep_hours": 0,
                "water_cups": 0,
                "streak_days": 0,
                "wellness_score": 0,
            },
        )

        serializer = DailyWellnessSerializer(wellness)

        return Response(serializer.data)

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