import frappe


@frappe.whitelist()
def add_to_order(employee_id, product_id, product_title, price, quantity, size):
    order = frappe.get_all(
        "UR Order", filters={"employee_id": employee_id}, fields=["name"]
    )
    employee = frappe.get_doc("UR Employee", employee_id)
    budget = employee.get_budget()

    if order and len(order) == 1:
        order = frappe.get_doc("UR Order", order[0].name)
    else:
        order = frappe.new_doc("UR Order")
        order.employee_id = employee_id
        order.insert()
    order.add_to_order(product_id, product_title, price, quantity, size, budget)
    return f"Added {quantity} items to order"


@frappe.whitelist()
def get_employee_order(employee_id):
    order = frappe.get_all(
        "UR Order", filters={"employee_id": employee_id}, fields=["name"]
    )
    if order and len(order) == 1:
        return frappe.get_doc("UR Order", order[0].name).as_dict()
    else:
        return None


def get_employee_budget(employee_id):
    employee = frappe.get_doc("Employee", employee_id)
    return employee.budget
