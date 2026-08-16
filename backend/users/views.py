from datetime import date

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
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