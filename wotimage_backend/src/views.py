from typing import ForwardRef
from rest_framework import viewsets
from .serializers import ImageSerializer
from .models import Image

class ImageViewsets(viewsets.ModelViewSet):
    queryset = Image.objects.all().order_by('-uploaded')
    serializer_class = ImageSerializer