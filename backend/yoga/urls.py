from django.urls import path

from .views import (
    AsanaDetailView,
    AsanaListView,
    SOSRecommendationView,
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
]