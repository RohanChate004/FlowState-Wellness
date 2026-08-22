from django.urls import path

from .views import (
    AsanaDetailView,
    AsanaListView,
    SOSRecommendationView,
    CyclePhaseListView,
    CyclePhaseDetailView,
    DeepDiveFocusListView,
    DeepDiveFocusDetailView,
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

    path(
        "deep-dives/",
        DeepDiveFocusListView.as_view(),
        name="deep-dive-list",
    ),

    path(
        "deep-dives/<slug:slug>/",
        DeepDiveFocusDetailView.as_view(),
        name="deep-dive-detail",
    ),
]