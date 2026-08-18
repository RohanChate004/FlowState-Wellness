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