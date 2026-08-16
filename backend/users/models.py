from django.db import models
from django.contrib.auth.models import User


class DailyWellness(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="daily_wellness"
    )

    date = models.DateField()

    sessions = models.PositiveIntegerField(default=0)

    sleep_hours = models.DecimalField(
        max_digits=4,
        decimal_places=1,
        default=0
    )

    water_cups = models.PositiveIntegerField(default=0)

    streak_days = models.PositiveIntegerField(default=0)

    wellness_score = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.date}"