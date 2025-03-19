// Copyright (c) 2025, nguyen.tranhai1810@gmail.com and contributors
// For license information, please see license.txt

frappe.ui.form.on('People Committee Input', {
    quy: function(frm) {
        updateTime(frm);
    },
    nam: function(frm) {
        updateTime(frm);
    }
});

function updateTime(frm) {
    // Quarter-to-month mapping
    const QUARTER_TO_MONTH = {
        "Q1": "01",
        "Q2": "04",
        "Q3": "07",
        "Q4": "10"
    };

    // Ensure both fields are set before proceeding
    const { quy, nam } = frm.doc;
    if (!quy || !nam) return; // Exit early if either field is missing

    // Calculate new time value
    const month = QUARTER_TO_MONTH[quy] || "01"; // Default to "01" for invalid quarters
    const newTime = `${nam}-${month}-01`;

    // Update field if valid
    if (isValidDate(newTime)) {
        frm.set_value("thoi_gian", newTime);
    } else {
        frappe.msgprint({
            title: __("Invalid Date"),
            indicator: "orange",
            message: __("The selected quarter and year combination is invalid.")
        });
    }
}

// Helper function to validate date string
function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && dateString === date.toISOString().split("T")[0];
}
