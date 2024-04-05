# Copyright (c) 2024, Digital Learning Team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class UROrder(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF
        from uniform_registration.uniform_registration.doctype.ur_order_item.ur_order_item import UROrderItem

        employee_id: DF.Link
        shopping_cart: DF.Table[UROrderItem]
        total_price: DF.Float
    # end: auto-generated types
    def add_to_order(self, product_id, product_title, price, quantity, size, budget):
        order_item = self.get_order_item(product_id)
        if order_item:
            order_item.quantity += quantity
        else:
            order_item = self.append("shopping_cart", {})
            order_item.order_id = self.name
            order_item.item_id = product_id
            order_item.item_title = product_title
            order_item.price = price
            order_item.quantity = quantity
            order_item.size = size

        self.calculate_total()
        if self.total_price > budget:
            frappe.throw("You have exceeded your budget")
        order_item.save()

    def get_order_item(self, product_id):
        for item in self.shopping_cart:
            if item.item_id == product_id:
                return item
        return None

    def calculate_total(self):
        self.total_price = sum(
            [item.quantity * item.price for item in self.shopping_cart]
        )
        self.save()
