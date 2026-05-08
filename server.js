const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
let db = null;

// Database connection with retry logic
const connectDB = async () => {
  try {
    db = require('./db');
    console.log('Database connected successfully');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};

// Initialize database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware (same as your existing API)
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

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 as test');
    res.json({ success: true, message: 'Database connected!', data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Import M-PESA service
const MpesaService = require('./mpesa_service');

// M-PESA Payment API endpoint
app.post('/api/mpesa_payment', async (req, res) => {
  try {
    const { phone, amount, plan, user_id } = req.body;
    
    // Validate input
    if (!phone || !amount || !plan) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: phone, amount, plan' 
      });
    }
    
    // Validate phone number format (Kenya format)
    const phoneRegex = /^254[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid phone number format. Use format: 254XXXXXXXXX' 
      });
    }
    
    // Log payment attempt
    console.log('Payment attempt:', { phone, amount, plan, user_id });
    
    // Initialize M-PESA service
    const mpesaService = new MpesaService();
    
    // Generate unique account reference
    const accountReference = `NOTE${plan.toUpperCase()}${Date.now()}`;
    
    // Convert amount to cents (M-PESA requires amount in cents)
    const amountInCents = parseInt(amount) * 100;
    
    // Initiate real M-PESA STK push
    const stkResponse = await mpesaService.initiateStkPush(phone, amountInCents, accountReference);
    
    if (stkResponse.ResponseCode === '0') {
      // STK push initiated successfully
      const paymentId = stkResponse.CheckoutRequestID;
      
      // Store payment record
      try {
        await db.query(
          'INSERT INTO payments (user_id, phone, amount, plan, payment_id, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
          [user_id, phone, amount, plan, paymentId, 'pending']
        );
      } catch (dbError) {
        console.error('Database error:', dbError);
      }
      
      res.json({ 
        success: true, 
        message: 'M-PESA prompt sent! Please check your phone and enter PIN.',
        paymentId: paymentId,
        phone: phone,
        amount: amount,
        plan: plan,
        merchantRequestID: stkResponse.MerchantRequestID
      });
    } else {
      // STK push failed
      res.status(400).json({ 
        success: false, 
        message: `M-PESA STK push failed: ${stkResponse.errorMessage || 'Unknown error'}`,
        errorCode: stkResponse.ResponseCode
      });
    }
    
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Payment processing failed. Please try again.' 
    });
  }
});

// M-PESA Callback endpoint (where Safaricom sends payment results)
app.post('/api/mpesa/callback', async (req, res) => {
  try {
    console.log('M-PESA Callback received:', req.body);
    
    // Process the callback
    const result = new MpesaService().processCallback(req.body);
    
    if (result.success) {
      // Update payment status in database
      await db.query(
        'UPDATE payments SET status = ?, mpesa_receipt = ?, transaction_date = ? WHERE payment_id = ?',
        ['completed', result.mpesaReceiptNumber, result.transactionDate, result.merchantRequestID]
      );
      
      console.log('Payment completed successfully:', result);
    } else {
      // Update payment status to failed
      await db.query(
        'UPDATE payments SET status = ? WHERE payment_id = ?',
        ['failed', result.merchantRequestID]
      );
      
      console.log('Payment failed:', result.message);
    }
    
    // Always respond to M-PESA with success
    res.status(200).json({ 
      'ResultCode': 0, 
      'ResultDesc': 'Success' 
    });
    
  } catch (error) {
    console.error('Callback error:', error);
    res.status(500).json({ 
      'ResultCode': 1, 
      'ResultDesc': 'Callback processing failed' 
    });
  }
});

// Get todos for user (same structure as your existing API)
app.get('/api/get_user_todos', authenticateToken, async (req, res) => {
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
app.post('/api/add_user_todo', authenticateToken, async (req, res) => {
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

// Update todo
app.put('/api/update_user_todo/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;
    
    const [result] = await db.query(
      'UPDATE user_todos SET title = ?, description = ?, priority = ?, status = ?, updated_at = NOW() WHERE id = ? AND user_id = ?',
      [title, description, priority, status, id, req.user.id]
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
app.delete('/api/delete_user_todo/:id', authenticateToken, async (req, res) => {
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

// Get journals for user
app.get('/api/get_user_journals', authenticateToken, async (req, res) => {
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
app.post('/api/add_user_journal', authenticateToken, async (req, res) => {
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
app.get('/api/get_user_goals', authenticateToken, async (req, res) => {
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
app.post('/api/add_user_goal', authenticateToken, async (req, res) => {
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

// Update goal progress
app.put('/api/update_user_goal/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;
    
    const [result] = await db.query(
      'UPDATE user_goals SET progress = ?, updated_at = NOW() WHERE id = ? AND user_id = ?',
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

// Get motivation cards
app.get('/api/get_motivation_cards', authenticateToken, async (req, res) => {
  try {
    const [cards] = await db.query(
      'SELECT * FROM motivation_cards WHERE is_active = TRUE ORDER BY RAND() LIMIT 5'
    );
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user notebooks
app.get('/api/get_user_notebooks', authenticateToken, async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [notebooks] = await db.query(
      'SELECT *, (SELECT COUNT(*) as card_count FROM user_notebook_cards WHERE notebook_id = nb.id) as card_count FROM user_notebooks nb LEFT JOIN user_notebook_cards nbc ON nb.id = nbc.notebook_id WHERE nb.user_id = ? ORDER BY nb.created_at DESC',
      [req.user.id]
    );
    res.json(notebooks);
  } catch (error) {
    console.error('Error fetching notebooks:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new notebook
app.post('/api/add_user_notebook', authenticateToken, async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const { title, description, color } = req.body;
    
    // Validate input
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Notebook title is required' });
    }
    
    if (title.length > 255) {
      return res.status(400).json({ error: 'Notebook title too long' });
    }
    
    const [result] = await db.query(
      'INSERT INTO user_notebooks (user_id, title, description, color) VALUES (?, ?, ?, ?)',
      [req.user.id, title, description, color]
    );
    
    res.json({ success: true, notebookId: result.insertId });
  } catch (error) {
    console.error('Error creating notebook:', error);
    res.status(500).json({ error: 'Failed to create notebook' });
  }
});

// Get cards for specific notebook
app.get('/api/get_notebook_cards/:notebookId', authenticateToken, async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const { notebookId } = req.params;
    console.log('Fetching cards for notebook:', notebookId, 'user:', req.user.id);
    
    const [cards] = await db.query(
      'SELECT * FROM user_notebook_cards WHERE notebook_id = ? AND user_id = ? ORDER BY created_at DESC',
      [notebookId, req.user.id]
    );
    
    console.log('Cards fetched:', cards.length);
    res.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new card
app.post('/api/add_notebook_card', authenticateToken, async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const { notebook_id, title, content, color } = req.body;
    
    // Validate input
    if (!notebook_id || !title) {
      return res.status(400).json({ error: 'Notebook ID and title are required' });
    }
    
    console.log('Creating card:', { notebook_id, user_id: req.user.id, title });
    
    const [result] = await db.query(
      'INSERT INTO user_notebook_cards (notebook_id, user_id, title, content, color) VALUES (?, ?, ?, ?, ?)',
      [notebook_id, req.user.id, title, content, color]
    );
    
    console.log('Card created with ID:', result.insertId);
    res.json({ success: true, cardId: result.insertId });
  } catch (error) {
    console.error('Database error creating card:', error);
    res.status(500).json({ error: 'Failed to create card: ' + error.message });
  }
});

// Update card
app.put('/api/update_notebook_card/:cardId', authenticateToken, async (req, res) => {
  try {
    const { cardId } = req.params;
    const { title, content } = req.body;
    
    const [result] = await db.query(
      'UPDATE user_notebook_cards SET title = ?, content = ?, updated_at = NOW() WHERE id = ? AND user_id = ?',
      [title, content, cardId, req.user.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete card
app.delete('/api/delete_notebook_card/:cardId', authenticateToken, async (req, res) => {
  try {
    const { cardId } = req.params;
    
    const [result] = await db.query(
      'DELETE FROM user_notebook_cards WHERE id = ? AND user_id = ?',
      [cardId, req.user.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Premium API server running on http://localhost:${PORT}`);
  console.log(`Test connection at: http://localhost:${PORT}/api/test`);
});
