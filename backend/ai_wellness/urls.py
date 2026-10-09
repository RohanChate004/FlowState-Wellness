from django.urls import path

from .views import (
    ai_wellness_chat,
    daily_routine,
)

urlpatterns = [
    path(
        "chat/",
        ai_wellness_chat,
        name="ai-wellness-chat"
    ),

    path(
        "daily-routine/",
        daily_routine,
        name="daily-routine"
    ),
]