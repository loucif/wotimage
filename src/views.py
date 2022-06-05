from rest_framework import viewsets, mixins, parsers
from .serializers import ImageSerializer
from .models import Image

class ImageViewsets(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                    mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Image.objects.all().order_by('-uploaded')
    serializer_class = ImageSerializer
    parser_classes = (parsers.FormParser, parsers.MultiPartParser)
