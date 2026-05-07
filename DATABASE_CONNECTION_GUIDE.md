# 🔗 Database Connection & API Integration Guide

## 📋 Overview
Complete guide for connecting your premium features to the database and implementing API endpoints.

---

## 🗄️ Database Connection Setup

### 1. **Database Connection Configuration**

#### For Node.js (Express + MySQL):
```javascript
// db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'varli_sokogarden',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
```

#### Environment Variables (.env):
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=varli_sokogarden
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 🚀 API Endpoint Implementation

### 1. **Premium Subscription API**

```javascript
// routes/premium.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Get user subscription status
router.get('/subscription/status', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM user_premium_subscriptions 
       WHERE user_id = ? AND is_active = TRUE`,
      [req.user.id]
    );
    
    if (rows.length === 0) {
      return res.json({ 
        subscription_type: 'free', 
        is_premium: false 
      });
    }
    
    res.json({ 
      subscription_type: rows[0].subscription_type,
      is_premium: rows[0].subscription_type !== 'free',
      subscription: rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create subscription
router.post('/subscription/create', authenticateToken, async (req, res) => {
  try {
    const { subscription_type, payment_method } = req.body;
    
    // Check if user already has subscription
    const [existing] = await db.query(
      'SELECT id FROM user_premium_subscriptions WHERE user_id = ?',
      [req.user.id]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ error: 'User already has subscription' });
    }
    
    const [result] = await db.query(
      `INSERT INTO user_premium_subscriptions 
       (user_id, subscription_type, payment_status, is_active) 
       VALUES (?, ?, ?, ?)`,
      [req.user.id, subscription_type, 'completed', true]
    );
    
    res.json({ 
      success: true, 
      subscription_id: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 2. **Todos API**

```javascript
// routes/todos.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

// Get all todos for user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [todos] = await db.query(
      `SELECT * FROM user_todos 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new todo
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, priority, due_date } = req.body;
    
    const [result] = await db.query(
      `INSERT INTO user_todos 
       (user_id, title, description, priority, due_date) 
       VALUES (?, ?, ?, ?, ?)`,
      [req.user.id, title, description, priority, due_date]
    );
    
    // Return the created todo
    const [newTodo] = await db.query(
      'SELECT * FROM user_todos WHERE id = ?',
      [result.insertId]
    );
    
    res.json({ success: true, todo: newTodo[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update todo
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, due_date } = req.body;
    
    const [result] = await db.query(
      `UPDATE user_todos 
       SET title = ?, description = ?, priority = ?, status = ?, due_date = ?, updated_at = NOW()
       WHERE id = ? AND user_id = ?`,
      [title, description, priority, status, due_date, id, req.user.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete todo
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.query(
      'DELETE FROM user_todos WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 3. **Journals API**

```javascript
// routes/journals.js
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [journals] = await db.query(
      `SELECT * FROM user_journals 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content, mood, tags } = req.body;
    
    const [result] = await db.query(
      `INSERT INTO user_journals 
       (user_id, title, content, mood, tags) 
       VALUES (?, ?, ?, ?, ?)`,
      [req.user.id, title, content, mood, tags]
    );
    
    const [newJournal] = await db.query(
      'SELECT * FROM user_journals WHERE id = ?',
      [result.insertId]
    );
    
    res.json({ success: true, journal: newJournal[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 4. **Goals API**

```javascript
// routes/goals.js
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [goals] = await db.query(
      `SELECT * FROM user_goals 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, target_date, category } = req.body;
    
    const [result] = await db.query(
      `INSERT INTO user_goals 
       (user_id, title, description, target_date, category) 
       VALUES (?, ?, ?, ?, ?)`,
      [req.user.id, title, description, target_date, category]
    );
    
    const [newGoal] = await db.query(
      'SELECT * FROM user_goals WHERE id = ?',
      [result.insertId]
    );
    
    res.json({ success: true, goal: newGoal[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/progress', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;
    
    const [result] = await db.query(
      `UPDATE user_goals 
       SET progress = ?, updated_at = NOW()
       WHERE id = ? AND user_id = ?`,
      [progress, id, req.user.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 5. **Motivation Cards API**

```javascript
// routes/motivation.js
router.get('/cards/daily', authenticateToken, async (req, res) => {
  try {
    // Get random motivation card
    const [cards] = await db.query(
      'SELECT * FROM motivation_cards WHERE is_active = TRUE ORDER BY RAND() LIMIT 1'
    );
    
    if (cards.length === 0) {
      return res.status(404).json({ error: 'No motivation cards available' });
    }
    
    res.json(cards[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/cards', authenticateToken, async (req, res) => {
  try {
    const [cards] = await db.query(
      'SELECT * FROM motivation_cards WHERE is_active = TRUE ORDER BY created_at DESC'
    );
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/cards/:id/favorite', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if already favorited
    const [existing] = await db.query(
      'SELECT id FROM user_favorite_cards WHERE user_id = ? AND card_id = ?',
      [req.user.id, id]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Already favorited' });
    }
    
    const [result] = await db.query(
      'INSERT INTO user_favorite_cards (user_id, card_id) VALUES (?, ?)',
      [req.user.id, id]
    );
    
    res.json({ success: true, favorite_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## 🔧 Express App Setup

### Main App Configuration:

```javascript
// app.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const db = require('./db');

// Routes
app.use('/api/premium', require('./routes/premium'));
app.use('/api/todos', require('./routes/todos'));
app.use('/api/journals', require('./routes/journals'));
app.use('/api/goals', require('./routes/goals'));
app.use('/api/motivation', require('./routes/motivation'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🎨 Frontend Integration

### Update UserDashboard.jsx:

```javascript
// src/components/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [journals, setJournals] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get JWT token from localStorage
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  // API headers
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  });

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos', {
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
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(todoData)
      });
      const data = await response.json();
      if (data.success) {
        setTodos([data.todo, ...todos]);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  // Update todo
  const updateTodo = async (id, updates) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updates)
      });
      const data = await response.json();
      if (data.success) {
        setTodos(todos.map(todo => 
          todo.id === id ? { ...todo, ...updates } : todo
        ));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchTodos(),
        // Add other fetch functions here
      ]);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Rest of your component JSX...
};
```

---

## 📦 Required Dependencies

### Install packages:
```bash
npm install express mysql2 cors jsonwebtoken bcryptjs dotenv
```

### Package.json:
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "cors": "^2.8.5",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.3.1"
  }
}
```

---

## 🔒 Security Implementation

### JWT Authentication Middleware:

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

const requirePremium = (req, res, next) => {
  // Check if user has premium subscription
  // Implementation here
  next();
};

module.exports = { authenticateToken, requirePremium };
```

---

## 🚀 Deployment Checklist

- [ ] Database tables created with foreign keys
- [ ] Environment variables configured
- [ ] API endpoints tested
- [ ] JWT authentication working
- [ ] Frontend integration complete
- [ ] Error handling implemented
- [ ] CORS configured
- [ ] Security measures in place

---

## 🎯 Next Steps

1. **Set up database** with all tables
2. **Configure environment variables**
3. **Implement API endpoints**
4. **Test authentication flow**
5. **Connect frontend components**
6. **Deploy and monitor**

**🎉 Your premium features are now ready for full integration!**
