from django.contrib.auth.models import User
from django.db import models


class MeditationSession(models.Model):

    SESSION_TYPES = [
        ("mindfulness", "Mindfulness"),
        ("breath_awareness", "Breath Awareness"),
        ("stress_relief", "Stress Relief"),
        ("focus_clarity", "Focus & Clarity"),
        ("sleep", "Sleep Meditation"),
        ("loving_kindness", "Loving-Kindness"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="meditation_sessions",
    )

    session_type = models.CharField(
        max_length=50,
        choices=SESSION_TYPES,
    )

    duration_minutes = models.PositiveIntegerField()

    completed_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-completed_at"]

    def __str__(self):
        return f"{self.user.username} - {self.get_session_type_display()} - {self.duration_minutes} min"