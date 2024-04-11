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
        _("Item ID") + ":Link/UR Item:80",
        _("Item Title") + "::240",
        _("Item Size") + "::80",
        _("Item Gender") + "::120",
        _("Quantity") + "::80",
        _("Item Price") + ":Currency:120",
        _("Total Price") + ":Currency:120",
    ]


def get_conditions(filters):
    conditions = ""

    return conditions


def get_data(filters):
    '''Get data from UR Order Item table group by Item ID and size then sum the quantity and total price
    '''
    data = frappe.db.sql(
        f"""
						SELECT
								`tabUR Order Item`.item_id AS 'Item ID',
                CONCAT(`tabUR Order Item`.item_title, " (", `tabUR Order Item`.size, ")") AS 'Item Title',
                `tabUR Order Item`.size AS 'Item Size',
                `tabUR Item`.gender AS 'Item Gender',
								SUM(`tabUR Order Item`.quantity) AS 'Quantity',
								`tabUR Order Item`.price AS 'Item Price',
								(SUM(`tabUR Order Item`.quantity)*`tabUR Order Item`.price) AS 'Total Price'
						FROM
								`tabUR Order Item`
						LEFT JOIN
								`tabUR Item` ON `tabUR Order Item`.item_id = `tabUR Item`.name
						GROUP BY
								`tabUR Order Item`.item_id, `tabUR Order Item`.size
            
        """
    )

    return data
