from rest_framework import serializers
from .models import Asana


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