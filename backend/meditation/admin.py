from django.contrib import admin

from .models import MeditationSession


@admin.register(MeditationSession)
class MeditationSessionAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "session_type",
        "duration_minutes",
        "completed_at",
    )

    list_filter = (
        "session_type",
        "completed_at",
    )

    search_fields = (
        "user__username",
        "user__email",
    )