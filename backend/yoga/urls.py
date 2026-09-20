from django.urls import path

from .views import (
    AsanaDetailView,
    AsanaListView,
    PranayamaListView,
    PranayamaDetailView,
    SOSRecommendationView,
    CyclePhaseListView,
    CyclePhaseDetailView,
    DeepDiveFocusListView,
    DeepDiveFocusDetailView,
)


urlpatterns = [

    # ========================================================
    # ASANAS
    # ========================================================

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


    # ========================================================
    # PRANAYAMA
    # ========================================================

    path(
        "pranayamas/",
        PranayamaListView.as_view(),
        name="pranayama-list",
    ),

    path(
        "pranayamas/<int:pk>/",
        PranayamaDetailView.as_view(),
        name="pranayama-detail",
    ),


    # ========================================================
    # SOS
    # ========================================================

    path(
        "sos/",
        SOSRecommendationView.as_view(),
        name="sos-recommendation",
    ),


    # ========================================================
    # CYCLE PHASES
    # ========================================================

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


    # ========================================================
    # DEEP DIVE
    # ========================================================

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