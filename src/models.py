from django.db import models
from django.utils import timezone
from keras_preprocessing.image import img_to_array
from keras.applications import xception  # , inception_resnet_v2
import numpy as np
from .preprocessing import load_img


# Create your models here.


class Image(models.Model):
    picture = models.ImageField()
    classified = models.CharField(max_length=200, blank=True)
    uploaded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image classified at {timezone.localtime(self.uploaded).strftime('%Y-%m-%d %H:%M')}"

    def save(self, *args, **kwargs):
        # plImage = pl.Image.open(self.picture)
        # img_array = img_to_array(plImage.resize(((299, 299))))
        img = load_img(self.picture, target_size=(299, 299))
        img_array = img_to_array(img)
        to_predict = np.expand_dims(img_array, axis=0)

        # preprocess = inception_resnet_v2.preprocess_input(to_predict)
        # model = inception_resnet_v2.InceptionResNetV2(weights='imagenet')
        # predication = model.predict(preprocess)
        # decode = inception_resnet_v2.decode_predictions(predication)
        # self.classified = str(decode[0])

        preprocess = xception.preprocess_input(to_predict)
        model = xception.Xception(weights='imagenet')
        predication = model.predict(preprocess)
        decode = xception.decode_predictions(predication)
        self.classified = str(decode[0])
        #cloudinary.uploader.upload(self.picture.path, )
        super().save(*args, **kwargs)
