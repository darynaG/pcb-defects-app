az.hold_value.defect_cost_totals = {
    "spur": [],
    "spurious": [],
    "short": [],
    "open": [],
    "mousebite": [],
    "pinhole": []
}

function add_tally(types) {
    if (types.type == 'spur') {
        az.add_html("tally_layout_cells", 2, {
            "html": "<div class='added_tally'></div>"
        })
        az.hold_value.defect_cost_totals.spur.push(az.hold_value.hold_spur_value)
        az.empty_contents('tally_layout_cells', 3)
        az.add_text("tally_layout_cells", 3, {
            "this_class": "defect_cost",
            "text": (az.hold_value.defect_cost_totals.spur.length == 1) ? az.hold_value.defect_cost_totals.spur.length + " defect" : az.hold_value.defect_cost_totals.spur.length + " defects"
        })
    }
    if (types.type == 'spurious') {
        az.add_html("tally_layout_cells", 5, {
            "html": "<div class='added_tally'></div>"
        })
        az.hold_value.defect_cost_totals.spurious.push(az.hold_value.hold_spurious_value)
        az.empty_contents('tally_layout_cells', 6)
        az.add_text("tally_layout_cells", 6, {
            "this_class": "defect_cost",
            "text": (az.hold_value.defect_cost_totals.spurious.length == 1) ? az.hold_value.defect_cost_totals.spurious.length + " defect" : az.hold_value.defect_cost_totals.spurious.length + " defects"
        })
    }
    if (types.type == 'short') {
        az.add_html("tally_layout_cells", 8, {
            "html": "<div class='added_tally'></div>"
        })
        az.hold_value.defect_cost_totals.short.push(az.hold_value.hold_short_value)
        az.empty_contents('tally_layout_cells', 9)
        az.add_text("tally_layout_cells", 9, {
            "this_class": "defect_cost",
            "text": (az.hold_value.defect_cost_totals.short.length == 1) ? az.hold_value.defect_cost_totals.short.length + " defect" : az.hold_value.defect_cost_totals.short.length + " defects"
        })
    }
    if (types.type == 'open') {
        az.add_html("tally_layout_cells", 11, {
            "html": "<div class='added_tally'></div>"
        })
        az.hold_value.defect_cost_totals.open.push(az.hold_value.hold_open_value)
        az.empty_contents('tally_layout_cells', 12)
        az.add_text("tally_layout_cells", 12, {
            "this_class": "defect_cost",
            "text": (az.hold_value.defect_cost_totals.open.length == 1) ? az.hold_value.defect_cost_totals.open.length + " defect" : az.hold_value.defect_cost_totals.open.length + " defects"
        })
    }
    if (types.type == 'mousebite') {
        az.add_html("tally_layout_cells", 14, {
            "html": "<div class='added_tally'></div>"
        })
        az.hold_value.defect_cost_totals.mousebite.push(az.hold_value.hold_mousebite_value)
        az.empty_contents('tally_layout_cells', 15)
        az.add_text("tally_layout_cells", 15, {
            "this_class": "defect_cost",
            "text": (az.hold_value.defect_cost_totals.mousebite.length == 1) ? az.hold_value.defect_cost_totals.mousebite.length + " defect" : az.hold_value.defect_cost_totals.mousebite.length + " defects"
        })
    }
    if (types.type == 'pinhole') {
        az.add_html("tally_layout_cells", 17, {
            "html": "<div class='added_tally'></div>"
        })
        az.hold_value.defect_cost_totals.pinhole.push(az.hold_value.hold_pinhole_value)
        az.empty_contents('tally_layout_cells', 18)
        az.add_text("tally_layout_cells", 18, {
            "this_class": "defect_cost",
            "text": (az.hold_value.defect_cost_totals.pinhole.length == 1) ? az.hold_value.defect_cost_totals.pinhole.length + " defect" : az.hold_value.defect_cost_totals.pinhole.length + " defects"
        })
    }
    az.all_style_html("added_tally", {
        "width": "30px",
        "height": "30px",
        "background": "gold",
        "margin": "4px",
        "display": "inline-block"
    })
    az.all_style_text("defect_cost", {
        "align": "center",
        "font-size": "20px",
        "color": "white"
    })
}