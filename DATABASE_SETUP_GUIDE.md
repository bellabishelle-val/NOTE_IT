# 🗄️ Premium Features Database Setup Guide

## 📋 Overview
This guide provides the complete database schema for implementing the premium features system in your NOTE_IT application.

---

## 🏗️ Database Schema

### 1. **user_premium_subscriptions**
Manages user subscription status and payment information.

```sql
CREATE TABLE user_premium_subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    subscription_type ENUM('free', 'premium', 'lifetime') DEFAULT 'free',
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_date DATETIME NULL,
    is_active BOOLEAN DEFAULT FALSE,
    payment_status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    payment_method VARCHAR(50) NULL,
    stripe_subscription_id VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_subscription (user_id),
    INDEX idx_subscription_type (subscription_type),
    INDEX idx_active_status (is_active)
);

-- Add foreign key constraint after users table exists:
-- ALTER TABLE user_premium_subscriptions 
-- ADD CONSTRAINT fk_subscription_user 
-- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

**Purpose**: Track which users have premium access
**Key Fields**: `subscription_type`, `is_active`, `payment_status`

---

### 2. **user_todos**
Manages user to-do list items with priority and status tracking.

```sql
CREATE TABLE user_todos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    due_date DATE NULL,
    completed_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_todos (user_id),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_due_date (due_date)
);

-- Add foreign key constraint after users table exists:
-- ALTER TABLE user_todos 
-- ADD CONSTRAINT fk_todo_user 
-- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

**Purpose**: Store user tasks with priority levels and due dates
**Key Fields**: `title`, `priority`, `status`, `due_date`

---

### 3. **user_journals**
Stores user journal entries with mood tracking and categorization.

```sql
CREATE TABLE user_journals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    mood ENUM('positive', 'negative', 'neutral', 'motivated', 'stressed', 'happy', 'sad', 'excited') DEFAULT 'neutral',
    tags VARCHAR(500) NULL, -- Comma-separated tags
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_journals (user_id),
    INDEX idx_mood (mood),
    INDEX idx_created_date (created_at)
);

-- Add foreign key constraint after users table exists:
-- ALTER TABLE user_journals 
-- ADD CONSTRAINT fk_journal_user 
-- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

**Purpose**: Store personal journal entries with emotional tracking
**Key Fields**: `title`, `content`, `mood`, `tags`

---

### 4. **motivation_cards**
Pre-defined motivation cards for daily inspiration.

```sql
CREATE TABLE motivation_cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category ENUM('motivation', 'success', 'productivity', 'happiness', 'goals', 'discipline') DEFAULT 'motivation',
    image_url VARCHAR(500) NULL,
    author VARCHAR(100) NULL,
    is_premium BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_premium_status (is_premium),
    INDEX idx_active_status (is_active)
);
```

**Purpose**: Store motivational content for daily inspiration
**Key Fields**: `title`, `content`, `category`, `is_premium`

---

### 5. **user_favorite_cards**
Tracks which motivation cards users have saved.

```sql
CREATE TABLE user_favorite_cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    card_id INT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_card (user_id, card_id),
    INDEX idx_user_favorites (user_id),
    INDEX idx_card_favorites (card_id)
);

-- Add foreign key constraints after users and motivation_cards tables exist:
-- ALTER TABLE user_favorite_cards 
-- ADD CONSTRAINT fk_favorite_user 
-- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
-- ADD CONSTRAINT fk_favorite_card 
-- FOREIGN KEY (card_id) REFERENCES motivation_cards(id) ON DELETE CASCADE;
```

**Purpose**: Allow users to save favorite motivation cards
**Key Fields**: `user_id`, `card_id`, `saved_at`

---

### 6. **user_goals**
Long-term goal tracking with progress monitoring.

```sql
CREATE TABLE user_goals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    target_date DATE NULL,
    progress INT DEFAULT 0, -- Percentage 0-100
    status ENUM('active', 'completed', 'paused', 'cancelled') DEFAULT 'active',
    category ENUM('personal', 'professional', 'health', 'education', 'financial', 'creative') DEFAULT 'personal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at DATETIME NULL,
    INDEX idx_user_goals (user_id),
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_target_date (target_date)
);

-- Add foreign key constraint after users table exists:
-- ALTER TABLE user_goals 
-- ADD CONSTRAINT fk_goal_user 
-- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

**Purpose**: Track long-term goals with progress percentages
**Key Fields**: `title`, `progress`, `status`, `target_date`

---

### 7. **goal_milestones**
Milestone tracking for long-term goals.

```sql
CREATE TABLE goal_milestones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    goal_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    target_progress INT NOT NULL, -- Progress percentage for this milestone
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_goal_milestones (goal_id),
    INDEX idx_completion_status (is_completed)
);

-- Add foreign key constraint after user_goals table exists:
-- ALTER TABLE goal_milestones 
-- ADD CONSTRAINT fk_milestone_goal 
-- FOREIGN KEY (goal_id) REFERENCES user_goals(id) ON DELETE CASCADE;
```

**Purpose**: Break down goals into smaller milestones
**Key Fields**: `goal_id`, `title`, `target_progress`, `is_completed`

---

## 🔗 Integration Points

### API Endpoints Needed:

```javascript
// Premium Subscription
POST /api/subscription/create
GET /api/subscription/status
POST /api/subscription/cancel

// Todos
GET /api/todos
POST /api/todos
PUT /api/todos/:id
DELETE /api/todos/:id

// Journals
GET /api/journals
POST /api/journals
PUT /api/journals/:id
DELETE /api/journals/:id

// Goals
GET /api/goals
POST /api/goals
PUT /api/goals/:id
DELETE /api/goals/:id

// Motivation Cards
GET /api/motivation-cards/daily
GET /api/motivation-cards
POST /api/motivation-cards/:id/favorite
DELETE /api/motivation-cards/:id/favorite
```

---

## 🚀 Implementation Steps

### Step 1: Database Setup (IMPORTANT - Execute in Order)

```sql
-- Step 1: Create all tables WITHOUT foreign keys first
-- Execute all CREATE TABLE statements above (they're already fixed)

-- Step 2: Add foreign key constraints AFTER all tables exist
-- Execute these ALTER statements in order:

ALTER TABLE user_premium_subscriptions 
ADD CONSTRAINT fk_subscription_user 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_todos 
ADD CONSTRAINT fk_todo_user 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_journals 
ADD CONSTRAINT fk_journal_user 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_favorite_cards 
ADD CONSTRAINT fk_favorite_user 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
ADD CONSTRAINT fk_favorite_card 
FOREIGN KEY (card_id) REFERENCES motivation_cards(id) ON DELETE CASCADE;

ALTER TABLE user_goals 
ADD CONSTRAINT fk_goal_user 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE goal_milestones 
ADD CONSTRAINT fk_milestone_goal 
FOREIGN KEY (goal_id) REFERENCES user_goals(id) ON DELETE CASCADE;
```

**⚠️ CRITICAL**: Make sure your `users` table exists before running the ALTER statements!

### Step 2: Backend API Integration
```javascript
// Example API structure for todos
app.get('/api/todos', authenticate, async (req, res) => {
  const todos = await db.query(
    'SELECT * FROM user_todos WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id]
  );
  res.json(todos);
});
```

### Step 3: Frontend Integration
```javascript
// Update UserDashboard.jsx to use real API calls
const fetchTodos = async () => {
  try {
    const response = await fetch('/api/todos', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const todos = await response.json();
    setTodos(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};
```

---

## 📊 Sample Data

### Motivation Cards Sample:
```sql
INSERT INTO motivation_cards (title, content, category, author) VALUES
('Daily Inspiration', 'The only way to do great work is to love what you do.', 'motivation', 'Steve Jobs'),
('Stay Positive', 'Every day is a new beginning. Take a deep breath and start again.', 'happiness', NULL),
('Dream Big', 'The future belongs to those who believe in the beauty of their dreams.', 'goals', 'Eleanor Roosevelt');
```

---

## 🔒 Security Considerations

1. **Authentication**: All premium endpoints require valid JWT tokens
2. **Authorization**: Users can only access their own data
3. **Input Validation**: Sanitize all user inputs
4. **Rate Limiting**: Implement rate limiting on API endpoints
5. **Data Encryption**: Encrypt sensitive user data

---

## 🎯 Performance Optimization

1. **Database Indexes**: All tables include proper indexes
2. **Caching**: Cache frequently accessed data (motivation cards)
3. **Pagination**: Implement pagination for large datasets
4. **Lazy Loading**: Load data as needed in dashboard

---

## 📱 Mobile Considerations

1. **Responsive Design**: All components are mobile-responsive
2. **Offline Support**: Consider local storage for basic functionality
3. **Push Notifications**: For reminders and deadlines

---

## 💰 Payment Integration (Optional)

For Stripe integration:
```sql
ALTER TABLE user_premium_subscriptions 
ADD COLUMN stripe_customer_id VARCHAR(255) NULL,
ADD COLUMN stripe_subscription_id VARCHAR(255) NULL,
ADD COLUMN last_payment_date DATETIME NULL,
ADD COLUMN next_billing_date DATETIME NULL;
```

---

## 🎨 Customization Options

```sql
-- For user theme preferences
CREATE TABLE user_preferences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    theme VARCHAR(50) DEFAULT 'light',
    dashboard_layout VARCHAR(50) DEFAULT 'grid',
    notification_preferences JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add foreign key constraint after users table exists:
-- ALTER TABLE user_preferences 
-- ADD CONSTRAINT fk_preference_user 
-- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

---

## 🔄 Migration Strategy

If upgrading existing users:
```sql
-- Set existing users to free tier
INSERT INTO user_premium_subscriptions (user_id, subscription_type, is_active)
SELECT id, 'free', TRUE FROM users 
WHERE id NOT IN (SELECT user_id FROM user_premium_subscriptions);
```

---

## 📈 Analytics Tracking

```sql
-- For tracking feature usage
CREATE TABLE user_analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    feature_used VARCHAR(50) NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSON NULL,
    INDEX idx_user_analytics (user_id),
    INDEX idx_feature_usage (feature_used),
    INDEX idx_timestamp (timestamp)
);

-- Add foreign key constraint after users table exists:
-- ALTER TABLE user_analytics 
-- ADD CONSTRAINT fk_analytics_user 
-- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

---

## ✅ Testing Checklist

- [ ] All tables created successfully
- [ ] Foreign key constraints working
- [ ] Indexes properly created
- [ ] API endpoints responding correctly
- [ ] Authentication working for premium features
- [ ] Data validation in place
- [ ] Mobile responsiveness tested
- [ ] Performance under load tested

---

## 🚀 Next Steps

1. **Execute SQL scripts** to create all tables
2. **Implement API endpoints** for each feature
3. **Update frontend components** to use real data
4. **Test user flows** end-to-end
5. **Deploy to staging** for final testing
6. **Launch premium features** to users

---

**🎉 Your premium features system is now ready for full integration!**
