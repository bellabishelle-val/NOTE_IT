-- ========================================
-- FOOTER MESSAGES TABLE
-- ========================================
-- Execute these SQL commands to create the table for footer messages

-- Create footer_messages table
CREATE TABLE footer_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_messages (user_id)
);

-- Add foreign key constraint (after users table exists)
ALTER TABLE footer_messages 
ADD CONSTRAINT fk_message_user 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- ========================================
-- API ENDPOINTS NEEDED:
-- ========================================
-- Add these endpoints to your server.js

// Save footer message
app.post('/api/save_footer_message', authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const [result] = await db.query(
      'INSERT INTO footer_messages (user_id, message) VALUES (?, ?)',
      [req.user.id, message]
    );
    
    res.json({ success: true, messageId: result.insertId });
  } catch (error) {
    console.error('Error saving footer message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Get footer messages
app.get('/api/get_footer_messages', authenticateToken, async (req, res) => {
  try {
    const [messages] = await db.query(
      'SELECT * FROM footer_messages WHERE user_id = ? ORDER BY created_at DESC LIMIT 10',
      [req.user.id]
    );
    res.json(messages);
  } catch (error) {
    console.error('Error fetching footer messages:', error);
    res.status(500).json({ error: error.message });
  }
});

-- ========================================
-- INTEGRATION INSTRUCTIONS:
-- ========================================
-- 1. Execute the SQL commands above
-- 2. Add the API endpoints to your server.js
-- 3. Update Footer.jsx to use these new endpoints
-- 4. Test the footer message functionality

-- ========================================
-- READY TO USE! 🎉
