import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../css/UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [todos, setTodos] = useState([]);
  const [journals, setJournals] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get auth token from localStorage
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  // API headers
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  });

  // API base URL (same as your existing API)
  const API_BASE = 'https://varli.alwaysdata.net/api';

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_BASE}/get_user_todos`, {
        headers: getHeaders()
      });
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Create todo
  const createTodo = async (todoData) => {
    try {
      const response = await fetch(`${API_BASE}/add_user_todo`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(todoData)
      });
      const data = await response.json();
      if (data.success) {
        await fetchTodos(); // Refresh list
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  // Update todo
  const updateTodo = async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE}/update_user_todo/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updates)
      });
      const data = await response.json();
      if (data.success) {
        await fetchTodos(); // Refresh list
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/delete_user_todo/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      const data = await response.json();
      if (data.success) {
        await fetchTodos(); // Refresh list
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Fetch journals
  const fetchJournals = async () => {
    try {
      const response = await fetch(`${API_BASE}/get_user_journals`, {
        headers: getHeaders()
      });
      const data = await response.json();
      setJournals(data);
    } catch (error) {
      console.error('Error fetching journals:', error);
    }
  };

  // Create journal
  const createJournal = async (journalData) => {
    try {
      const response = await fetch(`${API_BASE}/add_user_journal`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(journalData)
      });
      const data = await response.json();
      if (data.success) {
        await fetchJournals(); // Refresh list
      }
    } catch (error) {
      console.error('Error creating journal:', error);
    }
  };

  // Fetch goals
  const fetchGoals = async () => {
    try {
      const response = await fetch(`${API_BASE}/get_user_goals`, {
        headers: getHeaders()
      });
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  // Create goal
  const createGoal = async (goalData) => {
    try {
      const response = await fetch(`${API_BASE}/add_user_goal`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(goalData)
      });
      const data = await response.json();
      if (data.success) {
        await fetchGoals(); // Refresh list
      }
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  // Update goal progress
  const updateGoalProgress = async (id, progress) => {
    try {
      const response = await fetch(`${API_BASE}/update_user_goal/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ progress })
      });
      const data = await response.json();
      if (data.success) {
        await fetchGoals(); // Refresh list
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchTodos(),
        fetchJournals(),
        fetchGoals()
      ]);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  const stats = {
    todosCompleted: todos.filter(t => t.status === 'completed').length,
    totalTodos: todos.length,
    journalsWritten: journals.length,
    goalsInProgress: goals.filter(g => g.progress < 100).length,
    overallProgress: Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length) || 0
  };

  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="row g-4 mb-4">
        <div className="col-lg-3 col-md-6">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.todosCompleted}/{stats.totalTodos}</h3>
              <p className="stat-label">Tasks Completed</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="stat-card">
            <div className="stat-icon">📔</div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.journalsWritten}</h3>
              <p className="stat-label">Journal Entries</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.goalsInProgress}</h3>
              <p className="stat-label">Active Goals</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.overallProgress}%</h3>
              <p className="stat-label">Overall Progress</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="dashboard-card">
            <h3 className="card-title">Recent Tasks</h3>
            <div className="task-list">
              {todos.slice(0, 3).map(todo => (
                <div key={todo.id} className="task-item">
                  <div className="task-info">
                    <h4 className="task-title">{todo.title}</h4>
                    <span className={`priority priority-${todo.priority}`}>{todo.priority}</span>
                  </div>
                  <div className="task-meta">
                    <span className="due-date">Due: {todo.due_date || 'No date'}</span>
                    <span className={`status status-${todo.status}`}>{todo.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="dashboard-card">
            <h3 className="card-title">Quick Actions</h3>
            <div className="quick-actions">
              <button 
                className="btn btn-primary w-100 mb-2"
                onClick={() => createTodo({ title: 'New Task', description: 'Quick task from dashboard' })}
              >
                + Add Task
              </button>
              <button 
                className="btn btn-outline-primary w-100 mb-2"
                onClick={() => createJournal({ title: 'Quick Journal Entry', content: 'Today was productive...' })}
              >
                + Write Journal
              </button>
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => createGoal({ title: 'New Goal', description: 'Set a new goal for myself' })}
              >
                + Set Goal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTodos = () => (
    <div className="todos-section">
      <div className="section-header">
        <h3 className="section-title">My Tasks</h3>
        <button 
          className="btn btn-primary add-btn"
          onClick={() => createTodo({ title: 'New Task', description: 'Click to edit description' })}
        >
          + Add Task
        </button>
      </div>
      <div className="task-list">
        {todos.map(todo => (
          <div key={todo.id} className="task-item">
            <div className="task-info">
              <h4 className="task-title">{todo.title}</h4>
              <span className={`priority priority-${todo.priority}`}>{todo.priority}</span>
            </div>
            <div className="task-meta">
              <span className="due-date">Due: {todo.due_date || 'No date'}</span>
              <span className={`status status-${todo.status}`}>{todo.status}</span>
              <div className="task-actions">
                {todo.status !== 'completed' && (
                  <button 
                    className="btn btn-sm btn-success"
                    onClick={() => updateTodo(todo.id, { status: 'completed' })}
                  >
                    ✓
                  </button>
                )}
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderJournals = () => (
    <div className="journals-section">
      <div className="section-header">
        <h3 className="section-title">My Journal</h3>
        <button 
          className="btn btn-primary add-btn"
          onClick={() => createJournal({ title: 'New Entry', content: 'Write your thoughts...' })}
        >
          + New Entry
        </button>
      </div>
      <div className="journal-grid">
        {journals.map(journal => (
          <div key={journal.id} className="journal-card">
            <div className="journal-header">
              <h4 className="journal-title">{journal.title}</h4>
              <span className="journal-date">{journal.created_at}</span>
            </div>
            <p className="journal-content">{journal.content}</p>
            <div className="journal-footer">
              <span className={`mood mood-${journal.mood}`}>{journal.mood}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="goals-section">
      <div className="section-header">
        <h3 className="section-title">My Goals</h3>
        <button 
          className="btn btn-primary add-btn"
          onClick={() => createGoal({ title: 'New Goal', description: 'Set a new goal' })}
        >
          + New Goal
        </button>
      </div>
      <div className="goal-list">
        {goals.map(goal => (
          <div key={goal.id} className="goal-item">
            <div className="goal-info">
              <h4 className="goal-title">{goal.title}</h4>
              <p className="goal-target">Target: {goal.target_date || 'No date'}</p>
            </div>
            <div className="goal-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${goal.progress}%` }}></div>
              </div>
              <span className="progress-text">{goal.progress}%</span>
              <div className="goal-actions">
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => updateGoalProgress(goal.id, Math.min(goal.progress + 10, 100))}
                >
                  +10%
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="user-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="dashboard-title">Welcome back, {user?.name || 'User'}!</h1>
              <p className="dashboard-subtitle">Here's your productivity overview</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="dashboard-actions">
                <a href="/premium" className="btn btn-outline-primary">Upgrade Plan</a>
                <a href="/settings" className="btn btn-primary">Settings</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="container">
          <div className="dashboard-tabs">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'todos' ? 'active' : ''}`}
              onClick={() => setActiveTab('todos')}
            >
              Tasks
            </button>
            <button 
              className={`tab-btn ${activeTab === 'journals' ? 'active' : ''}`}
              onClick={() => setActiveTab('journals')}
            >
              Journal
            </button>
            <button 
              className={`tab-btn ${activeTab === 'goals' ? 'active' : ''}`}
              onClick={() => setActiveTab('goals')}
            >
              Goals
            </button>
          </div>

          <div className="dashboard-body">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'todos' && renderTodos()}
            {activeTab === 'journals' && renderJournals()}
            {activeTab === 'goals' && renderGoals()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
