# 🔗 API Integration Guide

## 📋 **Add These Endpoints to Your Existing Server**

### **Notebook Endpoints:**
```javascript
// Add to your existing server.js (varli.alwaysdata.net)

// Get user notebooks
app.get('/api/get_user_notebooks', authenticateToken, async (req, res) => {
  try {
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
    const { title, description, color } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO user_notebooks (user_id, title, description, color) VALUES (?, ?, ?, ?)',
      [req.user.id, title, description, color]
    );
    
    res.json({ success: true, notebookId: result.insertId });
  } catch (error) {
    console.error('Error creating notebook:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get cards for notebook
app.get('/api/get_notebook_cards/:notebookId', authenticateToken, async (req, res) => {
  try {
    const { notebookId } = req.params;
    const [cards] = await db.query(
      'SELECT * FROM user_notebook_cards WHERE notebook_id = ? AND user_id = ? ORDER BY created_at DESC',
      [notebookId, req.user.id]
    );
    res.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new card
app.post('/api/add_notebook_card', authenticateToken, async (req, res) => {
  try {
    const { notebook_id, title, content, color } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO user_notebook_cards (notebook_id, user_id, title, content, color) VALUES (?, ?, ?, ?, ?)',
      [notebook_id, req.user.id, title, content, color]
    );
    
    res.json({ success: true, cardId: result.insertId });
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: error.message });
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
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating card:', error);
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
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: error.message });
  }
});
```

---

## 🎯 **Frontend Updates Needed:**

### **Update Notebook.jsx API Base URL:**
```javascript
// Change from localhost to your existing API
const API_BASE = 'https://varli.alwaysdata.net/api';
```

### **Authentication:**
- Use same JWT token system as your existing endpoints
- Same middleware and validation

---

## 🚀 **Implementation Steps:**

1. **Copy endpoints** above into your existing server.js
2. **Update Notebook.jsx** to use correct API_BASE
3. **Test with your existing database** connection
4. **Deploy single server** with all endpoints

---

## ✅ **Benefits:**

- **Single server** management
- **Existing database** connection
- **Proven authentication** system
- **Easier deployment** and maintenance
- **Consistent API** structure

---

**🎉 Ready to integrate with your working API infrastructure!**
