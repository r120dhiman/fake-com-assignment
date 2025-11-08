import React, { useEffect, useState } from 'react'

export default function Profile({ token }) {
  const [loading, setLoading] = useState(true)
  const [receipts, setReceipts] = useState([])

  useEffect(() => {
    if (!token) return setLoading(false)
    fetch('/api/history', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        setReceipts(data.receipts || [])
      })
      .catch(() => setReceipts([]))
      .finally(() => setLoading(false))
  }, [token])

  if (loading) return <div className="center">Loading history...</div>

  return (
    <section className="profile">
      <h2>Your Order History</h2>
      {receipts.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <ul className="history-list">
          {receipts.map(r => (
            <li key={r.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>Order {r.id}</strong>
                  <div className="muted">{new Date(r.timestamp).toLocaleString()}</div>
                </div>
                <div>
                  <strong>${r.total.toFixed(2)}</strong>
                </div>
              </div>
              <ul>
                {r.items.map((it, i) => (
                  <li key={i}>{it.name} × {it.qty} — ${it.price.toFixed(2)}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
