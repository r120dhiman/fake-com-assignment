import React from 'react'

export default function Navbar({ user, onLoginClick, onLogout, onNavigate }) {
  return (
    <header className="site-header nav">
      <div className="brand">
        <div className="logo">V</div>
        <h1>Vibe Commerce</h1>
      </div>
      <div className="nav-right">
        <button className="btn" onClick={() => onNavigate('products')}>Products</button>
        {user ? (
          <>
            <button className="btn" onClick={() => onNavigate('profile')}>Profile</button>
            <span className="nav-greet">Hi, {user.name || user.email}</span>
            <button className="btn ghost" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button className="btn primary" onClick={onLoginClick}>Login / Signup</button>
        )}
      </div>
    </header>
  )
}
