from django.urls import path

from .views import (
    AsanaDetailView,
    AsanaListView,
    SOSRecommendationView,
    CyclePhaseListView,
    CyclePhaseDetailView,
)


urlpatterns = [
    path(
        "asanas/",
        AsanaListView.as_view(),
        name="asana-list",
    ),

    path(
        "asanas/<int:pk>/",
        AsanaDetailView.as_view(),
        name="asana-detail",
    ),

    path(
        "sos/",
        SOSRecommendationView.as_view(),
        name="sos-recommendation",
    ),

    path(
        "cycle-phases/",
        CyclePhaseListView.as_view(),
        name="cycle-phase-list",
    ),

    path(
        "cycle-phases/<slug:slug>/",
        CyclePhaseDetailView.as_view(),
        name="cycle-phase-detail",
    ),
]