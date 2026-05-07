# 🚀 STEP-BY-STEP Premium Features Implementation

## 📋 What You Need to Do - Simple & Clear

---

## 🔧 **STEP 1: Install Required Packages**

Open terminal in your project folder and run:

```bash
npm install express mysql2 cors jsonwebtoken bcryptjs dotenv
```

**What this does**: Installs everything needed for database connection and API

---

## ⚙️ **STEP 2: Create Environment File**

Create a new file called `.env` in your project root:

```env
DB_HOST=localhost
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=varli_sokogarden
JWT_SECRET=your_secret_key_here_make_it_long_and_random
```

**What this does**: Stores your database credentials securely

---

## 🗄️ **STEP 3: Create Database Connection**

Create a new file `db.js` in your project root:

```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
```

**What this does**: Connects your app to the database

---

## 🛣️ **STEP 4: Create API Server**

Create a new file `server.js` in your project root:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 as test');
    res.json({ success: true, message: 'Database connected!', data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**What this does**: Creates a basic API server to test database connection

---

## 🧪 **STEP 5: Test Database Connection**

1. **Start the server**:
   ```bash
   node server.js
   ```

2. **Test in browser**:
   Open `http://localhost:5000/api/test`

3. **You should see**:
   ```json
   {
     "success": true,
     "message": "Database connected!",
     "data": [{"test": 1}]
   }
   ```

---

## 📝 **STEP 6: Add Premium Features API**

Replace the content of `server.js` with this:

```javascript
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const db = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Simple authentication (you'll improve this later)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Get todos for user
app.get('/api/todos', authenticateToken, async (req, res) => {
  try {
    const [todos] = await db.query(
      'SELECT * FROM user_todos WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new todo
app.post('/api/todos', authenticateToken, async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO user_todos (user_id, title, description, priority) VALUES (?, ?, ?, ?)',
      [req.user.id, title, description, priority || 'medium']
    );
    
    res.json({ success: true, todoId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get journals for user
app.get('/api/journals', authenticateToken, async (req, res) => {
  try {
    const [journals] = await db.query(
      'SELECT * FROM user_journals WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new journal
app.post('/api/journals', authenticateToken, async (req, res) => {
  try {
    const { title, content, mood } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO user_journals (user_id, title, content, mood) VALUES (?, ?, ?, ?)',
      [req.user.id, title, content, mood || 'neutral']
    );
    
    res.json({ success: true, journalId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get goals for user
app.get('/api/goals', authenticateToken, async (req, res) => {
  try {
    const [goals] = await db.query(
      'SELECT * FROM user_goals WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new goal
app.post('/api/goals', authenticateToken, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO user_goals (user_id, title, description, category) VALUES (?, ?, ?, ?)',
      [req.user.id, title, description, category || 'personal']
    );
    
    res.json({ success: true, goalId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Premium API server running on http://localhost:${PORT}`);
});
```

**What this does**: Adds all premium feature endpoints to your API

---

## 🎨 **STEP 7: Update Your React App**

Update your `UserDashboard.jsx` to connect to the new API:

```javascript
// Add this to your UserDashboard.jsx
import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
  const [todos, setTodos] = useState([]);
  const [journals, setJournals] = useState([]);
  const [goals, setGoals] = useState([]);

  // Get auth token (assuming you store it in localStorage)
  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get todos
        const todosResponse = await fetch('http://localhost:5000/api/todos', {
          headers: getAuthHeaders()
        });
        const todosData = await todosResponse.json();
        setTodos(todosData);

        // Get journals
        const journalsResponse = await fetch('http://localhost:5000/api/journals', {
          headers: getAuthHeaders()
        });
        const journalsData = await journalsResponse.json();
        setJournals(journalsData);

        // Get goals
        const goalsResponse = await fetch('http://localhost:5000/api/goals', {
          headers: getAuthHeaders()
        });
        const goalsData = await goalsResponse.json();
        setGoals(goalsData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Add new todo
  const addTodo = async (todoData) => {
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(todoData)
      });
      
      if (response.ok) {
        // Refresh todos list
        const todosResponse = await fetch('http://localhost:5000/api/todos', {
          headers: getAuthHeaders()
        });
        const todosData = await todosResponse.json();
        setTodos(todosData);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Rest of your component...
  
  return (
    <div className="user-dashboard">
      <h1>My Dashboard</h1>
      
      <div>
        <h2>Todos ({todos.length})</h2>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
        
        <button onClick={() => addTodo({ title: 'New Task', description: 'Test task' })}>
          Add Todo
        </button>
      </div>
      
      <div>
        <h2>Journals ({journals.length})</h2>
        <ul>
          {journals.map(journal => (
            <li key={journal.id}>{journal.title}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2>Goals ({goals.length})</h2>
        <ul>
          {goals.map(goal => (
            <li key={goal.id}>{goal.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
```

---

## 🚀 **STEP 8: Run Everything**

1. **Start your API server**:
   ```bash
   node server.js
   ```

2. **Start your React app** (in another terminal):
   ```bash
   npm start
   ```

3. **Test your premium features**:
   - Login to your app
   - Go to Dashboard
   - Try adding todos, journals, goals

---

## 🔧 **Troubleshooting**

### If you get "Database connection failed":
- Check your `.env` file credentials
- Make sure MySQL server is running
- Verify database name `varli_sokogarden` exists

### If you get "Token required" error:
- Make sure you're logged in
- Check that `authToken` is in localStorage
- Verify token is being sent in headers

### If you get "Table doesn't exist":
- Run the SQL CREATE TABLE statements first
- Check table names match exactly

---

## ✅ **Success Checklist**

- [ ] Packages installed without errors
- [ ] `.env` file created with correct credentials
- [ ] Database connection test works
- [ ] API server starts on port 5000
- [ ] Can fetch todos from API
- [ ] Can create new todos
- [ ] Dashboard shows real data
- [ ] All premium features working

---

## 🎯 **What You've Built**

✅ **Complete API server** with authentication  
✅ **Database connection** working  
✅ **Premium features** accessible via API  
✅ **React frontend** connected to backend  
✅ **Real-time data** updates  

**🎉 Your premium features are now fully functional!**
