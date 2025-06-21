import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { 
  diagnosticQuestions, 
  categories, 
  getQuestionsByCategory,
  calculateScore 
} from '../data/diagnosticQuestions'

export default function Survey({ session, onComplete }) {
  const [currentCategory, setCurrentCategory] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [savedProgress, setSavedProgress] = useState(null)

  // Wrap loadProgress with useCallback
  const loadProgress = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('survey_progress')
        .select('*')
        .eq('user_id', session.user.id)
        .single()

      if (data) {
        setSavedProgress(data)
        if (data.answers) {
          setAnswers(data.answers)
          // Find where they left off
          const answeredCount = Object.keys(data.answers).length
          if (answeredCount < diagnosticQuestions.length) {
            setShowIntro(false)
            // Resume from next unanswered question
            const nextUnanswered = diagnosticQuestions.find(q => !data.answers[q.id])
            if (nextUnanswered) {
              const catIndex = categories.findIndex(c => c.id === nextUnanswered.category)
              setCurrentCategory(catIndex)
              const questions = getQuestionsByCategory(nextUnanswered.category)
              const qIndex = questions.findIndex(q => q.id === nextUnanswered.id)
              setCurrentQuestion(qIndex)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    }
  }, [session.user.id])

  // Load saved progress on mount
  useEffect(() => {
    loadProgress()
  }, [loadProgress])

  const saveProgress = async () => {
    try {
      await supabase.from('survey_progress').upsert({
        user_id: session.user.id,
        answers,
        updated_at: new Date().toISOString()
      })
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }

  const getCurrentCategoryQuestions = () => {
    return getQuestionsByCategory(categories[currentCategory].id)
  }

  const getCurrentQuestion = () => {
    const questions = getCurrentCategoryQuestions()
    return questions[currentQuestion] || null
  }

  const handleAnswer = async (value) => {
    const question = getCurrentQuestion()
    if (!question) return

    const newAnswers = { ...answers, [question.id]: value }
    setAnswers(newAnswers)

    // Save progress every 3 questions
    if (Object.keys(newAnswers).length % 3 === 0) {
      await saveProgress()
    }

    // Move to next question
    const categoryQuestions = getCurrentCategoryQuestions()
    if (currentQuestion < categoryQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentCategory < categories.length - 1) {
      setCurrentCategory(currentCategory + 1)
      setCurrentQuestion(0)
    } else {
      // All questions answered
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1)
      const prevCategoryQuestions = getQuestionsByCategory(categories[currentCategory - 1].id)
      setCurrentQuestion(prevCategoryQuestions.length - 1)
    }
  }

  const handleSkip = () => {
    handleAnswer(null) // null indicates skipped
  }

  const handleComplete = async () => {
    setLoading(true)

    try {
      const scoreData = calculateScore(answers)
      
      // Save to surveys table
      const { error } = await supabase.from('surveys').insert({
        user_id: session.user.id,
        answers,
        score: scoreData.percentage,
        notes: notes.trim(),
        assessment_data: scoreData
      })

      if (error) throw error

      // Clear progress
      await supabase
        .from('survey_progress')
        .delete()
        .eq('user_id', session.user.id)

      alert(`Assessment complete! Your relationship health score: ${scoreData.percentage}%`)
      onComplete()
    } catch (error) {
      alert('Error saving assessment: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const totalQuestions = diagnosticQuestions.length
  const answeredQuestions = Object.keys(answers).length
  const progress = (answeredQuestions / totalQuestions) * 100

  if (showIntro) {
    return (
      <div className="intro-container">
        <h2>Relationship Health Assessment</h2>
        <div className="intro-content">
          <p>This comprehensive assessment will help you understand the health of your relationship through 36 diagnostic questions.</p>
          
          <div className="intro-features">
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <h3>Comprehensive</h3>
              <p>Based on relationship research and clinical experience</p>
            </div>
            <div className="feature">
              <span className="feature-icon">⏱️</span>
              <h3>15-20 Minutes</h3>
              <p>Take your time and answer honestly</p>
            </div>
            <div className="feature">
              <span className="feature-icon">💾</span>
              <h3>Save Progress</h3>
              <p>Your answers are saved as you go</p>
            </div>
          </div>

          {savedProgress && (
            <div className="resume-notice">
              <p>You have a saved assessment in progress ({answeredQuestions}/{totalQuestions} questions answered)</p>
            </div>
          )}

          <div className="intro-actions">
            <button 
              className="btn btn-primary btn-large"
              onClick={() => setShowIntro(false)}
            >
              {savedProgress ? 'Continue Assessment' : 'Start Assessment'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const results = calculateScore(answers)
    
    return (
      <div className="results-container">
        <h2>Assessment Results</h2>
        
        <div className={`score-card ${results.recommendation.type}`}>
          <div className="score-number">{results.percentage}%</div>
          <h3>{results.recommendation.title}</h3>
          <p>{results.recommendation.message}</p>
        </div>

        {results.redFlags.length > 0 && (
          <div className="flags-section red-flags">
            <h3>🚩 Areas of Concern</h3>
            {results.redFlags.map(flag => (
              <div key={flag.id} className="flag-item">
                <p className="flag-question">{flag.question}</p>
                <p className="flag-take">{flag.quickTake}</p>
              </div>
            ))}
          </div>
        )}

        {results.greenFlags.length > 0 && (
          <div className="flags-section green-flags">
            <h3>💚 Relationship Strengths</h3>
            {results.greenFlags.map(flag => (
              <div key={flag.id} className="flag-item">
                <p className="flag-question">{flag.question}</p>
                <p className="flag-take">{flag.quickTake}</p>
              </div>
            ))}
          </div>
        )}

        <div className="notes-section">
          <label>
            <h3>📝 Additional Thoughts</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any reflections on your assessment?"
              rows="4"
            />
          </label>
        </div>

        <button 
          onClick={handleComplete}
          className="btn btn-primary btn-large"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Assessment'}
        </button>
      </div>
    )
  }

  const question = getCurrentQuestion()
  const category = categories[currentCategory]

  return (
    <div className="workflow-container">
      {/* Progress Bar */}
      <div className="workflow-progress">
        <div className="progress-stats">
          <span>Question {answeredQuestions + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Category Header */}
      <div className="category-header">
        <span className="category-icon">{category.icon}</span>
        <h3>{category.name}</h3>
      </div>

      {/* Question Card */}
      {question && (
        <div className="question-card">
          <h2 className="question-text">{question.question}</h2>
          
          <div className="answer-buttons">
            <button
              className="answer-btn yes"
              onClick={() => handleAnswer(true)}
            >
              <span className="answer-icon">✓</span>
              <span className="answer-text">Yes</span>
            </button>
            
            <button
              className="answer-btn no"
              onClick={() => handleAnswer(false)}
            >
              <span className="answer-icon">✗</span>
              <span className="answer-text">No</span>
            </button>
          </div>

          <button 
            className="skip-btn"
            onClick={handleSkip}
          >
            Skip this question
          </button>

          {/* Question Context */}
          <details className="question-details">
            <summary>Learn more about this question</summary>
            <div className="details-content">
              <p><strong>Why this matters:</strong> {question.guideline}</p>
              <p><strong>Quick take:</strong> {question.quickTake}</p>
            </div>
          </details>
        </div>
      )}

      {/* Navigation */}
      <div className="workflow-nav">
        <button 
          className="nav-btn"
          onClick={handleBack}
          disabled={currentCategory === 0 && currentQuestion === 0}
        >
          ← Previous
        </button>
        
        <button 
          className="nav-btn"
          onClick={() => setShowResults(true)}
        >
          Finish Early
        </button>
      </div>
    </div>
  )
}