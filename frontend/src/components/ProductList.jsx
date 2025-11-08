import  { useState } from 'react'

export default function ProductList({ products, onAdd }) {
  const [animating, setAnimating] = useState(null)

  function handleAdd(id) {
    setAnimating(id)
    setTimeout(() => setAnimating(null), 900)
    onAdd(id)
  }

  return (
    <section className="products" style={{ position: 'relative' }}>
      <h2 style={{ marginBottom: 12 }}>Products</h2>
      <div className="grid">
        {products.map(p => (
          <div key={p.id} className={`card ${animating === p.id ? 'bump' : ''}`} style={{ position: 'relative' }}>
            {animating === p.id && <div className="mini-toast">Added</div>}
            <div className="product-media">{p.name.split(' ')[0]}</div>
            <h3>{p.name}</h3>
            <div className="meta">Classic Vibe Merch</div>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="price">${p.price.toFixed(2)}</div>
              </div>
              <div>
                <button className="btn ghost small" onClick={() => handleAdd(p.id)}>Add</button>
                <button className="btn primary" style={{ marginLeft: 8 }} onClick={() => handleAdd(p.id)}>Buy</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
