export interface Product {
	id: number
	name: string
	sku: string
	price: number
	categoryId: number | null
	createdAt: string
}

export interface ProductInput {
	name: string
	sku: string
	price: number
	categoryId: number | null
}