from rest_framework import serializers
from .models import (
    Asana,
    CyclePhase,
    CycleRecommendation,
)


class AsanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asana
        fields = [
            "id",
            "name",
            "sanskrit_name",
            "short_description",
            "category",
            "difficulty",
            "benefits",
            "instructions",
            "duration_seconds",
            "focus_area",
            "mood_tags",
            "energy_level",
            "contraindications",
            "modifications",
            "image_url",
            "is_active",
            "created_at",
            "updated_at",
        ]

class CycleRecommendationSerializer(serializers.ModelSerializer):
    asana = AsanaSerializer(read_only=True)

    class Meta:
        model = CycleRecommendation
        fields = [
            "id",
            "asana",
            "priority",
            "duration_seconds",
            "modification_note",
            "is_active",
        ]

class CyclePhaseSerializer(serializers.ModelSerializer):
    recommendations = CycleRecommendationSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = CyclePhase
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "energy_context",
            "practice_style",
            "intensity",
            "duration_minutes",
            "safety_guidance",
            "recommendations",
        ]