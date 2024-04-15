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
		item_sizes: DF.Data
		item_title: DF.Data
		notes: DF.LongText | None
		order_id: DF.Link
		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
		price: DF.Int
		quantity: DF.Int
		size: DF.Data
	# end: auto-generated types
	pass
