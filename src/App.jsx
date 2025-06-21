import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Survey from './components/Survey'
import History from './components/History'
import Stats from './components/Stats'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('survey')

  useEffect(() => {
    // Get session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="app-container">
        <Auth />
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>💕 Relationship Check-In</h1>
        <div className="nav-buttons">
          <button className={`nav-btn ${view === 'survey' ? 'active' : ''}`} onClick={() => setView('survey')} >New Check-In</button>
          <button className={`nav-btn ${view === 'history' ? 'active' : ''}`} onClick={() => setView('history')} >History</button>
          <button className={`nav-btn ${view === 'stats' ? 'active' : ''}`} onClick={() => setView('stats')} >Stats</button>
          <button className={`nav-btn ${view === 'admin' ? 'active' : ''}`} onClick={() => setView('admin')} >Admin</button>
          <button className="nav-btn logout" onClick={() => supabase.auth.signOut()} >Logout</button>
        </div>
      </div>

      <div className="app-content">
        {view === 'survey' && <Survey session={session} onComplete={() => setView('history')} />}
        {view === 'history' && <History session={session} />}
        {view === 'stats' && <Stats session={session} />}
        {view === 'admin' && <AdminDashboard session={session} />}
      </div>
    </div>
  )
}

export default App