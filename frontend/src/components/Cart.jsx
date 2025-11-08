import React from 'react'

export default function Cart({ cart, onRemove, onCheckout }) {
  return (
    <aside className="cart">
      <h2 style={{ marginBottom: 12 }}>Your Cart</h2>
      <div className="cart-panel">
        {cart.items.length === 0 ? (
          <p className="muted">Your cart is empty</p>
        ) : (
          <div>
            <ul>
              {cart.items.map(it => (
                <li key={it.id} className="cart-item">
                  <div className="info">
                    <strong>{it.name}</strong>
                    <div className="muted">${it.price.toFixed(2)} × {it.qty}</div>
                  </div>
                  <div>
                    <button className="btn ghost small" onClick={() => onRemove(it.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <div>
                <div className="muted">Total</div>
                <strong style={{ fontSize: 18 }}>${cart.total.toFixed(2)}</strong>
              </div>
              <div>
                <button className="btn primary" onClick={onCheckout}>Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
