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
        _("Employee ID") + ":Link/UR Employee:80",
        _("Employee Name") + "::200",
        _("Employee Code") + "::80",
        _("Employee Email") + "::250",
        _("Employee Type") + "::120",
        _("Order ID") + ":Link/UR Order:80",
        _("Budget") + ":Currency:120",
        _("Total Order") + ":Currency:120",
        _("Over Budget") + ":Currency:120",
    ]


def get_conditions(filters):
    conditions = ""

    return conditions


def get_data(filters):
    '''List of employee who ordered over budget order by type and full name of employee'''
    data = frappe.db.sql(
        f"""
        SELECT 
            `tabUR Employee`.name AS order_id,
            `tabUR Employee`.full_name AS employee_name,
            `tabUR Employee`.employee_code AS employee_code,
            `tabUR Employee`.email AS employee_email,
            `tabUR Employee Type`.title AS employee_type,
            `tabUR Order`.name AS order_id,
            `tabUR Employee Type`.budget AS budget,
            `tabUR Order`.total_price AS total_price,
            (`tabUR Order`.total_price - `tabUR Employee Type`.budget) AS over_budget
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
        WHERE
						`tabUR Employee Type`.budget < `tabUR Order`.total_price
        ORDER BY
            `tabUR Employee`.employee_type_id, `tabUR Employee`.full_name
        """
    )

    return data
