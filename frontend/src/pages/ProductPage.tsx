import { useEffect, useState } from 'react'
import { productApi } from '../api/productApi'
import ProductForm from '../components/ProductForm'
import type { Product, ProductInput } from '../types/Product'

export default function ProductPage() {
	const [products, setProducts] = useState<Product[]>([])
	const [editing, setEditing] = useState<Product | null>(null)
	const [showForm, setShowForm] = useState(false)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	
	async function loadProducts() {
		setLoading(true)
		setError('')
		
		try {
			const data = await productApi.getAll()
			setProducts(data)
		} catch (err) {
			setError(
				err instanceof Error ? err.message : '取得失敗しました'
			)
		} finally {
			setLoading(false)
		}
	}
	
	useEffect(() => {
		let ignore = false
		
		async function fetchProducts() {
			try {
				const data = await productApi.getAll()
				
				if (!ignore) {
					setProducts(data)
				}
			} catch (err) {
				if (!ignore) {
					setError(
						err instanceof Error
							? err.message
							: '取得に失敗しました'
					)
				}
			} finally {
				if (!ignore) {
					setLoading(false)
				}
			}
		}
		
		void fetchProducts()
		return () => {
			ignore = true
		}
	}, [])
	
	async function handleSave(data: ProductInput) {
		if (editing) {
			await productApi.update(editing.id, data)
		} else {
			await productApi.create(data)
		}
		
		setShowForm(false)
		setEditing(null)
		await loadProducts()
	}
	
	async function handleDelete(id: number) {
		if (!window.confirm('この商品を削除しますか？')) {
			return
		}
		
		try {
			await productApi.remove(id)
			await loadProducts()
		} catch (err) {
			setError(
				err instanceof Error ? err.message : '削除に失敗しました'
			)
		}
	}
	
	return (
		<main className='container'>
			<h1>Inventory Management System</h1>
			
			<div className="toolbar">
				<h2>商品一覧</h2>
				<button onClick={() => {
					setEditing(null)
					setShowForm(true)
				}}>
					+ 商品登録
				</button>
			</div>
			
			{error && <p className='error'>{error}</p>}
			
			{showForm && (
				<ProductForm
					key={editing?.id ?? 'new'}
					initialData={editing ?? undefined}
					onSave={handleSave}
					onCancel={() => {
						setShowForm(false)
						setEditing(null)
					}}
				/>
			)}
			{loading ? (
				<p>読み込み中...</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>ID</th>
						    <th>商品名</th>
						    <th>SKU</th>
						    <th>価格</th>
						    <th>カテゴリーID</th>
						    <th>操作</th>
						</tr>
					</thead>
					<tbody>
					  {products.map((product) => (
					    <tr key={product.id}>
					      <td>{product.id}</td>
					      <td>{product.name}</td>
					      <td>{product.sku}</td>
					      <td>¥{product.price.toLocaleString('ja-JP')}</td>
					      <td>{product.categoryId ?? '-'}</td>
					      <td>
					        <button onClick={() => {
					          setEditing(product)
					          setShowForm(true)
					        }}>
					          編集
					        </button>

					        <button
					          className="delete"
					          onClick={() => handleDelete(product.id)}
					        >
					          削除
					        </button>
					      </td>
					    </tr>
					  ))}
					</tbody>
				</table>
				)
			}
		</main>
	)
}