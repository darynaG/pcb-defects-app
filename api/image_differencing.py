from tetryonai.main import *


def difference_images(image_path_1, image_path_2, id):
    subtract_images(**{
        "image_path_1": image_path_1,
        "image_path_2": image_path_2,
        "write_path": "diff_img/diff_" + id + ".png"
    })
    subtract_images(**{
        "image_path_1": image_path_2,
        "image_path_2": image_path_1,
        "write_path": "diff_img/diff_dark_" + id + ".png"
    })
    return(True)


def count_contours(path):
    path, dirs, files = next(os.walk("contours/" + path + "/"))
    file_count = len(files)
    return(file_count)


def extract_contours_from_dark_image(image_path, write_path, hsv_lower, hsv_upper, countors_number):
    image = cv2.imread(image_path)
    original = image.copy()
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    hsv_lower = np.array(hsv_lower)
    hsv_upper = np.array(hsv_upper)
    mask = cv2.inRange(hsv, hsv_lower, hsv_upper)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    opening = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel, iterations=1)
    close = cv2.morphologyEx(opening, cv2.MORPH_CLOSE, kernel, iterations=1)
    cnts = cv2.findContours(close, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]
    offset = 20
    ROI_number = countors_number
    for c in cnts:
        x, y, w, h = cv2.boundingRect(c)
        cv2.rectangle(image, (x - offset, y - offset), (x + w + offset, y + h + offset), (36, 255, 12), 2)
        ROI = original[y - offset:y + h + offset, x - offset:x + w + offset]
        try:
            cv2.imwrite(write_path + 'contour_{}.png'.format(ROI_number), ROI)
        except:
            print("skipping image " + image_path)
        ROI_number += 1


def extract_pcb_defects_with_contours(path_to_diff, id):
    dir_path = "contours/" + id
    if not os.path.isdir(dir_path):
        directory(**{
            "choice": "make",
            "directory_path": dir_path
        })
    extract_contours_from_image(**{
        "image_path": path_to_diff,
        "write_path": "contours/" + id + "/",
        "hsv_lower": [0, 150, 50],
        "hsv_upper": [10, 255, 255]
    })
    return (True)


def extract_dark_pcb_defects_with_contours(path_to_diff, id):
    dir_path = "contours/" + id
    if not os.path.isdir(dir_path):
        directory(**{
            "choice": "make",
            "directory_path": dir_path
        })
    extract_contours_from_dark_image(**{
        "image_path": path_to_diff,
        "write_path": "contours/" + id + "/",
        "hsv_lower": [0, 150, 50],
        "hsv_upper": [10, 255, 255],
        "countors_number": count_contours(id)
    })
    return (True)
