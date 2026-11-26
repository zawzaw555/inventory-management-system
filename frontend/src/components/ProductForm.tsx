import { useState } from 'react'
import type { FormEvent } from 'react'
import type { ProductInput } from '../types/Product'

interface Props {
	initialData?: ProductInput
	onSave: (data: ProductInput) => Promise<void>
	onCancel: () => void
}

export default function ProductForm({
	initialData,
	onSave,
	onCancel,
}: Props) {
	const [name, setName] = useState(initialData?.name ?? '')
	const [sku, setSku] = useState(initialData?.sku ?? '')
	const [price, setPrice] = useState(
		initialData ? String(initialData.price) : '')
	const [categoryId, setCategoryId] = useState(
		initialData?.categoryId != null
		? String(initialData.categoryId) : '')
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState('')
	
	async function handleSubmit(e: FormEvent<HTMLFormElement>)
	{
		e.preventDefault()
		
		if(!name.trim() || !sku.trim()) {
			setError('商品名とSKUは必須です')
			return
		}
		
		if(price.trim() === '' ||
		   !Number.isFinite(Number(price)) ||
	   		Number(price) < 0) {
				setError('価格は0以上の数値を入力してください')
				return
		}
		
		if(categoryId.trim() !== '' &&
			(!Number.isInteger(Number(categoryId)) ||
			  Number(categoryId) <= 0)) {
			setError('カテゴリーIDは正の整数で入力してください')
			return
		}
		
		setSaving(true)
		setError('')
		
		try {
			await onSave({
				name: name.trim(),
				sku: sku.trim(),
				price: Number(price),
				categoryId: categoryId.trim()
					? Number(categoryId)
					: null,
			})
		} catch(err) {
			setError(
				err instanceof Error ? err.message : '保存に失敗しました'
			)
		} finally {
			setSaving(false)
		}
	}
	
	return (
		<form onSubmit={handleSubmit} className="product-form">
			<h2>商品情報</h2>
			
			<label>商品名</label>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			
			<label>SKU</label>
			<input
				value={sku}
				onChange={(e) => setSku(e.target.value)}
				required
			/>
			
			<label>価格</label>
			<input
				type="number"
				min="0"
				step="0.01"
				value={price}
				onChange={(e) => setPrice(e.target.value)}
				required
			/>
			
			<label>カテゴリーID（任意）</label>
			<input
			    type="number"
			    min="1"
			    step="1"
			    value={categoryId}
			    onChange={(e) => setCategoryId(e.target.value)}
			/>
			
			{error && <p className="error">{error}</p>}
			
			<div className="actions">
				<button type="submit" disabled={saving}>
					{saving ? '保存中...' : '保存'}
				</button>
				<button type="button" onClick={onCancel}>
					キャンセル
				</button>
			</div>
		</form>
	)
}