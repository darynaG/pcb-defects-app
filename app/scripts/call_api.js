function difference_images() {
    loading_display()
    image_path_2 = $('.show_img').eq(0).attr('src').replace('../', '')
    image_path_1 = $('.show_img').eq(1).attr('src').replace('../', '')
    az.hold_value.current_run_id = az.makeid()
    params = {
        "function": "difference_images",
        "image_path_1": image_path_1,
        "image_path_2": image_path_2,
        "id": az.hold_value.current_run_id
    }
    az.call_api({
        "url": az.hold_value.config.api_url,
        "parameters": params,
        "done": function() {
            get_defects()
        },
        "fail": function(err) {
            console.log(err)
        }
    })

    function get_defects() {
        params = {
            "function": "extract_pcb_defects_with_contours",
            "path_to_diff": "diff_img/diff_" + az.hold_value.current_run_id + ".png",
            "id": az.hold_value.current_run_id
        }
        az.call_api({
            "url": az.hold_value.config.api_url,
            "parameters": params,
            "done": function(data) {
                show_copped_labelled(az.hold_value.current_run_id)
                get_dark_defects()
            },
            "fail": function(err) {
                console.log(err)
            }
        })
    }

    function get_dark_defects() {
        params = {
            "function": "extract_dark_pcb_defects_with_contours",
            "path_to_diff": "diff_img/diff_dark_" + az.hold_value.current_run_id + ".png",
            "id": az.hold_value.current_run_id
        }
        az.call_api({
            "url": az.hold_value.config.api_url,
            "parameters": params,
            "done": function(data) {
                show_copped_labelled(az.hold_value.current_run_id)
                setTimeout(function() {
                    predict_defects()
                }, 2000)
            },
            "fail": function(err) {
                console.log(err)
            }
        })
    }
}

function predict_defects() {
    az.call_once_satisfied({
        "condition": "typeof(az.hold_value.cropped_images) !== 'undefined'",
        "function": function() {
            cropped_images = az.hold_value.cropped_images.map(i => 'contours/' + az.hold_value.current_run_id + '/' + i);
            pred_cnt = -1
            az.delay_multiple({
                "iterations": cropped_images.length,
                "delay": 1000,
                "function": function() {
                    pred_cnt++
                    params = {
                        "function": "predict",
                        "image_path": cropped_images[pred_cnt]
                    }
                    az.call_api({
                        "url": az.hold_value.config.api_url,
                        "parameters": params,
                        "done": function(data) {
                            type = data,
                            az.add_text("crops_layout_cells", (pred_cnt * 2) + 2, {
                                "this_class": "show_predict_text",
                                "text": type
                            })
                            az.style_text("show_predict_text", az.last_class_instance("show_predict_text"), {
                                "align": "center",
                                "color": "white"
                            })
                            add_tally({
                                "type": type
                            })
                            if (pred_cnt === (cropped_images.length - 1)) {
                                stop_load_display()
                            }
                        },
                        "fail": function(err) {
                            console.log(err)
                        }
                    })
                }
            })
        }
    })
}

function remove_diff_images() {
    params = {
        "function": "remove_diff_images"
    }
    az.call_api({
        "url": az.hold_value.config.api_url,
        "parameters": params,
        "done": function(data) {},
        "fail": function(err) {}
    })
}

function remove_contours() {
    params = {
        "function": "remove_contours"
    }
    az.call_api({
        "url": az.hold_value.config.api_url,
        "parameters": params,
        "done": function(data) {},
        "fail": function(err) {}
    })
}

function count_contours(id) {
    params = {
        "function": "count_contours",
        "path": id
    }
    az.call_api({
        "url": az.hold_value.config.api_url,
        "parameters": params,
        "done": function(data) {
            az.hold_value.current_contours_cnt = data
            setTimeout(function() {
                az.hold_value.current_contours_cnt = undefined
            }, 2000)
        },
        "fail": function(err) {
            alert(err)
        }
    })
}