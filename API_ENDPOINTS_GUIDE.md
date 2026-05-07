# 🔗 API Endpoints Guide

## 📋 Updated API Structure

I've updated your premium features API to use the same base URL as your existing product API: `https://varli.alwaysdata.net/api/`

---

## 🚀 **Premium API Endpoints**

### **Todos**
- `GET /api/get_user_todos` - Get user's todos
- `POST /api/add_user_todo` - Create new todo
- `PUT /api/update_user_todo/:id` - Update todo
- `DELETE /api/delete_user_todo/:id` - Delete todo

### **Journals**
- `GET /api/get_user_journals` - Get user's journals
- `POST /api/add_user_journal` - Create new journal

### **Goals**
- `GET /api/get_user_goals` - Get user's goals
- `POST /api/add_user_goal` - Create new goal
- `PUT /api/update_user_goal/:id` - Update goal progress

### **Motivation Cards**
- `GET /api/get_motivation_cards` - Get motivation cards

---

## 🎨 **Frontend Integration**

Your React components should now call:

```javascript
// Use this API base URL
const API_BASE = 'https://varli.alwaysdata.net/api';

// Example: Fetch todos
const fetchTodos = async () => {
  const response = await fetch(`${API_BASE}/get_user_todos`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const todos = await response.json();
  return todos;
};
```

---

## 🔧 **Server Setup**

1. **Update .env** with your database credentials
2. **Create database tables** using SQL from `DATABASE_SETUP_GUIDE.md`
3. **Start server**: `npm run server`
4. **Test endpoints**: Visit `https://varli.alwaysdata.net/api/test`

---

## ✅ **Files Updated**

- ✅ **`server.js`** - Updated with correct endpoint names
- ✅ **`UserDashboardAPI.jsx`** - Updated API calls
- ✅ **`package.json`** - Added dependencies and scripts

---

## 🎯 **Next Steps**

1. Deploy the server to your hosting
2. Update your React app to use `UserDashboardAPI.jsx`
3. Test all premium features end-to-end
4. Monitor API performance and usage

**🎉 Your premium features are now integrated with your existing API structure!**
