import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login') // 'login' or 'signup'
  const [message, setMessage] = useState(null)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage({ type: 'success', text: 'Check your email for confirmation!' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="subtitle">Track your relationship health over time</p>

        <form onSubmit={handleAuth} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength="6"
            />
          </div>

          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading...' : mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login')
              setMessage(null)
            }}
            className="link-btn"
          >
            {mode === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  )
}