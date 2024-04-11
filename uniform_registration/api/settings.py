import frappe


@frappe.whitelist()
def get_settings():
    settings = frappe.get_doc("UR Settings")
    return settings.as_dict()
