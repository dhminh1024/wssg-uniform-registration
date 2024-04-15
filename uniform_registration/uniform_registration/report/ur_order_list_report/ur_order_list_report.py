# Copyright (c) 2013, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt


import frappe
from frappe import _


def execute(filters=None):
    filters = frappe._dict(filters or {})
    columns = get_columns(filters)
    data = get_data(filters)
    return columns, data


def get_columns(filters):
    return [
        _("Order ID") + ":Link/UR Order:80",
        _("Employee Name") + "::200",
        _("Employee Code") + "::80",
        _("Employee Type") + "::120",
        _("Item ID") + ":Link/UR Item:80",
        _("Item Title") + "::240",
        _("Size") + "::60",
        _("Notes") + "::80",
        _("Quantity") + "::80",
        _("Item Price") + ":Currency:120",
        _("Total Price") + ":Currency:120",
    ]


def get_conditions(filters):
    conditions = ""

    if filters.employee_type and filters.employee_type != "":
        conditions += f" AND employee_type LIKE '%{filters.employee_type}%'"
        return conditions

    return conditions


def get_data(filters):
    data = frappe.db.sql(
        f"""
        SELECT 
            `tabUR Order`.name AS order_id,
            `tabUR Employee`.full_name AS employee_name,
            `tabUR Employee`.employee_code AS employee_code,
            `tabUR Employee Type`.title AS employee_type,
            `tabUR Order Item`.item_id AS item_id,
            `tabUR Order Item`.item_title AS item_title,
            `tabUR Order Item`.size AS size,
            `tabUR Order Item`.notes AS notes,
            `tabUR Order Item`.quantity AS quantity,
            `tabUR Order Item`.price AS price,
            (`tabUR Order Item`.quantity * `tabUR Order Item`.price) AS total_price
        FROM 
            `tabUR Order`
        LEFT JOIN
            `tabUR Employee`
        ON
            `tabUR Order`.employee_id = `tabUR Employee`.name
        LEFT JOIN
            `tabUR Employee Type`
        ON
            `tabUR Employee`.employee_type_id = `tabUR Employee Type`.name
        JOIN
            `tabUR Order Item`
        ON
            `tabUR Order`.name = `tabUR Order Item`.parent
        WHERE
            `tabUR Order`.docstatus = 0
            {get_conditions(filters)}
        ORDER BY
            `tabUR Order`.name
        """
    )

    return data
