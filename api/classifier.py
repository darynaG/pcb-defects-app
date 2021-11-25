# *************** PYTHON FUNCTIONS *******************

# import libraries
import PIL
from PIL.Image import Image
from fastai.vision.core import PILImage
from fastai.learner import load_learner
import json

from fastai.vision.core import load_image
from fastai.vision import *
import torchvision.transforms as T

def classifier(image_path):
    learn = load_learner('model/export.pkl')
    prediction = learn.predict(image_path)
    return (str(prediction[0]))


def predict(image_path):
    prediction = classifier(image_path)
    return (prediction)
