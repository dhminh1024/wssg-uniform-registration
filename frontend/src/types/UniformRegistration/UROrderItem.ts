
export interface UROrderItem{
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
	/**	Order : Link - UR Order	*/
	order_id: string
	/**	Item : Link - UR Item	*/
	item_id: string
	/**	Item Title : Data	*/
	item_title: string
	/**	Item Title EN : Data	*/
	item_title_en: string
	/**	Item Sizes : Data	*/
	item_sizes: string
	/**	Price : Int	*/
	price: number
	/**	Quantity : Int	*/
	quantity: number
	/**	Size : Data	*/
	size: string
	/**	Item Image : Attach Image	*/
	item_image?: string
	/**	Notes : Long Text	*/
	notes?: string
}