import frappe
from .utils import check_allow_registration

employee = frappe.qb.DocType("UR Employee")
employee_type = frappe.qb.DocType("UR Employee Type")


@frappe.whitelist(allow_guest=True)
def sign_in(email, password):
    user = frappe.get_all(
        "UR Employee", filters={"email": email}, fields=["name", "employee_code"]
    )
    if user and len(user) == 1:
        if user[0].employee_code == password:
            return user[0].name
        else:
            frappe.throw("Invalid Employee Code")
    else:
        frappe.throw("User not found")


@frappe.whitelist()
def get_current_user(user_id):
    query = (
        frappe.qb.from_(employee)
        .select(
            employee.name,
            employee.employee_code,
            employee.email,
            employee.full_name,
            employee.gender,
            employee.avatar,
            employee.bonus,
            employee_type.title,
            employee_type.budget,
        )
        .left_join(employee_type)
        .on(employee.employee_type_id == employee_type.name)
        .where(employee.name == user_id)
    )

    return query.run(as_dict=True)
