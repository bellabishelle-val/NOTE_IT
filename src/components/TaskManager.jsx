import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../css/TaskManager.css';

const TaskManager = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(`tasks_${user?.id || 'guest'}`);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [user?.id]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(`tasks_${user?.id || 'guest'}`, JSON.stringify(tasks));
    }
  }, [tasks, user?.id]);

  const addTask = (e) => {
    e.preventDefault();
    
    if (!newTask.trim()) {
      setError('Task cannot be empty');
      return;
    }

    const task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    };

    setTasks([...tasks, task]);
    setNewTask('');
    setError('');
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  return (
    <div className="task-manager">
      <div className="task-header">
        <h2 className="task-title">📋 Task Manager</h2>
        <p className="task-subtitle">Organize and track your daily activities</p>
      </div>

      <div className="task-input-section">
        <form onSubmit={addTask} className="task-form">
          <div className="input-group">
            <input
              type="text"
              className="task-input"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              style={{
                fontFamily: 'Bookman Old Style', serif: 'if',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            />
            <button
              type="submit"
              className="add-task-btn"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Task'}
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>

      <div className="task-stats">
        <div className="stat-card">
          <h3 className="stat-title">📊 Statistics</h3>
          <div className="stat-info">
            <div className="stat-item">
              <span className="stat-number">{tasks.length}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{tasks.filter(t => t.completed).length}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{tasks.filter(t => !t.completed).length}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <div className="action-buttons">
          <button 
            onClick={clearCompleted} 
            className="action-btn clear-btn"
            disabled={tasks.filter(t => t.completed).length === 0}
          >
            🗑️ Clear Completed
          </button>
        </div>
      </div>

      <div className="task-list">
        <h3 className="list-title">📝 Your Tasks</h3>
        <div className="tasks-container">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📋</span>
              <p className="empty-text">No tasks yet. Add your first task above!</p>
            </div>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="task-checkbox"
                  />
                  <span className={`task-text ${task.completed ? 'completed-text' : ''}`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-task-btn"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
