import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TaskManager from './TaskManager';
import '../css/UserDashboard.css';

// Custom localStorage hook
const useLocalStorage = (key, initialValue = []) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      setValue(prev => {
        const updatedValue = Array.isArray(newValue) ? newValue : [...prev, newValue];
        localStorage.setItem(key, JSON.stringify(updatedValue));
        return updatedValue;
      });
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [value, setStoredValue];
};

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the new feature',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-12-15',
      category: 'work',
      createdAt: '2024-12-01T10:00:00Z'
    },
    {
      id: 2,
      title: 'Review pull requests',
      description: 'Review and merge pending pull requests',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-12-10',
      category: 'development',
      createdAt: '2024-12-01T09:00:00Z'
    },
    {
      id: 3,
      title: 'Team meeting preparation',
      description: 'Prepare slides for weekly team sync',
      status: 'completed',
      priority: 'low',
      dueDate: '2024-12-08',
      category: 'meetings',
      createdAt: '2024-12-01T08:00:00Z'
    },
    {
      id: 4,
      title: 'Update dependencies',
      description: 'Update all npm packages to latest versions',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2024-12-12',
      category: 'maintenance',
      createdAt: '2024-12-01T07:00:00Z'
    },
    {
      id: 5,
      title: 'Client presentation',
      description: 'Present quarterly results to stakeholders',
      status: 'pending',
      priority: 'high',
      dueDate: '2024-12-20',
      category: 'business',
      createdAt: '2024-12-01T06:00:00Z'
    },
    {
      id: 6,
      title: 'Code review for feature branch',
      description: 'Review new authentication implementation',
      status: 'pending',
      priority: 'high',
      dueDate: '2024-12-11',
      category: 'development',
      createdAt: '2024-12-01T05:00:00Z'
    },
    {
      id: 7,
      title: 'Database optimization',
      description: 'Optimize slow queries and add indexes',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2024-12-18',
      category: 'technical',
      createdAt: '2024-12-01T04:00:00Z'
    },
    {
      id: 8,
      title: 'User testing session',
      description: 'Conduct usability testing with beta users',
      status: 'completed',
      priority: 'low',
      dueDate: '2024-12-05',
      category: 'testing',
      createdAt: '2024-12-01T03:00:00Z'
    }
  ]);
  const [journals, setJournals] = useState([
    {
      id: 1,
      title: 'Project Milestone Achieved',
      content: 'Today we successfully completed the first phase of our new authentication system. The team worked really well together and we managed to implement all the core features ahead of schedule. Feeling proud of what we accomplished!',
      mood: 'excited',
      date: '2024-12-01',
      createdAt: '2024-12-01T18:00:00Z'
    },
    {
      id: 2,
      title: 'Learning New Technologies',
      content: 'Spent the day learning about microservices architecture. It\'s fascinating how distributed systems work. Still have a lot to learn but I\'m making good progress. The more I understand, the more I realize how much there is to know.',
      mood: 'motivated',
      date: '2024-11-30',
      createdAt: '2024-11-30T20:00:00Z'
    },
    {
      id: 3,
      title: 'Team Building Success',
      content: 'Had a great team building session today. We did some problem-solving activities and it really helped improve our communication. The team feels more connected and I think we\'ll work better together going forward.',
      mood: 'happy',
      date: '2024-11-29',
      createdAt: '2024-11-29T17:00:00Z'
    },
    {
      id: 4,
      title: 'Challenges and Growth',
      content: 'Faced some technical challenges today with the database optimization. It was frustrating at first, but I learned a lot about query optimization and indexing. Sometimes the hardest problems teach us the most valuable lessons.',
      mood: 'reflective',
      date: '2024-11-28',
      createdAt: '2024-11-28T19:00:00Z'
    },
    {
      id: 5,
      title: 'Client Meeting Success',
      content: 'Had a productive meeting with our biggest client today. They were very happy with our progress and gave us some great feedback for the next phase. This could lead to more opportunities for our team.',
      mood: 'accomplished',
      date: '2024-11-27',
      createdAt: '2024-11-27T16:00:00Z'
    }
  ]);
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Launch new product feature',
      description: 'Successfully launch the new authentication system',
      targetDate: '2024-12-31',
      progress: 75,
      status: 'in-progress',
      category: 'product',
      createdAt: '2024-11-01T00:00:00Z'
    },
    {
      id: 2,
      title: 'Complete certification',
      description: 'Obtain AWS Solutions Architect certification',
      targetDate: '2025-01-15',
      progress: 45,
      status: 'in-progress',
      category: 'career',
      createdAt: '2024-10-15T00:00:00Z'
    },
    {
      id: 3,
      title: 'Improve team productivity',
      description: 'Implement agile methodologies across all teams',
      targetDate: '2024-12-20',
      progress: 60,
      status: 'in-progress',
      category: 'management',
      createdAt: '2024-11-01T00:00:00Z'
    },
    {
      id: 4,
      title: 'Reduce technical debt',
      description: 'Refactor legacy code and improve code quality',
      targetDate: '2025-02-28',
      progress: 30,
      status: 'in-progress',
      category: 'technical',
      createdAt: '2024-11-01T00:00:00Z'
    },
    {
      id: 5,
      title: 'Expand user base',
      description: 'Reach 10,000 active users by Q1 2025',
      targetDate: '2025-03-31',
      progress: 55,
      status: 'in-progress',
      category: 'business',
      createdAt: '2024-11-01T00:00:00Z'
    },
    {
      id: 6,
      title: 'Master new programming language',
      description: 'Become proficient in Rust programming',
      targetDate: '2025-01-31',
      progress: 25,
      status: 'in-progress',
      category: 'personal',
      createdAt: '2024-11-01T00:00:00Z'
    }
  ]);
  const [motivationCard, setMotivationCard] = useState(null);
  const [motivationCards, setMotivationCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Database connection functions
  const getToken = () => localStorage.getItem('authToken');
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  });
  const API_BASE = 'https://varli.alwaysdata.net/api';

  // Fetch journals from database
  const fetchJournals = async () => {
    try {
      const response = await fetch(`${API_BASE}/get_user_journals`, {
        headers: getHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setJournals(data.journals || []);
      }
    } catch (error) {
      console.error('Error fetching journals:', error);
    }
  };

  // Save journal to database
  const saveJournalToDatabase = async (journal) => {
    try {
      // Save to localStorage as backup first (primary storage)
      const savedJournals = JSON.parse(localStorage.getItem(`journals_${user?.id || 'guest'}`) || '[]');
      savedJournals.unshift(journal);
      localStorage.setItem(`journals_${user?.id || 'guest'}`, JSON.stringify(savedJournals));
      
      // Then try to save to database (secondary storage)
      const response = await fetch(`${API_BASE}/add_user_journal`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          user_id: user?.id,
          title: journal.title,
          content: journal.content,
          mood: journal.mood
        })
      });
      const data = await response.json();
      if (data.success) {
        console.log('Database save successful, localStorage already has the data');
      } else {
        console.warn('Database save failed, but localStorage has been updated');
      }
    } catch (error) {
      console.error('Error saving journal:', error);
      // Ensure localStorage is updated even if database fails
      const fallbackJournals = JSON.parse(localStorage.getItem(`journals_${user?.id || 'guest'}`) || '[]');
      if (!fallbackJournals.find(j => j.id === journal.id)) {
        fallbackJournals.unshift(journal);
        localStorage.setItem(`journals_${user?.id || 'guest'}`, JSON.stringify(fallbackJournals));
      }
    }
  };

  // Load journals on component mount
  useEffect(() => {
    if (user?.id) {
      // Prioritize localStorage first
      const savedJournals = localStorage.getItem(`journals_${user?.id || 'guest'}`);
      if (savedJournals) {
        setJournals(JSON.parse(savedJournals));
        console.log('Loaded journals from localStorage');
      } else {
        // Only fetch from database if localStorage is empty
        fetchJournals();
      }
    }
  }, [user?.id]);

  // Fetch tasks from database
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE}/get_user_tasks`, {
        headers: getHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setTodos(data.tasks || []);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Save task to database
  const saveTaskToDatabase = async (task) => {
    try {
      const response = await fetch(`${API_BASE}/add_user_task`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          user_id: user?.id,
          title: task.title,
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate
        })
      });
      const data = await response.json();
      if (data.success) {
        await fetchTasks(); // Refresh tasks
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  // Fetch goals from database
  const fetchGoals = async () => {
    try {
      const response = await fetch(`${API_BASE}/get_user_goals`, {
        headers: getHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setGoals(data.goals || []);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  // Save goal to database
  const saveGoalToDatabase = async (goal) => {
    try {
      // Save to localStorage as backup first (primary storage)
      const savedGoals = JSON.parse(localStorage.getItem(`goals_${user?.id || 'guest'}`) || '[]');
      savedGoals.unshift(goal);
      localStorage.setItem(`goals_${user?.id || 'guest'}`, JSON.stringify(savedGoals));
      
      // Then try to save to database (secondary storage)
      const response = await fetch(`${API_BASE}/add_user_goal`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          user_id: user?.id,
          title: goal.title,
          targetDate: goal.targetDate,
          progress: goal.progress
        })
      });
      const data = await response.json();
      if (data.success) {
        console.log('Database save successful, localStorage already has the data');
      } else {
        console.warn('Database save failed, but localStorage has been updated');
      }
    } catch (error) {
      console.error('Error saving goal:', error);
      // Ensure localStorage is updated even if database fails
      const fallbackGoals = JSON.parse(localStorage.getItem(`goals_${user?.id || 'guest'}`) || '[]');
      if (!fallbackGoals.find(g => g.id === goal.id)) {
        fallbackGoals.unshift(goal);
        localStorage.setItem(`goals_${user?.id || 'guest'}`, JSON.stringify(fallbackGoals));
      }
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    if (user?.id) {
      fetchTasks();
      // Prioritize localStorage first
      const savedGoals = localStorage.getItem(`goals_${user?.id || 'guest'}`);
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals));
        console.log('Loaded goals from localStorage');
      } else {
        // Only fetch from database if localStorage is empty
        fetchGoals();
      }
    }
  }, [user?.id]);

  // Initialize motivation cards on component mount
  useEffect(() => {

    // 30 hardcoded motivation cards with beautiful gradients and inspiring quotes
    setMotivationCards([
      { id: 1, title: 'Daily Inspiration', content: 'The only way to do great work is to love what you do. - Steve Jobs', category: 'motivation', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', font: 'Georgia, serif', icon: '✨', author: 'Steve Jobs' },
      { id: 2, title: 'Stay Positive', content: 'Every day is a new beginning. Take a deep breath and start again.', category: 'motivation', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', font: 'Georgia, serif', icon: '🌟', author: 'Unknown' },
      { id: 3, title: 'Dream Big', content: 'The future belongs to those who believe in the beauty of their dreams.', category: 'motivation', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', font: 'Georgia, serif', icon: '🚀', author: 'Eleanor Roosevelt' },
      { id: 4, title: 'Keep Going', content: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', category: 'motivation', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', font: 'Georgia, serif', icon: '💪', author: 'Winston Churchill' },
      { id: 5, title: 'Be Yourself', content: 'Authenticity is the daily practice of letting go of who we think we are supposed to be.', category: 'motivation', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', font: 'Georgia, serif', icon: '🌈', author: 'Brené Brown' },
      { id: 6, title: 'Embrace Change', content: 'Change is the only constant in life. Embrace it and grow through every challenge.', category: 'motivation', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', font: 'Georgia, serif', icon: '🦋', author: 'Heraclitus' },
      { id: 7, title: 'Trust the Journey', content: 'Every step forward is progress, even when you can\'t see the destination. Trust the process.', category: 'motivation', color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', font: 'Georgia, serif', icon: '🛤️', author: 'Unknown' },
      { id: 8, title: 'Find Joy', content: 'Joy is found not in the destination, but in the journey itself. Enjoy every moment.', category: 'motivation', color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', font: 'Georgia, serif', icon: '🌸', author: 'Unknown' },
      { id: 9, title: 'Believe in Yourself', content: 'You are braver than you believe, stronger than you seem, and smarter than you think.', category: 'motivation', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', font: 'Georgia, serif', icon: '💖', author: 'A.A. Milne' },
      { id: 10, title: 'Never Give Up', content: 'The difference between a successful person and others is not lack of strength or knowledge, but rather a lack of will.', category: 'motivation', color: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', font: 'Georgia, serif', icon: '🌟', author: 'Vince Lombardi' },
      { id: 11, title: 'Stay Focused', content: 'Focus on being productive instead of busy.', category: 'motivation', color: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)', font: 'Georgia, serif', icon: '🎯', author: 'Tim Ferriss' },
      { id: 12, title: 'Take Action', content: 'The way to get started is to quit talking and begin doing.', category: 'motivation', color: 'linear-gradient(135deg, #48dbfb 0%, #0abde3 100%)', font: 'Georgia, serif', icon: '⚡', author: 'Walt Disney' },
      { id: 13, title: 'Be Grateful', content: 'Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow.', category: 'motivation', color: 'linear-gradient(135deg, #f97f51 0%, #feca57 100%)', font: 'Georgia, serif', icon: '🙏', author: 'Melody Beattie' },
      { id: 14, title: 'Stay Strong', content: 'You never know how strong you are until being strong is your only choice.', category: 'motivation', color: 'linear-gradient(135deg, #ee5a24 0%, #f79f1f 100%)', font: 'Georgia, serif', icon: '💎', author: 'Bob Marley' },
      { id: 15, title: 'Keep Learning', content: 'The beautiful thing about learning is nobody can take it away from you.', category: 'motivation', color: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)', font: 'Georgia, serif', icon: '📚', author: 'B.B. King' },
      { id: 16, title: 'Be Patient', content: 'Patience is not the ability to wait, but the ability to keep a good attitude while waiting.', category: 'motivation', color: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)', font: 'Georgia, serif', icon: '⏳', author: 'Joyce Meyer' },
      { id: 17, title: 'Stay Humble', content: 'Stay humble, work hard, be kind.', category: 'motivation', color: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)', font: 'Georgia, serif', icon: '🌱', author: 'Unknown' },
      { id: 18, title: 'Think Big', content: 'If you can dream it, you can do it.', category: 'motivation', color: 'linear-gradient(135deg, #e17055 0%, #fab1a0 100%)', font: 'Georgia, serif', icon: '🌍', author: 'Walt Disney' },
      { id: 19, title: 'Be Brave', content: 'Bravery is being the only one who knows you\'re afraid.', category: 'motivation', color: 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)', font: 'Georgia, serif', icon: '🦁', author: 'Franklin P. Jones' },
      { id: 20, title: 'Stay Curious', content: 'The important thing is not to stop questioning.', category: 'motivation', color: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)', font: 'Georgia, serif', icon: '🔍', author: 'Albert Einstein' },
      { id: 21, title: 'Be Kind', content: 'In a world where you can be anything, be kind.', category: 'motivation', color: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)', font: 'Georgia, serif', icon: '💝', author: 'Unknown' },
      { id: 22, title: 'Keep Moving', content: 'Life is like riding a bicycle. To keep your balance, you must keep moving.', category: 'motivation', color: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)', font: 'Georgia, serif', icon: '🚴', author: 'Albert Einstein' },
      { id: 23, title: 'Be Present', content: 'The present moment is filled with joy and happiness. If you are attentive, you will see it.', category: 'motivation', color: 'linear-gradient(135deg, #e17055 0%, #fab1a0 100%)', font: 'Georgia, serif', icon: '🧘', author: 'Deepak Chopra' },
      { id: 24, title: 'Stay Positive', content: 'Positive thinking will let you do everything better than negative thinking will.', category: 'motivation', color: 'linear-gradient(135deg, #f39c12 0%, #f1c40f 100%)', font: 'Georgia, serif', icon: '☀️', author: 'Zig Ziglar' },
      { id: 25, title: 'Be Creative', content: 'Creativity is intelligence having fun.', category: 'motivation', color: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', font: 'Georgia, serif', icon: '🎨', author: 'Albert Einstein' },
      { id: 26, title: 'Keep Growing', content: 'What we think, we become.', category: 'motivation', color: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)', font: 'Georgia, serif', icon: '🌳', author: 'Buddha' },
      { id: 27, title: 'Be Resilient', content: 'The human capacity for burden is like bamboo – far more flexible than you\'d ever believe.', category: 'motivation', color: 'linear-gradient(135deg, #16a085 0%, #1abc9c 100%)', font: 'Georgia, serif', icon: '🎋', author: 'Jodi Picoult' },
      { id: 28, title: 'Stay True', content: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.', category: 'motivation', color: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)', font: 'Georgia, serif', icon: '🎭', author: 'Ralph Waldo Emerson' },
      { id: 29, title: 'Be Mindful', content: 'The mind is everything. What you think you become.', category: 'motivation', color: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)', font: 'Georgia, serif', icon: '🧠', author: 'Buddha' },
      { id: 30, title: 'Keep Believing', content: 'Believe you can and you\'re halfway there.', category: 'motivation', color: 'linear-gradient(135deg, #2980b9 0%, #3498db 100%)', font: 'Georgia, serif', icon: '🌟', author: 'Theodore Roosevelt' }
    ]);
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
            <h3 className="card-title">Tasks</h3>
            <div className="task-list">
              {todos.slice(0, 3).map(todo => (
                <div key={todo.id} className="task-item">
                  <div className="task-info">
                    <h4 className="task-title">{todo.title}</h4>
                    <span className={`priority priority-${todo.priority}`}>{todo.priority}</span>
                  </div>
                  <div className="task-meta">
                    <span className="due-date">Due: {todo.dueDate}</span>
                    <span className={`status status-${todo.status}`}>{todo.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="dashboard-card">
            <h3 className="card-title">Daily Motivation</h3>
            <div className="motivation-card">
              <div className="motivation-content">
                <h4 className="motivation-title">{motivationCards[currentCardIndex]?.title || 'Daily Inspiration'}</h4>
                <p className="motivation-text">{motivationCards[currentCardIndex]?.content || 'The only way to do great work is to love what you do. - Steve Jobs'}</p>
                <div className="motivation-author">— {motivationCards[currentCardIndex]?.author || 'Steve Jobs'}</div>
              </div>
              <div className="motivation-actions">
                <button className="btn btn-sm btn-outline-light" onClick={prevCard}>←</button>
                <button className="btn btn-sm btn-outline-light" onClick={nextCard}>→</button>
                <button className="btn btn-sm btn-primary" onClick={shareCard}>Share</button>
                <button className="btn btn-sm btn-outline-light" onClick={favoriteCard}>♥ Favorite</button>
              </div>
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
        <button className="btn btn-primary add-btn">+ Add Task</button>
      </div>
      <div className="task-filters">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Pending</button>
        <button className="filter-btn">Completed</button>
      </div>
      <div className="task-list">
        {todos.map(todo => (
          <div key={todo.id} className="task-item">
            <div className="task-checkbox">
              <input type="checkbox" checked={todo.status === 'completed'} />
            </div>
            <div className="task-info">
              <h4 className="task-title">{todo.title}</h4>
              <span className={`priority priority-${todo.priority}`}>{todo.priority}</span>
            </div>
            <div className="task-meta">
              <span className="due-date">Due: {todo.dueDate}</span>
              <span className={`status status-${todo.status}`}>{todo.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const [showJournalForm, setShowJournalForm] = useState(false);
  const [newJournal, setNewJournal] = useState({ title: '', content: '', mood: 'positive' });

  const addJournal = async () => {
    if (newJournal.title.trim() && newJournal.content.trim()) {
      const journal = {
        id: Date.now(),
        title: newJournal.title,
        content: newJournal.content,
        mood: newJournal.mood,
        date: new Date().toISOString().split('T')[0]
      };
      
      // Add to local state immediately for instant display
      setJournals(prev => [journal, ...prev]);
      
      // Then save to database
      await saveJournalToDatabase(journal);
      
      // Reset form
      setNewJournal({ title: '', content: '', mood: 'positive' });
      setShowJournalForm(false);
    }
  };

  const renderJournals = () => (
    <div className="journals-section">
      <div className="section-header">
        <h3 className="section-title">My Journal</h3>
        <button className="btn btn-primary add-btn" onClick={() => setShowJournalForm(true)}>+ New Entry</button>
      </div>
      
      {showJournalForm && (
        <div className="journal-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Entry Title"
              value={newJournal.title}
              onChange={(e) => setNewJournal({...newJournal, title: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Write your thoughts..."
              value={newJournal.content}
              onChange={(e) => setNewJournal({...newJournal, content: e.target.value})}
              className="form-textarea"
              rows={4}
            />
          </div>
          <div className="form-group">
            <select
              value={newJournal.mood}
              onChange={(e) => setNewJournal({...newJournal, mood: e.target.value})}
              className="form-select"
            >
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="motivated">Motivated</option>
              <option value="stressed">Stressed</option>
            </select>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={addJournal}>Save Entry</button>
            <button className="btn btn-secondary" onClick={() => setShowJournalForm(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="journal-grid">
        {journals.map(journal => (
          <div key={journal.id} className="journal-card">
            <div className="journal-header">
              <h4 className="journal-title">{journal.title}</h4>
              <span className="journal-date">{journal.date}</span>
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

  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', targetDate: '', progress: 0 });

  const addGoal = async () => {
    if (newGoal.title.trim() && newGoal.targetDate.trim()) {
      const goal = {
        id: Date.now(),
        title: newGoal.title,
        targetDate: newGoal.targetDate,
        progress: 0
      };
      
      // Add to local state immediately for instant display
      setGoals(prev => [goal, ...prev]);
      
      // Then save to database
      await saveGoalToDatabase(goal);
      
      // Reset form
      setNewGoal({ title: '', targetDate: '', progress: 0 });
      setShowGoalForm(false);
    }
  };

  const renderGoals = () => (
    <div className="goals-section">
      <div className="section-header">
        <h3 className="section-title">My Goals</h3>
        <button className="btn btn-primary add-btn" onClick={() => setShowGoalForm(true)}>+ New Goal</button>
      </div>
      
      {showGoalForm && (
        <div className="goal-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Goal Title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              value={newGoal.targetDate}
              onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={addGoal}>Add Goal</button>
            <button className="btn btn-secondary" onClick={() => setShowGoalForm(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="goal-list">
        {goals.map(goal => (
          <div key={goal.id} className="goal-item">
            <div className="goal-info">
              <h4 className="goal-title">{goal.title}</h4>
              <p className="goal-target">Target: {goal.targetDate}</p>
            </div>
            <div className="goal-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${goal.progress}%` }}></div>
              </div>
              <span className="progress-text">{goal.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const nextCard = () => {
    if (motivationCards.length === 0) return;
    setCurrentCardIndex((prev) => (prev + 1) % motivationCards.length);
  };

  const prevCard = () => {
    if (motivationCards.length === 0) return;
    setCurrentCardIndex((prev) => (prev - 1 + motivationCards.length) % motivationCards.length);
  };

  const shareCard = () => {
    const card = motivationCards[currentCardIndex];
    if (!card) return;
    
    try {
      if (navigator.share) {
        navigator.share({
          title: card.title,
          text: card.content
        });
      } else {
        navigator.clipboard.writeText(`${card.title}: ${card.content}`);
        alert('Motivation card copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing card:', error);
      alert('Failed to share card. Please try again.');
    }
  };

  const favoriteCard = () => {
    const card = motivationCards[currentCardIndex];
    if (!card) return;
    
    try {
      const favorites = JSON.parse(localStorage.getItem('favoriteMotivation') || '[]');
      if (!favorites.includes(card.id)) {
        favorites.push(card.id);
        localStorage.setItem('favoriteMotivation', JSON.stringify(favorites));
        alert('Added to favorites!');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Failed to add to favorites. Please try again.');
    }
  };

  const renderMotivation = () => {
    // Always show motivation cards since they're hardcoded
    const currentCard = motivationCards[currentCardIndex];
    
    return (
      <div className="motivation-section">
        <div className="section-header">
          <h3 className="section-title">Motivation Cards</h3>
          <div className="card-controls">
            <button className="control-btn" onClick={prevCard}>←</button>
            <button className="control-btn" onClick={nextCard}>→</button>
            <button className="control-btn" onClick={shareCard}>📤</button>
            <button className="control-btn" onClick={favoriteCard}>⭐</button>
          </div>
        </div>
        <div className="motivation-carousel">
          <div className="motivation-card" style={{ 
            background: currentCard.color || 'linear-gradient(135deg, #14b8a6, #20c997)',
            fontFamily: currentCard.font || 'Georgia, serif'
          }}>
            <div className="motivation-content">
              <div className="motivation-icon">{currentCard.icon || '✨'}</div>
              <h4 className="motivation-title">{currentCard.title}</h4>
              <p className="motivation-text">{currentCard.content}</p>
              <p className="motivation-author">- {currentCard.author}</p>
            </div>
          </div>
          <div className="card-indicators">
            {motivationCards.map((_, index) => (
              <div 
                key={index} 
                className={`indicator ${index === currentCardIndex ? 'active' : ''}`}
                onClick={() => setCurrentCardIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="dashboard-title">Welcome back, {user?.name || 'Varli'}!</h1>
              <p className="dashboard-subtitle">Here's your productivity overview</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="dashboard-actions">
                <Link to="/premium" className="btn btn-outline-primary">Upgrade Plan</Link>
                <Link to="/notebook" className="btn btn-primary">My Notebook</Link>
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
            <button 
              className={`tab-btn ${activeTab === 'motivation' ? 'active' : ''}`}
              onClick={() => setActiveTab('motivation')}
            >
              Motivation
            </button>
          </div>

          <div className="dashboard-body">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'todos' && <TaskManager />}
            {activeTab === 'journals' && renderJournals()}
            {activeTab === 'goals' && renderGoals()}
            {activeTab === 'motivation' && renderMotivation()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
