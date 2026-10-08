from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/", include("users.urls")),
    path("api/yoga/", include("yoga.urls")),
    path("api/meditation/", include("meditation.urls")),

    # FlowState AI
    path("api/ai-wellness/", include("ai_wellness.urls")),

    # Google / django-allauth
    path("accounts/", include("allauth.urls")),
]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)