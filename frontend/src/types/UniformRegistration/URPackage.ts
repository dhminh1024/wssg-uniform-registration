import { URPackageItem } from './URPackageItem'

export interface URPackage{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Employee Type : Link - UR Employee Type	*/
	employee_type_id: string
	/**	Title : Data	*/
	title: string
	/**	Gender : Select	*/
	gender: "Male" | "Female"
	/**	Item List : Table - UR Package Item	*/
	item_list?: URPackageItem[]
}