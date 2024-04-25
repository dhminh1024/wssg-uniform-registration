# Copyright (c) 2024, Digital Learning Team and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class URPackage(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from uniform_registration.uniform_registration.doctype.ur_package_item.ur_package_item import URPackageItem

		employee_type_id: DF.Link
		gender: DF.Literal["Male", "Female"]
		item_list: DF.Table[URPackageItem]
		title: DF.Data
	# end: auto-generated types
	pass
