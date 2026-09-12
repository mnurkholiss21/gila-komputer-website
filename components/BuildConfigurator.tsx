'use client'

import { useState } from 'react'

type Product = { id: number; name: string; price: number; stock: number; category: { name: string } }

export default function BuildConfigurator({ products, categories }: { products: Product[]; categories: string[] }) {
  const [selections, setSelections] = useState<Record<string, number>>({})
  const [saved, setSaved] = useState(false)
  const selectedProducts = categories.map((category) => products.find((product) => product.category.name === category && product.id === selections[category])).filter((product): product is Product => Boolean(product))
  const total = selectedProducts.reduce((sum, product) => sum + product.price, 0)

  return (
    <div className="builder-layout">
      <div className="builder-options">
        {categories.map((category) => {
          const options = products.filter((product) => product.category.name === category)
          return <label className="builder-field" key={category}><span><b>{category}</b><small>{options.some((product) => product.stock > 0) ? 'Tersedia' : 'Habis'}</small></span><select value={selections[category] ?? ''} onChange={(event) => setSelections({ ...selections, [category]: Number(event.target.value) })}><option value="">Pilih {category}</option>{options.map((product) => <option key={product.id} value={product.id} disabled={product.stock === 0}>{product.name} {product.stock === 0 ? '(habis)' : ''}</option>)}</select></label>
        })}
      </div>
      <aside className="builder-summary"><p className="eyebrow">Build summary</p><h2>Rakit yang<br /><em>punya arah.</em></h2><div className="summary-items">{selectedProducts.length ? selectedProducts.map((product) => <div key={product.id}><span>{product.category.name}</span><strong>Rp {product.price.toLocaleString('id-ID')}</strong></div>) : <p className="summary-empty">Pilih komponen untuk melihat estimasi.</p>}</div><div className="summary-total"><span>Estimasi total</span><strong>Rp {total.toLocaleString('id-ID')}</strong></div><button className="button button-dark" disabled={!selectedProducts.length} onClick={() => { localStorage.setItem('gila-komputer-build', JSON.stringify(selections)); setSaved(true) }}>{saved ? 'Build tersimpan' : 'Simpan build'} <span>↗</span></button></aside>
    </div>
  )
}
