# Copyright (c) 2024, Digital Learning Team and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class UREmployee(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF

        avatar: DF.AttachImage | None
        bonus: DF.Float
        email: DF.Data
        employee_code: DF.Data
        employee_type_id: DF.Link | None
        full_name: DF.Data
        gender: DF.Literal["Male", "Female"]
    # end: auto-generated types
    def get_budget(self):
        return frappe.get_doc("UR Employee Type", self.employee_type_id).budget
