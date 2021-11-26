import os

import cv2
import numpy as np
from flask import request, jsonify
from classifier import *
from image_differencing import difference_images, extract_pcb_defects_with_contours, \
    extract_dark_pcb_defects_with_contours


def remove_diff_images():
    os.system('rm diff_img/*')


def remove_contours():
    os.system('rm contours/*')


def count_contours(path):
    path, dirs, files = next(os.walk("contours/" + path + "/"))
    file_count = len(files)
    return(file_count)


my_operations = {
    "difference_images": difference_images,
    "extract_pcb_defects_with_contours": extract_pcb_defects_with_contours,
    "remove_diff_images": remove_diff_images,
    "remove_contours": remove_contours,
    "count_contours": count_contours,
    "predict": predict,
    "extract_dark_pcb_defects_with_contours": extract_dark_pcb_defects_with_contours
}


def request_return():
    passed_function = request.args.get("function")
    try:
        args = dict(request.args)
        args = {k: v[0] for k, v in args.items()}
        print(args)
        del args['function']
        res = my_operations[passed_function](**args)
        return(jsonify(res))
    except ValueError:
        return(ValueError)

