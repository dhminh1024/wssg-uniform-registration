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

function ExportButtonFunction(listview) {
  frappe.msgprint("Importing...");
}

frappe.listview_settings["UR Employee"] = {
  refresh: function (listview) {
    // listview.page.add_inner_button(__("Import"), function () {
    //   ExportButtonFunction(listview);
    // });
  },
};
