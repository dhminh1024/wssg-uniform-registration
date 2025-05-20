import frappe


@frappe.whitelist(allow_guest=True)
def get_settings():
    settings = frappe.get_doc("UR Settings")
    return settings.as_dict()
