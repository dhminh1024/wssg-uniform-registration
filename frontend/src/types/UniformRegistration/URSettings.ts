
export interface URSettings{
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
	/**	Default Currency : Link - Currency	*/
	default_currency?: string
	/**	Allow Over Budget : Check	*/
	allow_over_budget?: 0 | 1
	/**	Allow Registration : Check	*/
	allow_registration?: 0 | 1
}