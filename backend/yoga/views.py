from rest_framework import generics
from rest_framework.filters import SearchFilter

from .models import Asana
from .serializers import AsanaSerializer


class AsanaListView(generics.ListAPIView):
    serializer_class = AsanaSerializer
    filter_backends = [SearchFilter]

    search_fields = [
        "name",
        "sanskrit_name",
        "short_description",
        "category",
        "focus_area",
        "benefits",
    ]

    def get_queryset(self):
        queryset = Asana.objects.filter(is_active=True)

        category = self.request.query_params.get("category")
        difficulty = self.request.query_params.get("difficulty")

        if category:
            queryset = queryset.filter(category__iexact=category)

        if difficulty:
            queryset = queryset.filter(difficulty__iexact=difficulty)

        return queryset


class AsanaDetailView(generics.RetrieveAPIView):
    queryset = Asana.objects.filter(is_active=True)
    serializer_class = AsanaSerializer

class SOSRecommendationView(generics.ListAPIView):
    serializer_class = AsanaSerializer

    def get_queryset(self):
        mood = self.request.query_params.get("mood")

        if not mood:
            return Asana.objects.none()

        mood = mood.strip().lower()

        asanas = Asana.objects.filter(
            is_active=True
        ).order_by("difficulty", "name")

        matching_asanas = []

        for asana in asanas:
            tags = asana.mood_tags or []

            normalized_tags = [
                str(tag).strip().lower()
                for tag in tags
            ]

            if mood in normalized_tags:
                matching_asanas.append(asana)

            if len(matching_asanas) >= 5:
                break

        return matching_asanas