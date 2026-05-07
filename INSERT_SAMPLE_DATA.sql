-- ========================================
-- SAMPLE DATA FOR NOTEBOOK SYSTEM
-- ========================================
-- Execute these commands AFTER creating tables
-- This will populate your database with beautiful sample content

-- Insert sample notebooks (user_id = 1 for testing)
INSERT INTO user_notebooks (user_id, title, description, color) VALUES
(1, 'Daily Journal', 'My personal daily thoughts and reflections', '#6366f1'),
(1, 'Project Ideas', 'Creative ideas and project planning', '#4ecdc4'),
(1, 'Learning Notes', 'Study materials and learning progress', '#45b7d1'),
(1, 'Gratitude List', 'Things I am grateful for each day', '#96ceb4'),
(1, 'Goal Tracker', 'Long-term goals and milestones', '#ff6b6b');

-- Insert sample cards for each notebook
INSERT INTO user_notebook_cards (notebook_id, user_id, title, content, color) VALUES
-- Daily Journal cards
(1, 1, 'Morning Reflection', 'Today started with a beautiful sunrise. I feel grateful for the opportunity to make this day count. My goal is to stay present and mindful throughout the day.', '#ffffff'),
(1, 1, 'Afternoon Thoughts', 'Had an amazing lunch meeting today. The collaboration went really well and we came up with some innovative solutions. Feeling energized!', '#ffffff'),
(1, 1, 'Evening Gratitude', 'Today was productive and fulfilling. I''m grateful for my health, my family, and the ability to pursue my passions.', '#ffffff'),

-- Project Ideas cards
(2, 1, 'Mobile App Concept', 'A productivity app that combines task management with mindfulness exercises. Features: Pomodoro timer, mood tracking, and daily affirmations.', '#ffffff'),
(2, 1, 'Website Redesign', 'Complete overhaul of the company website with modern UI/UX. Focus on mobile-first design and accessibility.', '#ffffff'),
(2, 1, 'AI Integration', 'Explore ways to integrate AI into our existing products to enhance user experience and automation.', '#ffffff'),

-- Learning Notes cards
(3, 1, 'JavaScript Advanced Concepts', 'Closures, Promises, and Async/Await patterns. Practice with real-world examples and build small projects.', '#ffffff'),
(3, 1, 'React Hooks Deep Dive', 'useState, useEffect, custom hooks. Understanding the lifecycle and optimization techniques.', '#ffffff'),
(3, 1, 'Database Optimization', 'Indexing strategies, query optimization, and understanding execution plans for better performance.', '#ffffff'),

-- Gratitude List cards
(4, 1, 'Today''s Blessings', '1. Good health 2. Supportive family 3. Meaningful work 4. Beautiful weather 5. Learning opportunities', '#ffffff'),
(4, 1, 'Small Wins', 'Completed the presentation ahead of schedule, helped a colleague with their project, and made time for meditation.', '#ffffff'),

-- Goal Tracker cards
(5, 1, 'Career Goals', '1. Complete advanced certification 2. Lead a major project 3. Mentor junior developers 4. Improve public speaking', '#ffffff'),
(5, 1, 'Personal Development', '1. Read 24 books this year 2. Learn a new language 3. Exercise 4x per week 4. Practice mindfulness daily', '#ffffff');

-- ========================================
-- EXECUTION INSTRUCTIONS:
-- 1. Execute these INSERT commands AFTER creating tables
-- 2. This will create sample notebooks and cards for user_id = 1
-- 3. Test your application with this rich sample data
-- 4. Modify user_id values as needed for your testing

-- ========================================
-- EXPECTED RESULT:
-- 5 beautiful notebooks with different colors
-- 13 sample cards with meaningful content
-- Perfect for testing all CRUD operations
-- Amazing user experience from day one!

-- ========================================
-- READY TO AMAZE USERS! 🎉
