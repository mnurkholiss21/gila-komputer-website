'use client'

export default function CartTrigger() {
  return <button className="nav-cart" onClick={() => window.dispatchEvent(new Event('gila:open-cart'))}>Keranjang <span>0</span></button>
}
