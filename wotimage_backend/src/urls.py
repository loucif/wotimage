from .views import ImageViewsets
from rest_framework import routers
from django.urls import path, include

app_name = 'api-images'

router = routers.DefaultRouter()
router.register(r'images', ImageViewsets)

urlpatterns = [
    path('', include(router.urls))
]
