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
        from uniform_registration.uniform_registration.doctype.ur_order_item.ur_order_item import (
            UROrderItem,
        )

        employee_id: DF.Link
        shopping_cart: DF.Table[UROrderItem]
        total_price: DF.Float

    # end: auto-generated types
    def add_to_order(
        self, product_id, product_title, price, quantity, size, sizes, budget
    ):
        order_item = self.get_order_item(product_id, size)
        if order_item:
            order_item.quantity += quantity
        else:
            order_item = self.append("shopping_cart", {})
            order_item.order_id = self.name
            order_item.item_id = product_id
            order_item.item_title = product_title
            order_item.item_sizes = sizes
            order_item.price = price
            order_item.quantity = quantity
            order_item.size = size

        self.calculate_total()
        settings = frappe.get_doc("UR Settings")
        if (self.total_price > budget) and not settings.allow_over_budget:
            frappe.throw("You have exceeded your budget")

        order_item.save()

    def remove_from_order(self, order_item_id):
        order_item = self.get_order_item_by_id(order_item_id)
        if order_item:
            self.shopping_cart.remove(order_item)
            self.calculate_total()
            self.save()
            order_item.delete()
            return f"Removed {order_item.item_title} from order"
        else:
            frappe.throw(f"Item not found in order")

    def update_order_item(self, order_item_id, size, quantity, notes, budget):
        order_item = self.get_order_item_by_id(order_item_id)
        same_size_item = self.get_order_item(order_item.item_id, size)
        if order_item:
            order_item.quantity = quantity
            order_item.size = size
            order_item.notes = notes

            self.calculate_total()
            settings = frappe.get_doc("UR Settings")
            if (self.total_price > budget) and not settings.allow_over_budget:
                frappe.throw("You have exceeded your budget")

            if not same_size_item or same_size_item.name == order_item_id:
                order_item.save()
            else:
                same_size_item.quantity += quantity
                self.shopping_cart.remove(order_item)
                order_item.delete()

            self.save()
            return f"Updated {order_item.item_title} successfully"
        else:
            frappe.throw(f"Item not found in order")

    def get_order_item_by_id(self, order_item_id):
        for item in self.shopping_cart:
            if item.name == order_item_id:
                return item
        return None

    def get_order_item(self, product_id, size):
        for item in self.shopping_cart:
            if item.item_id == product_id and item.size == size:
                return item
        return None

    def calculate_total(self):
        self.total_price = sum(
            [item.quantity * item.price for item in self.shopping_cart]
        )
        self.save()
