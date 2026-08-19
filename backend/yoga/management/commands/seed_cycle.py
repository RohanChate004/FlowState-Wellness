from django.core.management.base import BaseCommand

from yoga.models import CyclePhase, CycleRecommendation, Asana


CYCLE_PHASES = [
    {
        "name": "menstrual",
        "slug": "menstrual",
        "description": (
            "A lower-energy phase where gentle, restorative "
            "and comfortable movement may be preferred."
        ),
        "energy_context": "Low energy · Rest",
        "practice_style": "Gentle · Restorative",
        "intensity": "Low",
        "duration_minutes": 10,
        "safety_guidance": (
            "Choose comfortable movements and modify or stop "
            "if a movement causes discomfort."
        ),
    },
    {
        "name": "follicular",
        "slug": "follicular",
        "description": (
            "A phase associated with gradually increasing energy "
            "and an opportunity to build movement practice."
        ),
        "energy_context": "Rising energy · Build",
        "practice_style": "Mobility · Active",
        "intensity": "Moderate",
        "duration_minutes": 15,
        "safety_guidance": (
            "Increase intensity gradually and stay within a "
            "comfortable range of movement."
        ),
    },
    {
        "name": "ovulation",
        "slug": "ovulation",
        "description": (
            "A phase where users may prefer a more active "
            "and strength-oriented practice."
        ),
        "energy_context": "Peak energy · Strong",
        "practice_style": "Active · Strength",
        "intensity": "Moderate",
        "duration_minutes": 15,
        "safety_guidance": (
            "Choose intensity according to your comfort and "
            "current energy rather than pushing through pain."
        ),
    },
    {
        "name": "luteal",
        "slug": "luteal",
        "description": (
            "A phase where practice can gradually shift toward "
            "moderate movement, mobility and recovery."
        ),
        "energy_context": "Declining energy · Soften",
        "practice_style": "Moderate · Recovery",
        "intensity": "Low-Moderate",
        "duration_minutes": 10,
        "safety_guidance": (
            "Reduce intensity when needed and prioritize "
            "comfortable, controlled movement."
        ),
    },
]


CYCLE_RECOMMENDATIONS = {
    "menstrual": [
        ("Balasana", 1, 90),
        ("Savasana", 2, 120),
        ("Sukhasana", 3, 60),
        ("Baddha Konasana", 4, 60),
    ],

    "follicular": [
        ("Tadasana", 1, 30),
        ("Virabhadrasana I", 2, 45),
        ("Virabhadrasana II", 3, 45),
        ("Trikonasana", 4, 45),
        ("Anjaneyasana", 5, 45),
    ],

    "ovulation": [
        ("Virabhadrasana II", 1, 45),
        ("Utkatasana", 2, 45),
        ("Adho Mukha Svanasana", 3, 45),
        ("Garudasana", 4, 30),
        ("Matsyasana", 5, 30),
    ],

    "luteal": [
        ("Baddha Konasana", 1, 60),
        ("Paschimottanasana", 2, 60),
        ("Balasana", 3, 90),
        ("Marjaryasana", 4, 45),
        ("Savasana", 5, 120),
    ],
}


class Command(BaseCommand):
    help = "Seed cycle phases and cycle-based asana recommendations"

    def handle(self, *args, **options):

        phase_objects = {}

        # -----------------------------------------
        # 1. Create / update cycle phases
        # -----------------------------------------
        for data in CYCLE_PHASES:

            phase, created = CyclePhase.objects.update_or_create(
                slug=data["slug"],
                defaults=data,
            )

            phase_objects[data["slug"]] = phase

            action = "Created" if created else "Updated"

            self.stdout.write(
                f"{action} cycle phase: {phase.name}"
            )

        # -----------------------------------------
        # 2. Create / update recommendations
        # -----------------------------------------
        created_count = 0
        updated_count = 0

        for phase_slug, recommendations in CYCLE_RECOMMENDATIONS.items():

            phase = phase_objects[phase_slug]

            for asana_name, priority, duration_seconds in recommendations:

                asana = Asana.objects.get(
                    name=asana_name
                )

                recommendation, created = (
                    CycleRecommendation.objects.update_or_create(
                        cycle_phase=phase,
                        asana=asana,
                        defaults={
                            "priority": priority,
                            "duration_seconds": duration_seconds,
                            "is_active": True,
                        },
                    )
                )

                if created:
                    created_count += 1
                else:
                    updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Cycle seed complete: "
                f"{created_count} recommendations created, "
                f"{updated_count} updated."
            )
        )