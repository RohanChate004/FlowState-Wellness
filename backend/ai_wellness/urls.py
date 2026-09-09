from django.urls import path

from .views import ai_wellness_chat


urlpatterns = [
    path("chat/", ai_wellness_chat, name="ai-wellness-chat"),
]