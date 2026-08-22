from rest_framework import generics
from rest_framework.filters import SearchFilter

from .models import Asana
from .serializers import AsanaSerializer

from .models import (
    Asana,
    CyclePhase,
    DeepDiveFocus,
)

from .serializers import (
    AsanaSerializer,
    CyclePhaseSerializer,
    DeepDiveFocusSerializer,
)



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

    SOS_PROFILES = {
        "anxious": {
            "categories": [
                "Relaxation",
                "Seated",
                "Mobility",
            ],
            "difficulty": ["Beginner"],
            "energy": ["Low"],
        },

        "sore": {
            "categories": [
                "Mobility",
                "Relaxation",
                "Hip Opener",
                "Forward Bend",
            ],
            "difficulty": ["Beginner", "Intermediate"],
            "energy": ["Low", "Moderate"],
        },

        "wired": {
            "categories": [
                "Relaxation",
                "Seated",
                "Mobility",
            ],
            "difficulty": ["Beginner"],
            "energy": ["Low"],
        },

        "cramping": {
            "categories": [
                "Relaxation",
                "Hip Opener",
                "Seated",
            ],
            "difficulty": ["Beginner"],
            "energy": ["Low"],
        },

        "low_energy": {
            "categories": [
                "Relaxation",
                "Seated",
                "Mobility",
            ],
            "difficulty": ["Beginner"],
            "energy": ["Low"],
        },
    }

    def get_queryset(self):
        mood = self.request.query_params.get("mood")

        if not mood:
            return Asana.objects.none()

        mood = mood.strip().lower()

        profile = self.SOS_PROFILES.get(mood)

        if not profile:
            return Asana.objects.none()

        asanas = Asana.objects.filter(
            is_active=True
        )

        ranked_asanas = []

        for asana in asanas:

            score = 0

            # -----------------------------
            # 1. Mood match
            # -----------------------------
            tags = asana.mood_tags or []

            normalized_tags = [
                str(tag).strip().lower()
                for tag in tags
            ]

            if mood in normalized_tags:
                score += 10

            # -----------------------------
            # 2. Category match
            # -----------------------------
            if asana.category in profile["categories"]:
                score += 5

            # -----------------------------
            # 3. Difficulty match
            # -----------------------------
            if asana.difficulty in profile["difficulty"]:
                score += 3

            # -----------------------------
            # 4. Energy match
            # -----------------------------
            if asana.energy_level in profile["energy"]:
                score += 3

            # Only recommend poses
            # that have some relevance.
            if score > 0:
                ranked_asanas.append(
                    (score, asana)
                )

        # Highest score first
        ranked_asanas.sort(
            key=lambda item: (
                -item[0],
                item[1].name
            )
        )

        return [
            asana
            for score, asana in ranked_asanas[:5]
        ]

class CyclePhaseListView(generics.ListAPIView):
    serializer_class = CyclePhaseSerializer

    def get_queryset(self):
        return CyclePhase.objects.prefetch_related(
            "recommendations__asana"
        ).all()

class CyclePhaseDetailView(generics.RetrieveAPIView):
    serializer_class = CyclePhaseSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return CyclePhase.objects.prefetch_related(
            "recommendations__asana"
        ).all()


class DeepDiveFocusListView(generics.ListAPIView):
    serializer_class = DeepDiveFocusSerializer

    def get_queryset(self):
        return DeepDiveFocus.objects.filter(
            is_active=True
        ).prefetch_related(
            "recommendations__asana"
        )


class DeepDiveFocusDetailView(generics.RetrieveAPIView):
    serializer_class = DeepDiveFocusSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return DeepDiveFocus.objects.filter(
            is_active=True
        ).prefetch_related(
            "recommendations__asana"
        )