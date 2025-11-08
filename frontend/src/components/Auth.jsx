import React, { useState } from 'react'

export default function Auth({ onClose, onLogin }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
    const body = mode === 'login' ? { email, password } : { email, name, password }
    try {
      setLoading(true)
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Auth failed')
        return
      }
      if (mode === 'login') {
        localStorage.setItem('token', data.token)
        if (onLogin) onLogin(data.token, data.user)
        onClose()
      } else {
        alert('Registered successfully — please login')
        setMode('login')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close" onClick={onClose}>✕</button>
        <h3>{mode === 'login' ? 'Login' : 'Register'}</h3>
        <form onSubmit={submit} className="checkout-form">
          {mode === 'register' && (
            <label>Name
              <input value={name} onChange={e => setName(e.target.value)} required />
            </label>
          )}
          <label>Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>Password
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          <div className="form-actions">
            <button className="btn" type="button" onClick={onClose}>Cancel</button>
            <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Working...' : (mode === 'login' ? 'Login' : 'Register')}</button>
          </div>
        </form>
        <div style={{ marginTop: 8 }}>
          <button className="btn" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Create account' : 'Have an account? Login'}</button>
        </div>

        {loading && (
          <div className="loading-overlay">
            <div className="spinner" />
          </div>
        )}

      </div>
    </div>
  )
}
