import React, { useState } from 'react'

export default function CheckoutModal({ cart, onClose, token }) {
  const [receipt, setReceipt] = useState(null)

  const [processing, setProcessing] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!token) return alert('Please login to complete purchase')
    try {
      setProcessing(true)
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (res.ok) setReceipt(data.receipt)
      else alert(data.error || 'Checkout failed')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close" onClick={onClose}>✕</button>
        {!receipt ? (
          <div>
            <h3>Checkout</h3>
            <p>Order total: <strong>${cart.total.toFixed(2)}</strong></p>
            <form onSubmit={submit} className="checkout-form">
              <div className="form-actions">
                  <button className="btn ghost" type="button" onClick={onClose} disabled={processing}>Cancel</button>
                  <button className="btn primary" type="submit" disabled={processing}>{processing ? 'Processing…' : 'Complete Purchase'}</button>
                </div>
            </form>
          </div>
        ) : (
          <div className="receipt">
            <div className="success-wrap">
              <div className="check-svg check">
                <svg viewBox="0 0 52 52">
                  <circle className="circle" cx="26" cy="26" r="20" strokeWidth="4" fill="none" />
                  <path className="tick" fill="none" d="M16 27 l7 7 l13 -13" strokeWidth="4" />
                </svg>
              </div>
              <div>
                <h3>Thank you</h3>
                <p>Order <code>{receipt.id}</code> completed</p>
                <p><strong>${receipt.total.toFixed(2)}</strong></p>
                <p><small>{new Date(receipt.timestamp).toLocaleString()}</small></p>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <button className="btn" onClick={onClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
