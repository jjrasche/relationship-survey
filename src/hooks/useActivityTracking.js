import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useActivityTracking(userId, currentPage) {
  useEffect(() => {
    if (!userId) return

    const updateActivity = async () => {
      try {
        await supabase.from('user_activity').upsert({
          user_id: userId,
          current_page: currentPage,
          last_seen: new Date().toISOString()
        })
      } catch (error) {
        console.error('Error updating activity:', error)
      }
    }

    // Update immediately
    updateActivity()

    // Update every minute while active
    const interval = setInterval(updateActivity, 60000)

    // Update on page visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateActivity()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [userId, currentPage])
}