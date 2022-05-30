from rest_framework import routers
from django.urls import path, include
from .views import ImageViewsets


app_name = 'api-images'

router = routers.DefaultRouter()
router.register(r'images', ImageViewsets)

urlpatterns = [
    path('', include(router.urls))
]
