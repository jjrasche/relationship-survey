import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function History({ session }) {
  const [surveys, setSurveys] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    fetchSurveys()
  }, [])

  const fetchSurveys = async () => {
    try {
      const { data, error } = await supabase
        .from('surveys')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setSurveys(data || [])
    } catch (error) {
      console.error('Error fetching surveys:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteSurvey = async (id) => {
    if (!confirm('Delete this check-in?')) return

    try {
      const { error } = await supabase
        .from('surveys')
        .delete()
        .eq('id', id)

      if (error) throw error
      setSurveys(surveys.filter(s => s.id !== id))
    } catch (error) {
      alert('Error deleting survey: ' + error.message)
    }
  }

  const getScoreColor = (score) => {
    const percent = (score / 40) * 100
    if (percent >= 80) return 'excellent'
    if (percent >= 60) return 'good'
    if (percent >= 40) return 'average'
    return 'needs-work'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      })
    }
  }

  if (loading) {
    return <div className="loading">Loading history...</div>
  }

  if (surveys.length === 0) {
    return (
      <div className="empty-state">
        <h3>No check-ins yet</h3>
        <p>Complete your first relationship check-in to see your history!</p>
      </div>
    )
  }

  const questionLabels = {
    communication: '💬 Communication',
    trust: '🤝 Trust',
    intimacy: '❤️ Intimacy',
    support: '🤗 Support',
    fun: '🎉 Fun',
    growth: '🌱 Growth',
    conflict: '🕊️ Conflict',
    future: '🎯 Future'
  }

  return (
    <div className="history-container">
      <h2>Your Check-In History</h2>
      
      <div className="history-list">
        {surveys.map(survey => {
          const scorePercent = Math.round((survey.score / 40) * 100)
          const isExpanded = expandedId === survey.id

          return (
            <div key={survey.id} className="history-item">
              <div 
                className="history-header"
                onClick={() => setExpandedId(isExpanded ? null : survey.id)}
              >
                <div className="history-date">
                  {formatDate(survey.created_at)}
                  <span className="history-time">
                    {new Date(survey.created_at).toLocaleTimeString('en-US', { 
                      hour: 'numeric', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                
                <div className={`history-score ${getScoreColor(survey.score)}`}>
                  <span className="score-number">{survey.score}/40</span>
                  <span className="score-percent">{scorePercent}%</span>
                </div>
              </div>

              {isExpanded && (
                <div className="history-details">
                  <div className="answer-grid">
                    {Object.entries(survey.answers).map(([key, value]) => (
                      <div key={key} className="answer-item">
                        <span className="answer-label">{questionLabels[key]}</span>
                        <span className={`answer-value score-${value}`}>
                          {'★'.repeat(value)}{'☆'.repeat(5 - value)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {survey.notes && (
                    <div className="history-notes">
                      <strong>Notes:</strong> {survey.notes}
                    </div>
                  )}

                  <button 
                    onClick={() => deleteSurvey(survey.id)}
                    className="btn btn-small btn-danger"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}