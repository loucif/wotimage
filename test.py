from keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications.inception_resnet_v2 import InceptionResNetV2, decode_predictions, preprocess_input
import numpy as np

try:

    img = load_img('/workspaces/wotimage/media/Sea_Fury_by_Ian_Worrall.jpg', target_size=(299, 299))
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
