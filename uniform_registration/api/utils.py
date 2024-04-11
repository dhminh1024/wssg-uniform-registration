import frappe


def check_allow_registration():
    settings = frappe.get_doc("UR Settings")
    if not settings.allow_registration:
        frappe.throw("Registration has been disabled")
    return settings
