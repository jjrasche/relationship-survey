import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Stats({ session }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('surveys')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      if (data && data.length > 0) {
        calculateStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (surveys) => {
    const categories = ['communication', 'trust', 'intimacy', 'support', 'fun', 'growth', 'conflict', 'future']
    
    // Calculate averages for each category
    const categoryAverages = {}
    categories.forEach(cat => {
      const values = surveys.map(s => s.answers[cat]).filter(v => v !== undefined)
      categoryAverages[cat] = values.length > 0 
        ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)
        : 0
    })

    // Calculate trend (last 5 vs previous 5)
    const recent = surveys.slice(0, 5)
    const older = surveys.slice(5, 10)
    
    let trend = 'stable'
    if (recent.length > 0 && older.length > 0) {
      const recentAvg = recent.reduce((sum, s) => sum + s.score, 0) / recent.length
      const olderAvg = older.reduce((sum, s) => sum + s.score, 0) / older.length
      if (recentAvg > olderAvg + 2) trend = 'improving'
      else if (recentAvg < olderAvg - 2) trend = 'declining'
    }

    // Find best and worst categories
    const sortedCategories = Object.entries(categoryAverages)
      .sort(([,a], [,b]) => b - a)

    setStats({
      totalSurveys: surveys.length,
      averageScore: (surveys.reduce((sum, s) => sum + s.score, 0) / surveys.length).toFixed(1),
      highestScore: Math.max(...surveys.map(s => s.score)),
      lowestScore: Math.min(...surveys.map(s => s.score)),
      lastCheckIn: surveys[0].created_at,
      categoryAverages,
      bestCategories: sortedCategories.slice(0, 3),
      needsWork: sortedCategories.slice(-3).reverse(),
      trend,
      recentSurveys: surveys.slice(0, 10)
    })
  }

  if (loading) {
    return <div className="loading">Calculating stats...</div>
  }

  if (!stats) {
    return (
      <div className="empty-state">
        <h3>No stats yet</h3>
        <p>Complete a few check-ins to see your relationship statistics!</p>
      </div>
    )
  }

  const categoryLabels = {
    communication: '💬 Communication',
    trust: '🤝 Trust',
    intimacy: '❤️ Intimacy',
    support: '🤗 Support',
    fun: '🎉 Fun',
    growth: '🌱 Growth',
    conflict: '🕊️ Conflict',
    future: '🎯 Future'
  }

  const daysSinceLastCheckIn = Math.floor(
    (new Date() - new Date(stats.lastCheckIn)) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="stats-container">
      <h2>Relationship Statistics</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Overall Health</h3>
          <div className="stat-value">{stats.averageScore}/40</div>
          <div className="stat-label">{Math.round((stats.averageScore / 40) * 100)}% Average</div>
        </div>

        <div className="stat-card">
          <h3>Check-Ins</h3>
          <div className="stat-value">{stats.totalSurveys}</div>
          <div className="stat-label">
            Last: {daysSinceLastCheckIn === 0 ? 'Today' : `${daysSinceLastCheckIn} days ago`}
          </div>
        </div>

        <div className="stat-card">
          <h3>Score Range</h3>
          <div className="stat-value">{stats.lowestScore} - {stats.highestScore}</div>
          <div className="stat-label">Lowest - Highest</div>
        </div>

        <div className="stat-card">
          <h3>Trend</h3>
          <div className={`stat-value trend-${stats.trend}`}>
            {stats.trend === 'improving' && '📈 Improving'}
            {stats.trend === 'stable' && '➡️ Stable'}
            {stats.trend === 'declining' && '📉 Declining'}
          </div>
          <div className="stat-label">Last 5 vs Previous 5</div>
        </div>
      </div>

      <div className="category-stats">
        <div className="stat-section">
          <h3>💪 Strongest Areas</h3>
          {stats.bestCategories.map(([cat, avg]) => (
            <div key={cat} className="category-bar">
              <span className="category-name">{categoryLabels[cat]}</span>
              <div className="bar-container">
                <div 
                  className="bar-fill excellent" 
                  style={{ width: `${(avg / 5) * 100}%` }}
                />
              </div>
              <span className="category-score">{avg}</span>
            </div>
          ))}
        </div>

        <div className="stat-section">
          <h3>🎯 Areas to Focus On</h3>
          {stats.needsWork.map(([cat, avg]) => (
            <div key={cat} className="category-bar">
              <span className="category-name">{categoryLabels[cat]}</span>
              <div className="bar-container">
                <div 
                  className="bar-fill needs-work" 
                  style={{ width: `${(avg / 5) * 100}%` }}
                />
              </div>
              <span className="category-score">{avg}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-section">
        <h3>Recent Scores</h3>
        <div className="mini-chart">
          {stats.recentSurveys.slice(0, 10).reverse().map((survey, index) => {
            const height = (survey.score / 40) * 100
            return (
              <div key={survey.id} className="chart-bar">
                <div 
                  className="bar" 
                  style={{ height: `${height}%` }}
                  title={`${survey.score}/40`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}