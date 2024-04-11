app_name = "uniform_registration"
app_title = "Uniform Registration"
app_publisher = "Digital Learning Team"
app_description = "Wellspring's tool for uniform registration based on personal budget"
app_email = "digital.learning@wellspringsaigon.edu.vn"
app_license = "mit"
app_logo_url = "/assets/uniform_registration/images/wellspring_logo.png"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_css = "/assets/uniform_registration/css/uniform_registration.css"
# app_include_js = "/assets/uniform_registration/js/uniform_registration.js"

# include js, css files in header of web template
web_include_css = "/assets/uniform_registration/css/uniform_registration.css"
# web_include_js = "/assets/uniform_registration/js/uniform_registration.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "uniform_registration/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

website_context = {
    "favicon": "/assets/uniform_registration/images/wssg_favicon.svg",
    "splash_image": "/assets/uniform_registration/images/logo_wssg.png",
}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "uniform_registration/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "uniform_registration.utils.jinja_methods",
# 	"filters": "uniform_registration.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "uniform_registration.install.before_install"
# after_install = "uniform_registration.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "uniform_registration.uninstall.before_uninstall"
# after_uninstall = "uniform_registration.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "uniform_registration.utils.before_app_install"
# after_app_install = "uniform_registration.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "uniform_registration.utils.before_app_uninstall"
# after_app_uninstall = "uniform_registration.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "uniform_registration.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"uniform_registration.tasks.all"
# 	],
# 	"daily": [
# 		"uniform_registration.tasks.daily"
# 	],
# 	"hourly": [
# 		"uniform_registration.tasks.hourly"
# 	],
# 	"weekly": [
# 		"uniform_registration.tasks.weekly"
# 	],
# 	"monthly": [
# 		"uniform_registration.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "uniform_registration.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "uniform_registration.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "uniform_registration.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["uniform_registration.utils.before_request"]
# after_request = ["uniform_registration.utils.after_request"]

# Job Events
# ----------
# before_job = ["uniform_registration.utils.before_job"]
# after_job = ["uniform_registration.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"uniform_registration.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }


website_route_rules = [
    {"from_route": "/frontend/<path:app_path>", "to_route": "frontend"},
]
export_python_type_annotations = True

fixtures = [
    {
        "doctype": "Client Script",
        "filters": [["module", "in", ("Uniform Registration")]],
    }
]
