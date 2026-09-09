from django.db.models import Sum, Count
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import MeditationSession
from .serializers import MeditationSessionSerializer


class MeditationSessionListCreateView(generics.ListCreateAPIView):
    serializer_class = MeditationSessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return MeditationSession.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MeditationStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sessions = MeditationSession.objects.filter(
            user=request.user
        )

        stats = sessions.aggregate(
            total_sessions=Count("id"),
            total_minutes=Sum("duration_minutes"),
        )

        last_session = sessions.first()

        return Response({
            "total_sessions": stats["total_sessions"] or 0,
            "total_minutes": stats["total_minutes"] or 0,
            "last_session": (
                MeditationSessionSerializer(last_session).data
                if last_session
                else None
            ),
        })