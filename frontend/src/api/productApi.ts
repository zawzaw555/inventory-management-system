import type { Product, ProductInput } from '../types/Product'

const API_URL = '/api/products'

async function request<T>(
	url: string,
	options?: RequestInit
): Promise<T> {
	const response = await fetch(url, options)
	
	if (!response.ok) {
		throw new Error(`API Error: ${response.status}`)
	}
	
	if (response.status === 204) {
		return undefined as T
	}
	
	return response.json() as Promise<T>
}

export const productApi = {
	getAll: () => request<Product[]>(API_URL),
	
	getById: (id: number) =>
		request<Product>(`${API_URL}/${id}`),
	
	create: (data: ProductInput) =>
		request<Product>(API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		}),
	update: (id: number, data: ProductInput) =>
		request<Product>(`${API_URL}/${id}`, {
		    method: 'PUT',
		    headers: { 'Content-Type': 'application/json' },
		    body: JSON.stringify(data),
		}),
		
	remove: (id: number) =>
		request<void>(`${API_URL}/${id}`,{
			method: `DELETE`,
		}),
}