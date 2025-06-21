import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminDashboard({ session }) {
  const [activeUsers, setActiveUsers] = useState([])
  const [recentSubmissions, setRecentSubmissions] = useState([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSurveys: 0,
    todaySurveys: 0,
    activeNow: 0,
    averageScore: 0
  })
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  // Wrap all functions that are used as dependencies with useCallback
  const checkAdminStatus = useCallback(async () => {
    // Check if user email is in admin list
    const adminEmails = ['jimjrasche@gmail.com'] // Add your admin emails here
    const isUserAdmin = adminEmails.includes(session.user.email)
    setIsAdmin(isUserAdmin)
    setLoading(false)
  }, [session.user.email])

  const fetchActiveUsers = useCallback(async () => {
    try {
      // Get users active in last 5 minutes
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
      
      const { data } = await supabase
        .from('user_activity')
        .select(`
          *,
          profiles (email),
          survey_progress (answers)
        `)
        .gte('last_seen', fiveMinutesAgo)
        .order('last_seen', { ascending: false })

      const formattedUsers = data?.map(user => ({
        ...user,
        email: user.profiles?.email,
        progress: user.survey_progress?.answers 
          ? Object.keys(user.survey_progress.answers).length 
          : 0
      })) || []

      setActiveUsers(formattedUsers)
      setStats(prev => ({ ...prev, activeNow: formattedUsers.length }))
    } catch (error) {
      console.error('Error fetching active users:', error)
    }
  }, [])

  const fetchRecentSubmissions = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('surveys')
        .select(`
          *,
          profiles:user_id (email)
        `)
        .order('created_at', { ascending: false })
        .limit(10)

      setRecentSubmissions(data || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
    }
  }, [])

  const fetchStats = useCallback(async () => {
    try {
      // Total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Total surveys
      const { count: totalSurveys } = await supabase
        .from('surveys')
        .select('*', { count: 'exact', head: true })

      // Today's surveys
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const { count: todaySurveys } = await supabase
        .from('surveys')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString())

      // Average score
      const { data: scores } = await supabase
        .from('surveys')
        .select('score')
      
      const avgScore = scores?.length 
        ? Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length)
        : 0

      setStats({
        totalUsers: totalUsers || 0,
        totalSurveys: totalSurveys || 0,
        todaySurveys: todaySurveys || 0,
        activeNow: activeUsers.length,
        averageScore: avgScore
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }, [activeUsers.length])

  const fetchInitialData = useCallback(async () => {
    await Promise.all([
      fetchStats(),
      fetchActiveUsers(),
      fetchRecentSubmissions()
    ])
  }, [fetchStats, fetchActiveUsers, fetchRecentSubmissions])

  const handleProgressUpdate = useCallback(() => {
    // Update active users list when someone's progress changes
    fetchActiveUsers()
  }, [fetchActiveUsers])

  const handleNewSubmission = useCallback(() => {
    // Add new submission to the top of the list
    fetchRecentSubmissions()
    fetchStats()
  }, [fetchRecentSubmissions, fetchStats])

  const handleActivityUpdate = useCallback(() => {
    // Update active users when activity changes
    fetchActiveUsers()
  }, [fetchActiveUsers])

  // Check if user is admin
  useEffect(() => {
    checkAdminStatus()
  }, [checkAdminStatus])

  // Set up real-time subscriptions
  useEffect(() => {
    if (!isAdmin) return

    fetchInitialData()
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('admin-monitoring')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'survey_progress' 
        },
        handleProgressUpdate
      )
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'surveys' 
        },
        handleNewSubmission
      )
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'user_activity' 
        },
        handleActivityUpdate
      )
      .subscribe()

    // Refresh active users every 30 seconds
    const interval = setInterval(fetchActiveUsers, 30000)

    return () => {
      supabase.removeChannel(channel)
      clearInterval(interval)
    }
  }, [isAdmin, fetchInitialData, handleProgressUpdate, handleNewSubmission, handleActivityUpdate, fetchActiveUsers])

  if (loading) {
    return <div className="loading">Checking admin access...</div>
  }

  if (!isAdmin) {
    return (
      <div className="admin-error">
        <h2>Access Denied</h2>
        <p>You don't have permission to view this page.</p>
      </div>
    )
  }

  function getScoreClass(score) {
    if (score >= 80) return 'excellent'
    if (score >= 60) return 'good'
    if (score >= 40) return 'warning'
    return 'danger'
  }

  function viewSubmissionDetails(submission) {
    // You can expand this to show more details
    console.log('Viewing submission:', submission)
    alert(`Score: ${submission.score}%\nNotes: ${submission.notes || 'None'}`)
  }

  return (
    <div className="admin-dashboard">
      <h1>📊 Admin Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalSurveys}</div>
            <div className="stat-label">Total Surveys</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.todaySurveys}</div>
            <div className="stat-label">Today's Surveys</div>
          </div>
        </div>

        <div className="admin-stat-card active">
          <div className="stat-icon">🟢</div>
          <div className="stat-content">
            <div className="stat-number">{stats.activeNow}</div>
            <div className="stat-label">Active Now</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">💯</div>
          <div className="stat-content">
            <div className="stat-number">{stats.averageScore}%</div>
            <div className="stat-label">Avg Score</div>
          </div>
        </div>
      </div>

      {/* Active Users */}
      <div className="admin-section">
        <h2>🟢 Active Users (Last 5 Minutes)</h2>
        <div className="active-users-list">
          {activeUsers.length === 0 ? (
            <p className="empty-message">No active users right now</p>
          ) : (
            activeUsers.map(user => (
              <div key={user.user_id} className="active-user-card">
                <div className="user-info">
                  <span className="user-email">{user.email || 'Anonymous'}</span>
                  <span className="user-activity">{user.current_page || 'Unknown'}</span>
                </div>
                <div className="user-progress">
                  <div className="progress-text">
                    Progress: {user.progress}/36 questions
                  </div>
                  <div className="mini-progress-bar">
                    <div 
                      className="mini-progress-fill" 
                      style={{ width: `${(user.progress / 36) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="last-seen">
                  Last seen: {new Date(user.last_seen).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="admin-section">
        <h2>📋 Recent Submissions</h2>
        <div className="submissions-list">
          {recentSubmissions.length === 0 ? (
            <p className="empty-message">No submissions yet</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>User</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map(submission => (
                  <tr key={submission.id}>
                    <td>{new Date(submission.created_at).toLocaleString()}</td>
                    <td>{submission.profiles?.email || 'Unknown'}</td>
                    <td>
                      <span className={`score-badge ${getScoreClass(submission.score)}`}>
                        {submission.score}%
                      </span>
                    </td>
                    <td>
                      <span className="status-badge">
                        {submission.assessment_data?.recommendation?.type || 'Completed'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="view-btn"
                        onClick={() => viewSubmissionDetails(submission)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}