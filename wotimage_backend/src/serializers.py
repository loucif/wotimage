from .models import Image
from rest_framework import serializers, viewsets, routers
from django.urls import path, include

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'
