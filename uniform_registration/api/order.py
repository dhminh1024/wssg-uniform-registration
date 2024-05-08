import frappe
from .utils import check_allow_registration


@frappe.whitelist()
def add_to_order(employee_id, product_id, quantity, size):
    check_allow_registration()

    order = frappe.get_all(
        "UR Order", filters={"employee_id": employee_id}, fields=["name"]
    )

    if order and len(order) == 1:
        order = frappe.get_doc("UR Order", order[0].name)
    else:
        order = frappe.new_doc("UR Order")
        order.employee_id = employee_id
        order.insert()

    budget = get_employee_budget(employee_id)
    product = frappe.get_doc("UR Item", product_id)
    settings = frappe.get_doc("UR Settings")
    tailor_made_price = settings.tailor_made_price

    order.add_to_order(
        product_id,
        product.title,
        product.title_en,
        product.price,
        quantity,
        size,
        product.sizes,
        budget,
        tailor_made_price,
    )
    return f"Added {quantity} items to order"


@frappe.whitelist()
def delete_order_item(employee_id, order_item_id):
    check_allow_registration()

    order = frappe.get_all(
        "UR Order", filters={"employee_id": employee_id}, fields=["name"]
    )
    if order and len(order) == 1:
        order = frappe.get_doc("UR Order", order[0].name)
        return order.remove_from_order(order_item_id)
    else:
        frappe.throw("Order not found")


@frappe.whitelist()
def update_order_item(employee_id, order_item_id, size, quantity, notes):
    # check_allow_registration()

    order = frappe.get_all(
        "UR Order", filters={"employee_id": employee_id}, fields=["name"]
    )

    if order and len(order) == 1:
        budget = get_employee_budget(employee_id)
        order = frappe.get_doc("UR Order", order[0].name)
        return order.update_order_item(order_item_id, size, quantity, notes, budget)
    else:
        frappe.throw("Order not found")


@frappe.whitelist()
def get_employee_order(employee_id):
    order = frappe.get_all(
        "UR Order", filters={"employee_id": employee_id}, fields=["name"]
    )
    if order and len(order) == 1:
        order = frappe.get_doc("UR Order", order[0].name).as_dict()
        # inside order is an array of shopping_cart items, sort them by item_title
        order["shopping_cart"] = sorted(
            order["shopping_cart"], key=lambda x: x["item_title"]
        )
        return order
    else:
        return None


def get_employee_budget(employee_id):
    employee = frappe.get_doc("UR Employee", employee_id)
    return employee.get_budget()
