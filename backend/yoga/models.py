from django.db import models


class Asana(models.Model):
    DIFFICULTY_CHOICES = [
        ("Beginner", "Beginner"),
        ("Intermediate", "Intermediate"),
        ("Advanced", "Advanced"),
    ]

    name = models.CharField(max_length=100)
    sanskrit_name = models.CharField(max_length=100, blank=True)

    short_description = models.TextField()

    category = models.CharField(max_length=100)
    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY_CHOICES,
        default="Beginner",
    )

    benefits = models.TextField()
    instructions = models.TextField()

    duration_seconds = models.PositiveIntegerField(default=30)

    focus_area = models.CharField(
        max_length=150,
        blank=True,
    )

    mood_tags = models.JSONField(
        default=list,
        blank=True,
    )

    energy_level = models.CharField(
        max_length=30,
        default="Moderate",
    )

    contraindications = models.TextField(
        blank=True,
    )

    modifications = models.TextField(
        blank=True,
    )

    image_url = models.URLField(
        blank=True,
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

class CyclePhase(models.Model):
    PHASE_CHOICES = [
        ("menstrual", "Menstrual"),
        ("follicular", "Follicular"),
        ("ovulation", "Ovulation"),
        ("luteal", "Luteal"),
    ]

    name = models.CharField(
        max_length=50,
        choices=PHASE_CHOICES,
        unique=True,
    )

    slug = models.SlugField(
        max_length=50,
        unique=True,
    )

    description = models.TextField()

    energy_context = models.CharField(
        max_length=100,
    )

    practice_style = models.CharField(
        max_length=100,
    )

    intensity = models.CharField(
        max_length=30,
    )

    duration_minutes = models.PositiveIntegerField(
        default=10,
    )

    safety_guidance = models.TextField(
        blank=True,
    )

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.name

class CycleRecommendation(models.Model):
    cycle_phase = models.ForeignKey(
        CyclePhase,
        on_delete=models.CASCADE,
        related_name="recommendations",
    )

    asana = models.ForeignKey(
        Asana,
        on_delete=models.CASCADE,
        related_name="cycle_recommendations",
    )

    priority = models.PositiveIntegerField(
        default=1,
    )

    duration_seconds = models.PositiveIntegerField(
        default=60,
    )

    modification_note = models.TextField(
        blank=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    class Meta:
        ordering = ["priority", "id"]
        constraints = [
            models.UniqueConstraint(
                fields=["cycle_phase", "asana"],
                name="unique_cycle_phase_asana",
            )
        ]

    def __str__(self):
        return f"{self.cycle_phase.name} - {self.asana.name}"