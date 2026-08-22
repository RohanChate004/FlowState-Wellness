from django.contrib import admin
from .models import (
    Asana,
    DeepDiveFocus,
    DeepDiveRecommendation,
)


@admin.register(Asana)
class AsanaAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "sanskrit_name",
        "category",
        "difficulty",
        "focus_area",
        "is_active",
    )

    list_filter = (
        "category",
        "difficulty",
        "is_active",
    )

    search_fields = (
        "name",
        "sanskrit_name",
        "category",
        "focus_area",
    )

    list_editable = (
        "is_active",
    )

    ordering = (
        "name",
    )

@admin.register(DeepDiveFocus)
class DeepDiveFocusAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "practice_style",
        "duration_minutes",
        "is_active",
    )

    list_filter = (
        "practice_style",
        "is_active",
    )

    search_fields = (
        "title",
        "short_description",
    )

    list_editable = (
        "is_active",
    )

    prepopulated_fields = {
        "slug": ("title",),
    }


@admin.register(DeepDiveRecommendation)
class DeepDiveRecommendationAdmin(admin.ModelAdmin):
    list_display = (
        "deep_dive",
        "asana",
        "priority",
        "duration_seconds",
        "is_active",
    )

    list_filter = (
        "deep_dive",
        "is_active",
    )

    search_fields = (
        "deep_dive__title",
        "asana__name",
    )

    list_editable = (
        "priority",
        "is_active",
    )

    ordering = (
        "deep_dive",
        "priority",
    )