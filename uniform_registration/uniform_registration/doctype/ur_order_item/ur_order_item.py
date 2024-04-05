# Copyright (c) 2024, Digital Learning Team and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class UROrderItem(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		item_id: DF.Link
		item_image: DF.AttachImage | None
		item_title: DF.Data
		order_id: DF.Link
		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
		price: DF.Int
		quantity: DF.Int
		size: DF.Literal["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
	# end: auto-generated types
	pass
