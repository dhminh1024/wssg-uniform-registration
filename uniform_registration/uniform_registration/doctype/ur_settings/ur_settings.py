# Copyright (c) 2024, Digital Learning Team and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class URSettings(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		allow_over_budget: DF.Check
		allow_registration: DF.Check
		default_currency: DF.Link | None
		over_budget_discount: DF.Float
		tailor_made_price: DF.Float
	# end: auto-generated types
	pass
