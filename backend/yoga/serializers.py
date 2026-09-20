from rest_framework import serializers
from .models import (
    Asana,
    Pranayama,
    CyclePhase,
    CycleRecommendation,
    DeepDiveFocus,
    DeepDiveRecommendation,
)


# ============================================================
# ASANA SERIALIZER
# ============================================================

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

            # Video
            "video_url",
            "video_type",

            "is_active",
            "created_at",
            "updated_at",
        ]


# ============================================================
# PRANAYAMA SERIALIZER
# ============================================================

class PranayamaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pranayama

        fields = [
            "id",
            "name",
            "sanskrit_name",
            "short_description",
            "difficulty",
            "benefits",
            "instructions",
            "duration_seconds",
            "breathing_pattern",
            "focus_area",
            "mood_tags",
            "contraindications",
            "modifications",
            "image_url",

            # Video
            "video_url",
            "video_type",

            "is_active",
            "created_at",
            "updated_at",
        ]


# ============================================================
# CYCLE RECOMMENDATION SERIALIZER
# ============================================================

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


# ============================================================
# CYCLE PHASE SERIALIZER
# ============================================================

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


# ============================================================
# DEEP DIVE RECOMMENDATION SERIALIZER
# ============================================================

class DeepDiveRecommendationSerializer(serializers.ModelSerializer):
    asana = AsanaSerializer(read_only=True)

    class Meta:
        model = DeepDiveRecommendation

        fields = [
            "id",
            "asana",
            "priority",
            "duration_seconds",
            "guidance_note",
            "is_active",
        ]


# ============================================================
# DEEP DIVE FOCUS SERIALIZER
# ============================================================

class DeepDiveFocusSerializer(serializers.ModelSerializer):
    recommendations = DeepDiveRecommendationSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = DeepDiveFocus

        fields = [
            "id",
            "title",
            "slug",
            "short_description",
            "description",
            "energy_context",
            "practice_style",
            "duration_minutes",
            "guidance",
            "is_active",
            "recommendations",
        ]