from django.urls import path

from .views import (
    MeditationSessionListCreateView,
    MeditationStatsView,
)


urlpatterns = [
    path(
        "sessions/",
        MeditationSessionListCreateView.as_view(),
        name="meditation-sessions",
    ),
    path(
        "stats/",
        MeditationStatsView.as_view(),
        name="meditation-stats",
    ),
]