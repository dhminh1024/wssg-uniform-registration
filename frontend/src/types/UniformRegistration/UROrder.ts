import { UROrderItem } from './UROrderItem'

export interface UROrder{
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
	/**	Employee : Link - UR Employee	*/
	employee_id: string
	/**	Shopping Cart : Table - UR Order Item	*/
	shopping_cart?: UROrderItem[]
	/**	Total Price : Float	*/
	total_price?: number
}