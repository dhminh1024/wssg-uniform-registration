
export interface URPackageItem{
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
	/**	Package : Link - UR Package	*/
	package_id: string
	/**	Item : Link - UR Item	*/
	item_id: string
	/**	Quantity : Int	*/
	quantity: number
}