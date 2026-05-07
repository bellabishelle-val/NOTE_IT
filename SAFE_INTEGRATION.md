# 🔒 Safe API Integration Guide

## 🛡️ **Safety First Approach**

### **Step 1: Backup Your Existing Server**
```bash
# Create backup of your current working server
cp server.js server.js.backup
```

### **Step 2: Add Notebook Endpoints Carefully**
Add these endpoints to your EXISTING `server.js`:

```javascript
// Add these AFTER your existing routes

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
```

### **Step 3: Test Each Endpoint Separately**
```bash
# Test notebooks endpoint
curl -X GET "https://varli.alwaysdata.net/api/get_user_notebooks" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test notebook creation
curl -X POST "https://varli.alwaysdata.net/api/add_user_notebook" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Notebook","description":"Test description","color":"#6366f1"}'
```

### **Step 4: Gradual Integration**
- Add **one endpoint at a time**
- **Test each endpoint** before adding the next
- **Monitor server logs** for errors
- **Keep existing functionality** intact

---

## ✅ **Safety Checklist:**

- [ ] Backup existing server
- [ ] Add endpoints one by one
- [ ] Test each endpoint individually
- [ ] Monitor for conflicts with existing routes
- [ ] Keep existing API working
- [ ] Document any changes

---

## 🎯 **This Approach:**

✅ **Zero risk** to your existing API  
✅ **Gradual integration** - test as you go  
✅ **Easy rollback** - just restore backup if needed  
✅ **Preserves existing functionality** completely  
✅ **No database changes** required initially  

**🔒 Start with Step 1 and proceed carefully!**
