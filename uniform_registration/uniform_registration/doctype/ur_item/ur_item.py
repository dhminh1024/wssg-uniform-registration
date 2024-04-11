# Copyright (c) 2024, Digital Learning Team and contributors
# For license information, please see license.txt

# import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe.model.document import Document


class URItem(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		description: DF.Text | None
		gender: DF.Literal["Male", "Female", "All"]
		item_image: DF.AttachImage | None
		price: DF.Int
		sizes: DF.Data
		title: DF.Data
	# end: auto-generated types
	pass
