'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type CartItem = { id: string; name: string; category: string; price: number }

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const addItem = (event: Event) => {
      const item = (event as CustomEvent<CartItem>).detail
      setItems((current) => current.some((existing) => existing.id === item.id) ? current : [...current, item])
      setIsOpen(true)
    }
    const openCart = () => setIsOpen(true)
    window.addEventListener('gila:add-to-cart', addItem)
    window.addEventListener('gila:open-cart', openCart)
    return () => {
      window.removeEventListener('gila:add-to-cart', addItem)
      window.removeEventListener('gila:open-cart', openCart)
    }
  }, [])

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return <AnimatePresence>{isOpen && <>
    <motion.button className="cart-backdrop" aria-label="Tutup keranjang" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} />
    <motion.aside className="cart-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }} aria-label="Keranjang belanja">
      <div className="cart-header"><div><p className="eyebrow">Gila Komputer / pilihanmu</p><h2>Siap<br /><em>berangkat.</em></h2></div><button className="cart-close" onClick={() => setIsOpen(false)} aria-label="Tutup keranjang">×</button></div>
      <div className="cart-items">{items.length ? items.map((item) => <div className="cart-item" key={item.id}><div><p>{item.category}</p><strong>{item.name}</strong></div><span>Rp {item.price.toLocaleString('id-ID')}</span></div>) : <div className="cart-empty"><span>＋</span><p>Belum ada komponen.<br />Tambahkan pilihan pertamamu.</p></div>}</div>
      <div className="cart-footer"><div><span>Estimasi total</span><strong>Rp {total.toLocaleString('id-ID')}</strong></div><button className="button button-dark" disabled={!items.length}>Lanjutkan <span>↗</span></button></div>
    </motion.aside>
  </>}</AnimatePresence>
}
