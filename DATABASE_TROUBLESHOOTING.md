# 🔧 Database Connection Troubleshooting Guide

## 🚨 **Issue: Create Button Not Working**

### **Root Cause Analysis:**
The create button issue is likely caused by one of these problems:

1. **Database tables don't exist**
2. **API server not running**
3. **Database connection failed**
4. **Wrong API endpoint URL**
5. **Authentication token missing**

---

## 🛠️ **Step-by-Step Debugging:**

### **Step 1: Check Database Tables**
```sql
-- Execute this to verify tables exist:
SHOW TABLES LIKE 'user_notebook%';

-- Check if tables have data:
SELECT COUNT(*) FROM user_notebooks;
SELECT COUNT(*) FROM user_notebook_cards;
```

### **Step 2: Test API Server**
```bash
# Start the server
npm run server

# Test connection
curl http://localhost:5000/api/test

# Test card creation
curl -X POST http://localhost:5000/api/add_notebook_card \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"notebook_id":1,"title":"Test Card","content":"Test content","color":"#ffffff"}'
```

### **Step 3: Check Browser Console**
Open browser dev tools and look for:
- Network errors (failed API calls)
- JavaScript errors
- CORS issues
- Authentication problems

### **Step 4: Verify Database Connection**
```javascript
// In server.js console, you should see:
// Database connected successfully
// Card created with ID: 123
// Cards fetched: 5
```

---

## 🔍 **Common Issues & Solutions:**

### **Issue: "Database not connected"**
**Solution:** Check `.env` file credentials:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=varli_sokogarden
JWT_SECRET=your_jwt_secret_key
```

### **Issue: "Table doesn't exist"**
**Solution:** Execute table creation:
```sql
-- Run these commands in order:
CREATE TABLE user_notebooks (...);
CREATE TABLE user_notebook_cards (...);
```

### **Issue: "Token required"**
**Solution:** Check localStorage:
```javascript
// In browser console:
localStorage.getItem('authToken')
```

### **Issue: "CORS error"**
**Solution:** Check server CORS settings:
```javascript
// In server.js
app.use(cors({
  origin: ['http://localhost:3000', 'https://varli.alwaysdata.net'],
  credentials: true
}));
```

---

## 📋 **Quick Fix Checklist:**

- [ ] Database tables created
- [ ] API server running (`npm run server`)
- [ ] Database credentials correct in `.env`
- [ ] User logged in with valid token
- [ ] No console errors
- [ ] Network requests successful

---

## 🚀 **Test Your System:**

1. **Execute:** `npm run server`
2. **Check:** Server console for "Database connected successfully"
3. **Test:** Browser network tab for successful API calls
4. **Verify:** Card creation works end-to-end

---

## 💡 **If Still Not Working:**

**Check these specific files:**
- `server.js` - Database connection and API endpoints
- `.env` - Database credentials
- `Notebook.jsx` - API calls and state management
- Database tables - Verify they exist and have correct structure

---

## 🔧 **Debug Commands:**

```bash
# Check if server is running
netstat -an | grep :5000

# Check database connection
mysql -u your_user -p -e "USE varli_sokogarden; SHOW TABLES;"

# Test API directly
curl -X POST http://localhost:5000/api/add_notebook_card \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test" \
  -d '{"notebook_id":1,"title":"test"}' \
  -v
```

---

**🎯 Follow these steps systematically to identify and fix the exact issue!**
