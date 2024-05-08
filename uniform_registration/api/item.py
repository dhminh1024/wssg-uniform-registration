import frappe
from collections import defaultdict

dt_item = frappe.qb.DocType("UR Item")
dt_assign_item_type = frappe.qb.DocType("UR Assign Item Type")
dt_employee_type = frappe.qb.DocType("UR Employee Type")


@frappe.whitelist(allow_guest=True)
def get_items(search_term=None):
    # items = frappe.get_all(
    #     "UR Item",
    #     fields=[
    #         "name",
    #         "title",
    #         "description",
    #         "price",
    #         "sizes",
    #         "gender",
    #         "item_image",
    #         # "employee_types",
    #     ],
    #     filters=[["title", "like", f"%{search_term}%"]] if search_term else None,
    #     order_by="title asc",
    # )

    # join UR Item and UR Assign Item Type to get employee_types
    # items = (
    #     frappe.qb.from_(dt_item)
    #     .select(
    #         dt_item.name,
    #         dt_item.title,
    #         dt_item.description,
    #         dt_item.price,
    #         dt_item.sizes,
    #         dt_item.gender,
    #         dt_item.item_image,
    #         dt_assign_item_type.employee_type_id,
    #         dt_employee_type.title,
    #         dt_employee_type.budget,
    #     )
    #     .left_join(dt_assign_item_type)
    #     .on(dt_item.name == dt_assign_item_type.item_id)
    #     .left_join(dt_employee_type)
    #     .on(dt_assign_item_type.employee_type_id == dt_employee_type.name)
    #     .where(dt_item.title.like(f"%{search_term}%") if search_term else None)
    #     .order_by("title asc")
    #     .run(as_dict=True)
    # )
    items = frappe.db.sql(
        f"""SELECT
            `tabUR Item`.`name`,
            `tabUR Item`.`title`,
            `tabUR Item`.`title_en`,
            `tabUR Item`.`description`,
            `tabUR Item`.`price`,
            `tabUR Item`.`sizes`,
            `tabUR Item`.`gender`,
            `tabUR Item`.`item_image`,
            `tabUR Assign Item Type`.`employee_type_id`,
            `tabUR Employee Type`.`title` AS `employee_type_title`,
            `tabUR Employee Type`.`budget` AS `employee_type_budget`
        FROM
        `tabUR Item`
        LEFT JOIN `tabUR Assign Item Type` ON `tabUR Item`.`name` = `tabUR Assign Item Type`.`parent`
        LEFT JOIN `tabUR Employee Type` ON `tabUR Assign Item Type`.`employee_type_id` = `tabUR Employee Type`.`name`
        {f"WHERE `tabUR Item`.`title` LIKE %{search_term}%" if search_term else ""}
        ORDER BY
        `tabUR Item`.`title` ASC;"""
    )

    # group by items to get array of employee_types
    grouped_data = defaultdict(
        lambda: {
            "name": "",
            "title": "",
            "title_en": "",
            "description": "",
            "price": "",
            "sizes": "",
            "gender": "",
            "item_image": "",
            "employee_types": [],
        }
    )

    for item in items:
        # item is a tuple with order of fields in the query
        # convert to dict with field names as keys
        fields = [
            "name",
            "title",
            "title_en",
            "description",
            "price",
            "sizes",
            "gender",
            "item_image",
            "employee_type_id",
            "employee_type_title",
            "employee_type_budget",
        ]
        item = dict(zip(fields, item))

        key = item["name"]
        if item["employee_type_id"]:
            grouped_data[key]["employee_types"].append(
                {
                    "employee_type_id": item["employee_type_id"],
                    # "title": item["employee_type_title"],
                    # "budget": item["employee_type_budget"],
                }
            )
        if not grouped_data[key]["name"]:
            grouped_data[key]["name"] = item["name"]
            grouped_data[key]["title"] = item["title"]
            grouped_data[key]["title_en"] = item["title_en"]
            grouped_data[key]["description"] = item["description"]
            grouped_data[key]["price"] = item["price"]
            grouped_data[key]["sizes"] = item["sizes"]
            grouped_data[key]["gender"] = item["gender"]
            grouped_data[key]["item_image"] = item["item_image"]

    result = [{"name": k, **v} for k, v in grouped_data.items()]

    return result
