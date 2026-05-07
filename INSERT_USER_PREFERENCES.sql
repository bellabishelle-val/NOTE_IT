-- ========================================
-- INSERT USER PREFERENCES
-- ========================================
-- Table structure: id, user_id, theme, dashboard_layout, notification_preferences, created_at, updated_at

INSERT INTO user_preferences (id, user_id, theme, dashboard_layout, notification_preferences, created_at, updated_at) VALUES
(1, 1, 'dark', 'grid', '{"email_notifications": true, "push_notifications": true, "daily_motivation": true, "task_reminders": true, "achievement_badges": true}', '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(2, 2, 'light', 'list', '{"email_notifications": false, "push_notifications": true, "daily_motivation": false, "task_reminders": true, "achievement_badges": false}', '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(3, 3, 'dark', 'grid', '{"email_notifications": true, "push_notifications": false, "daily_motivation": true, "task_reminders": false, "achievement_badges": true}', '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z');

-- ========================================
-- ADDITIONAL USER PREFERENCES VARIATIONS
-- ========================================
-- More diverse preference combinations for testing
INSERT INTO user_preferences (id, user_id, theme, dashboard_layout, notification_preferences, created_at, updated_at) VALUES
(4, 1, 'light', 'cards', '{"email_notifications": true, "push_notifications": true, "daily_motivation": true, "task_reminders": true, "achievement_badges": true}', '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(5, 2, 'dark', 'list', '{"email_notifications": false, "push_notifications": false, "daily_motivation": false, "task_reminders": false, "achievement_badges": false}', '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(6, 3, 'auto', 'grid', '{"email_notifications": true, "push_notifications": true, "daily_motivation": true, "task_reminders": true, "achievement_badges": true}', '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z');

-- ========================================
-- VERIFICATION QUERY
-- ========================================
-- Check if preferences were inserted successfully
SELECT COUNT(*) as total_user_preferences FROM user_preferences;

-- ========================================
-- PREFERENCE OPTIONS EXPLAINED:
-- ========================================
-- theme: 'light', 'dark', 'auto'
-- dashboard_layout: 'grid', 'list', 'cards'
-- notification_preferences: JSON object with various notification settings

-- ========================================
-- READY TO USE! 🎉
-- ========================================
