
export interface UREmployee{
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
	/**	Employee Code : Data	*/
	employee_code: string
	/**	Full Name : Data	*/
	full_name: string
	/**	Employee Type : Link - UR Employee Type	*/
	employee_type_id?: string
	/**	Bonus : Float	*/
	bonus?: number
	/**	Email : Data	*/
	email: string
	/**	Gender : Select	*/
	gender: "Male" | "Female"
	/**	Avatar : Attach Image	*/
	avatar?: string
	/**	Status : Select	*/
	status?: "None" | "Ordered"
}