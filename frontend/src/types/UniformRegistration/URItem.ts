import { URAssignItemType } from './URAssignItemType'

export interface URItem{
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
	/**	Title : Data	*/
	title: string
	/**	Title EN : Data	*/
	title_en: string
	/**	Description : Text	*/
	description?: string
	/**	Price : Int	*/
	price: number
	/**	Sizes : Data	*/
	sizes: string
	/**	Gender : Select	*/
	gender?: "Male" | "Female" | "All"
	/**	Item Image : Attach Image	*/
	item_image?: string
	/**	Employee Types : Table MultiSelect - UR Assign Item Type	*/
	employee_types?: URAssignItemType[]
}