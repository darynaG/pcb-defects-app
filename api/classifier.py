from fastai.learner import load_learner

def classifier(image_path):
    learn = load_learner('model/export.pkl')
    prediction = learn.predict(image_path)
    return (str(prediction[0]))


def predict(image_path):
    prediction = classifier(image_path)
    return (prediction)
