// Copyright (c) 2024, Digital Learning Team and contributors
// For license information, please see license.txt

// frappe.ui.form.on("UR Employee", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on("UR Employee", {
  refresh(frm) {
    // your code here
    $(".form-assignments").hide();
    $(".form-attachments").hide();
    $(".form-shared").hide();
    // $(".form-tags").hide();
    $(".form-sidebar-stats").hide();
    // $(".list-unstyled.sidebar-menu.text-muted").hide();
  },
});
