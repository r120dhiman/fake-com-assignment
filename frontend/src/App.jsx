import React, { useEffect, useState } from 'react'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import CheckoutModal from './components/CheckoutModal'
import Auth from './components/Auth'
import Navbar from './components/Navbar'
import Profile from './components/Profile'

export default function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [showCheckout, setShowCheckout] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(null)
  const [view, setView] = useState('products')

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts)
    fetchCart()
  }, [])

  function fetchCart() {
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    fetch('/api/cart', { headers }).then(async r => {
      if (r.status === 401) {
        setCart({ items: [], total: 0 })
        return
      }
      const data = await r.json()
      setCart(data)
    })
  }

  async function addToCart(productId) {
    if (!token) return setShowAuth(true)
    await fetch('/api/cart', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ productId, qty: 1 }) })
    fetchCart()
  }

  async function removeFromCart(id) {
    if (!token) return setShowAuth(true)
    await fetch(`/api/cart/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    fetchCart()
  }

  function handleLogin(newToken) {
    // newToken may be token or (token,user)
    if (!newToken) return
    setToken(newToken)
    localStorage.setItem('token', newToken)
    fetchCart()
  }

  function handleLoginWithUser(newToken, newUser) {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem('token', newToken)
    fetchCart()
  }

  return (
    <div className="app-root">
      <header className="site-header">
        <div className="container">
          <div className="brand">
            <div className="logo">V</div>
            <h1>Vibe Commerce — Mock Cart</h1>
          </div>
        </div>
      </header>
      <Navbar user={user} onLoginClick={() => setShowAuth(true)} onLogout={() => { setToken(''); setUser(null); localStorage.removeItem('token'); setView('products'); setCart({ items: [], total: 0 }) }} onNavigate={(v) => setView(v)} />

      <main className="container">
        <div className="main-grid">
        {view === 'products' && (
          <>
            <ProductList products={products} onAdd={addToCart} />
            <Cart cart={cart} onRemove={removeFromCart} onCheckout={() => setShowCheckout(true)} />
          </>
        )}

        {view === 'profile' && (
          <Profile token={token} />
        )}
        </div>
      </main>

      {showCheckout && (
        <CheckoutModal cart={cart} token={token} onClose={() => { setShowCheckout(false); fetchCart() }} />
      )}

      {showAuth && (
        <Auth onClose={() => setShowAuth(false)} onLogin={handleLoginWithUser} />
      )}
    </div>
  )
}
