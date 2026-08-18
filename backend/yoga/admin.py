from django.contrib import admin
from .models import Asana


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