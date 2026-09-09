from rest_framework import serializers

from .models import MeditationSession


class MeditationSessionSerializer(serializers.ModelSerializer):

    session_type_display = serializers.CharField(
        source="get_session_type_display",
        read_only=True,
    )

    class Meta:
        model = MeditationSession
        fields = [
            "id",
            "session_type",
            "session_type_display",
            "duration_minutes",
            "completed_at",
        ]
        read_only_fields = [
            "id",
            "completed_at",
            "session_type_display",
        ]