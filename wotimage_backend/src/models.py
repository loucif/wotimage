from django.db import models
from django.utils import timezone
from keras_preprocessing.image import load_img, img_to_array
from keras_preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications.inception_resnet_v2 import decode_predictions, preprocess_input, InceptionResNetV2
import numpy as np

# Create your models here.


class Image(models.Model):
    picture = models.ImageField()
    classified = models.CharField(max_length=200, blank=True)
    uploaded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Image classified at {}".format(timezone.localtime(self.uploaded).strftime('%Y-%m-%d %H:%M'))

    def save(self, *args, **kwargs):
        try:
            print(self.picture.path)
            img = load_img(self.picture.path, target_size=(299, 299))
            print(img)
            img_array = img_to_array(img)
            to_predict = np.expand_dims(img_array, axis=0)
            preprocess = preprocess_input(to_predict)
            model = InceptionResNetV2(weights='imagenet')
            predication = model.predict(preprocess)
            decode = decode_predictions(predication)
            print(decode)
        except Exception as e:
            print(e)
        super().save(*args, **kwargs)