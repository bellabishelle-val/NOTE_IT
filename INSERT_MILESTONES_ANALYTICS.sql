-- ========================================
-- INSERT GOAL MILESTONES AND USER ANALYTICS
-- ========================================
-- Based on actual table structures from DATABASE_SETUP_GUIDE.md

-- ========================================
-- GOAL_MILESTONES TABLE
-- ========================================
-- Table structure: id, goal_id, title, description, target_progress, is_completed, completed_at, created_at
INSERT INTO goal_milestones (id, goal_id, title, description, target_progress, is_completed, completed_at, created_at) VALUES
(1, 1, 'Authentication System Design', 'Complete user authentication flow with JWT tokens', 25, TRUE, '2024-11-15T14:00:00Z', '2024-11-01T00:00:00Z'),
(2, 1, 'Database Schema Setup', 'Design and implement database tables for user data', 50, TRUE, '2024-11-30T16:00:00Z', '2024-11-01T00:00:00Z'),
(3, 1, 'Frontend Integration', 'Connect React frontend to authentication API', 75, FALSE, NULL, '2024-12-01T00:00:00Z'),
(4, 2, 'Study Materials Collection', 'Gather all AWS certification study resources', 30, TRUE, '2024-11-20T10:00:00Z', '2024-10-15T00:00:00Z'),
(5, 2, 'Practice Exams', 'Complete practice tests and mock exams', 60, FALSE, NULL, '2024-11-01T00:00:00Z'),
(6, 3, 'Team Training Sessions', 'Conduct agile methodology workshops', 40, TRUE, '2024-11-25T15:00:00Z', '2024-11-01T00:00:00Z'),
(7, 3, 'Process Documentation', 'Document new workflow processes', 80, FALSE, NULL, '2024-12-01T00:00:00Z'),
(8, 4, 'Code Review Process', 'Establish regular code review schedule', 20, TRUE, '2024-11-10T17:00:00Z', '2024-11-01T00:00:00Z'),
(9, 4, 'Refactoring Plan', 'Identify and prioritize technical debt items', 50, FALSE, NULL, '2024-12-01T00:00:00Z'),
(10, 5, 'Product Development', 'Build MVP version of Rust application', 15, FALSE, NULL, '2024-12-01T00:00:00Z'),
(11, 5, 'Learning Resources', 'Collect Rust programming tutorials and books', 25, TRUE, '2024-11-28T12:00:00Z', '2024-11-01T00:00:00Z'),
(12, 6, 'User Research', 'Conduct user surveys and market analysis', 30, TRUE, '2024-11-18T14:00:00Z', '2024-11-01T00:00:00Z'),
(13, 6, 'Marketing Campaign', 'Launch initial marketing for user acquisition', 60, FALSE, NULL, '2024-12-01T00:00:00Z');

-- ========================================
-- USER_ANALYTICS TABLE
-- ========================================
-- Table structure: id, user_id, feature_used, action_type, timestamp, metadata
INSERT INTO user_analytics (id, user_id, feature_used, action_type, timestamp, metadata) VALUES
-- User 1 Analytics
(1, 1, 'notebook', 'create', '2024-12-01T09:00:00Z', '{"notebook_id": 1, "title": "Quick Notes"}'),
(2, 1, 'notebook_card', 'create', '2024-12-01T09:30:00Z', '{"notebook_id": 1, "card_title": "Coffee Shop Idea"}'),
(3, 1, 'journal', 'create', '2024-12-01T10:00:00Z', '{"journal_title": "Project Milestone Achieved", "mood": "excited"}'),
(4, 1, 'task', 'create', '2024-12-01T10:30:00Z', '{"task_title": "Complete project documentation", "priority": "high"}'),
(5, 1, 'goal', 'create', '2024-12-01T11:00:00Z', '{"goal_title": "Launch new product feature", "category": "product"}'),
(6, 1, 'motivation_card', 'view', '2024-12-01T11:30:00Z', '{"card_id": 1, "title": "Daily Inspiration"}'),
(7, 1, 'motivation_card', 'favorite', '2024-12-01T11:45:00Z', '{"card_id": 3, "title": "Dream Big"}'),
(8, 1, 'dashboard', 'view', '2024-12-01T12:00:00Z', '{"section": "overview", "time_spent": "5 minutes"}'),
(9, 1, 'premium', 'view', '2024-12-01T12:30:00Z', '{"page": "premium_benefits", "intent": "upgrade"}'),
(10, 1, 'footer_message', 'create', '2024-12-01T13:00:00Z', '{"message_length": 45, "source": "dashboard"}'),

-- User 2 Analytics
(11, 2, 'notebook', 'create', '2024-12-01T09:15:00Z', '{"notebook_id": 2, "title": "Test Results"}'),
(12, 2, 'notebook_card', 'create', '2024-12-01T09:45:00Z', '{"notebook_id": 2, "card_title": "API Test Results"}'),
(13, 2, 'journal', 'create', '2024-12-01T10:15:00Z', '{"journal_title": "Learning New Technologies", "mood": "motivated"}'),
(14, 2, 'task', 'complete', '2024-12-01T10:45:00Z', '{"task_title": "Review pull requests", "priority": "medium"}'),
(15, 2, 'goal', 'update', '2024-12-01T11:15:00Z', '{"goal_title": "Complete certification", "progress_change": "45 to 50"}'),
(16, 2, 'motivation_card', 'share', '2024-12-01T11:45:00Z', '{"card_id": 2, "title": "Stay Positive", "method": "clipboard"}'),
(17, 2, 'dashboard', 'view', '2024-12-01T12:15:00Z', '{"section": "tasks", "time_spent": "8 minutes"}'),

-- User 3 Analytics
(18, 3, 'notebook', 'create', '2024-12-01T09:30:00Z', '{"notebook_id": 3, "title": "Random Stuff"}'),
(19, 3, 'notebook_card', 'create', '2024-12-01T10:00:00Z', '{"notebook_id": 3, "card_title": "Dream Log"}'),
(20, 3, 'journal', 'create', '2024-12-01T10:30:00Z', '{"journal_title": "Team Building Success", "mood": "happy"}'),
(21, 3, 'task', 'create', '2024-12-01T11:00:00Z', '{"task_title": "Client presentation", "priority": "high"}'),
(22, 3, 'goal', 'create', '2024-12-01T11:30:00Z', '{"goal_title": "Improve team productivity", "category": "management"}'),
(23, 3, 'motivation_card', 'view', '2024-12-01T12:00:00Z', '{"card_id": 9, "title": "Believe in Yourself"}'),
(24, 3, 'footer_message', 'create', '2024-12-01T13:30:00Z', '{"message_length": 67, "source": "notebook_page"}'),
(25, 3, 'premium', 'view', '2024-12-01T14:00:00Z', '{"page": "premium_benefits", "intent": "browse"}');

-- ========================================
-- ADDITIONAL ANALYTICS EVENTS
-- ========================================
-- More diverse analytics events for comprehensive tracking
INSERT INTO user_analytics (id, user_id, feature_used, action_type, timestamp, metadata) VALUES
(26, 1, 'notebook', 'view', '2024-12-01T14:30:00Z', '{"notebook_id": 2, "duration": "10 minutes"}'),
(27, 1, 'task', 'update', '2024-12-01T15:00:00Z', '{"task_id": 1, "status_change": "in-progress to completed"}'),
(28, 1, 'journal', 'update', '2024-12-01T15:30:00Z', '{"journal_id": 1, "content_updated": true}'),
(29, 1, 'goal', 'view', '2024-12-01T16:00:00Z', '{"goal_id": 1, "current_progress": 75}'),
(30, 1, 'wishlist', 'add', '2024-12-01T16:30:00Z', '{"product_id": 1, "product_name": "Premium Notebook"}'),
(31, 1, 'cart', 'add', '2024-12-01T17:00:00Z', '{"product_id": 2, "product_name": "Lifetime Access"}'),
(32, 1, 'user_profile', 'update', '2024-12-01T17:30:00Z', '{"field_updated": "theme", "old_value": "light", "new_value": "dark"}'),
(33, 1, 'settings', 'view', '2024-12-01T18:00:00Z', '{"section": "notifications", "time_spent": "5 minutes"}'),
(34, 1, 'dashboard', 'view', '2024-12-01T18:30:00Z', '{"section": "journals", "time_spent": "12 minutes"}');

-- ========================================
-- VERIFICATION QUERIES
-- ========================================
-- Check if data was inserted successfully
SELECT COUNT(*) as total_milestones FROM goal_milestones;
SELECT COUNT(*) as total_analytics FROM user_analytics;
SELECT COUNT(*) as completed_milestones FROM goal_milestones WHERE is_completed = TRUE;

-- Sample analytics summary query
SELECT 
    user_id,
    feature_used,
    COUNT(*) as usage_count,
    MAX(timestamp) as last_used
FROM user_analytics 
GROUP BY user_id, feature_used
ORDER BY usage_count DESC;

-- ========================================
-- READY TO USE! 🎉
-- ========================================
