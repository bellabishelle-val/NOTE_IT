-- ========================================
-- INSERT ALL SAMPLE DATA
-- ========================================
-- Execute these INSERT statements to populate your database with sample data

-- ========================================
-- USERS TABLE
-- ========================================
INSERT INTO users (id, username, email, password, created_at) VALUES
(1, 'john_doe', 'john@example.com', 'hashed_password_123', '2024-01-01 00:00:00'),
(2, 'jane_smith', 'jane@example.com', 'hashed_password_456', '2024-01-02 00:00:00'),
(3, 'mike_wilson', 'mike@example.com', 'hashed_password_789', '2024-01-03 00:00:00');

-- ========================================
-- USER_TASKS TABLE
-- ========================================
INSERT INTO user_tasks (id, user_id, title, description, priority, status, due_date, created_at) VALUES
(1, 1, 'Complete project documentation', 'Write comprehensive documentation for new feature', 'high', 'in-progress', '2024-12-15', '2024-12-01T10:00:00Z'),
(2, 1, 'Review pull requests', 'Review and merge pending pull requests', 'medium', 'pending', '2024-12-10', '2024-12-01T09:00:00Z'),
(3, 1, 'Team meeting preparation', 'Prepare slides for weekly team sync', 'low', 'completed', '2024-12-08', '2024-12-01T08:00:00Z'),
(4, 1, 'Update dependencies', 'Update all npm packages to latest versions', 'medium', 'in-progress', '2024-12-12', '2024-12-01T07:00:00Z'),
(5, 1, 'Client presentation', 'Present quarterly results to stakeholders', 'high', 'pending', '2024-12-20', '2024-12-01T06:00:00Z'),
(6, 1, 'Code review for feature branch', 'Review new authentication implementation', 'high', 'pending', '2024-12-11', '2024-12-01T05:00:00Z'),
(7, 1, 'Database optimization', 'Optimize slow queries and add indexes', 'medium', 'in-progress', '2024-12-18', '2024-12-01T04:00:00Z'),
(8, 1, 'User testing session', 'Conduct usability testing with beta users', 'low', 'completed', '2024-12-05', '2024-12-01T03:00:00Z');

-- ========================================
-- USER_JOURNALS TABLE
-- ========================================
INSERT INTO user_journals (id, user_id, title, content, mood, date, created_at) VALUES
(1, 1, 'Project Milestone Achieved', 'Today we successfully completed the first phase of our new authentication system. The team worked really well together and we managed to implement all the core features ahead of schedule. Feeling proud of what we accomplished!', 'excited', '2024-12-01', '2024-12-01T18:00:00Z'),
(2, 1, 'Learning New Technologies', 'Spent the day learning about microservices architecture. It\'s fascinating how distributed systems work. Still have a lot to learn but I\'m making good progress. The more I understand, the more I realize how much there is to know.', 'motivated', '2024-11-30', '2024-11-30T20:00:00Z'),
(3, 1, 'Team Building Success', 'Had a great team building session today. We did some problem-solving activities and it really helped improve our communication. The team feels more connected and I think we\'ll work better together going forward.', 'Happy', '2024-11-29', '2024-11-29T17:00:00Z'),
(4, 1, 'Challenges and Growth', 'Faced some technical challenges today with database optimization. It was frustrating at first, but I learned a lot about query optimization and indexing. Sometimes the hardest problems teach us the most valuable lessons.', 'reflective', '2024-11-28', '2024-11-28T19:00:00Z'),
(5, 1, 'Client Meeting Success', 'Had a productive meeting with our biggest client today. They were very happy with our progress and gave us some great feedback for the next phase. This could lead to more opportunities for our team.', 'accomplished', '2024-11-27', '2024-11-27T16:00:00Z');

-- ========================================
-- USER_GOALS TABLE
-- ========================================
INSERT INTO user_goals (id, user_id, title, description, target_date, progress, status, category, created_at) VALUES
(1, 1, 'Launch new product feature', 'Successfully launch new authentication system', '2024-12-31', 75, 'in-progress', 'product', '2024-11-01T00:00:00Z'),
(2, 1, 'Complete certification', 'Obtain AWS Solutions Architect certification', '2025-01-15', 45, 'in-progress', 'career', '2024-10-15T00:00:00Z'),
(3, 1, 'Improve team productivity', 'Implement agile methodologies across all teams', '2024-12-20', 60, 'in-progress', 'management', '2024-11-01T00:00:00Z'),
(4, 1, 'Reduce technical debt', 'Refactor legacy code and improve code quality', '2025-02-28', 30, 'in-progress', 'technical', '2024-11-01T00:00:00Z'),
(5, 1, 'Expand user base', 'Reach 10,000 active users by Q1 2025', '2025-03-31', 55, 'in-progress', 'business', '2024-11-01T00:00:00Z'),
(6, 1, 'Master new programming language', 'Become proficient in Rust programming', '2025-01-31', 25, 'in-progress', 'personal', '2024-11-01T00:00:00Z');

-- ========================================
-- USER_NOTEBOOKS TABLE
-- ========================================
INSERT INTO user_notebooks (id, user_id, title, description, color, created_at) VALUES
(1, 1, 'Quick Notes', 'Random thoughts and ideas', '#6366f1', '2024-12-01T10:00:00Z'),
(2, 1, 'Test Results', 'Various test outcomes and experiments', '#4ecdc4', '2024-11-30T15:00:00Z'),
(3, 1, 'Random Stuff', 'Casual jottings and brain dumps', '#ff6b6b', '2024-11-29T20:00:00Z');

-- ========================================
-- USER_NOTEBOOK_CARDS TABLE
-- ========================================
INSERT INTO user_notebook_cards (id, notebook_id, user_id, title, content, color, created_at, updated_at) VALUES
(1, 1, 1, 'Coffee Shop Idea', 'What if we opened a coffee shop that only serves coffee made with different brewing methods?', '#ffffff', '2024-12-01T10:30:00Z', '2024-12-01T11:00:00Z'),
(2, 1, 1, 'Weekend Plans', 'Saturday: Morning run, then grocery shopping. Sunday: Try that new brunch place downtown.', '#ffffff', '2024-11-30T18:00:00Z', '2024-11-30T18:00:00Z'),
(3, 1, 1, 'Random Thought', 'Why do we say "head over heels" when falling in love?', '#ffffff', '2024-11-29T14:00:00Z', '2024-11-29T14:00:00Z'),
(4, 2, 2, 'API Test Results', 'Test 1: GET /users - ✅ Passed (200ms)\nTest 2: POST /users - ✅ Passed (350ms)\nTest 3: PUT /users/123 - ❌ Failed (500 error)\nTest 4: DELETE /users/123 - ✅ Passed (150ms)\n\nNeed to fix the PUT endpoint issue.', '#ffffff', '2024-11-28T12:00:00Z', '2024-11-28T12:00:00Z'),
(5, 2, 2, 'Load Test Results', 'Simulated 100 concurrent users:\n- Average response time: 450ms\n- 95th percentile: 800ms\n- No errors detected\n\nServer held up well! Ready for production.', '#ffffff', '2024-11-28T13:00:00Z', '2024-11-28T13:00:00Z'),
(6, 2, 2, 'Dream Log', 'Had a weird dream last night. I was flying but my arms were made of spaghetti.', '#ffffff', '2024-12-01T07:00:00Z', '2024-12-01T07:00:00Z'),
(7, 2, 2, 'Grocery List Brain Dump', 'Things I need to remember to buy:\n- Milk\n- Avocados\n- Dark chocolate', '#ffffff', '2024-11-30T20:00:00Z', '2024-11-30T20:00:00Z');

-- ========================================
-- FOOTER_MESSAGES TABLE
-- ========================================
INSERT INTO footer_messages (id, user_id, message, created_at) VALUES
(1, 1, 'Love this app! The notebook feature is amazing.', '2024-12-01T09:00:00Z'),
(2, 1, 'Great work on the dashboard design!', '2024-12-01T10:30:00Z'),
(3, 2, 'The motivation cards really help me stay positive throughout the day.', '2024-12-01T14:00:00Z'),
(4, 1, 'Would love to see more themes available!', '2024-12-01T16:00:00Z'),
(5, 3, 'This app has transformed how I organize my thoughts.', '2024-12-01T18:00:00Z');

-- ========================================
-- PRODUCTS TABLE (if you have an e-commerce section)
-- ========================================
INSERT INTO products (id, name, description, price, image_url, category, created_at) VALUES
(1, 'Premium Notebook', 'Access all premium features including smart to-do lists, digital journal, motivation cards, goal tracker, personal dashboard, and custom themes.', 9.99, '/images/premium-notebook.jpg', 'digital', '2024-01-01T00:00:00Z'),
(2, 'Lifetime Access', 'One-time payment for lifetime access to all premium features. No recurring charges, unlimited access forever.', 99.99, '/images/lifetime-access.jpg', 'digital', '2024-01-01T00:00:00Z'),
(3, 'Basic Plan', 'Free access to basic notebook features with limited storage.', 0.00, '/images/basic-plan.jpg', 'digital', '2024-01-01T00:00:00Z');

-- ========================================
-- WISHLIST TABLE
-- ========================================
INSERT INTO wishlist (id, user_id, product_id, created_at) VALUES
(1, 1, 1, '2024-12-01T00:00:00Z'),
(2, 1, 2, '2024-12-01T00:00:00Z'),
(3, 1, 3, '2024-12-01T00:00:00Z');

-- ========================================
-- CART TABLE
-- ========================================
INSERT INTO cart (id, user_id, product_id, quantity, created_at) VALUES
(1, 1, 1, '2024-12-01T00:00:00Z'),
(2, 1, 2, '2024-12-01T00:00:00Z');

-- ========================================
-- VERIFICATION QUERIES
-- ========================================
-- Check data was inserted successfully
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_tasks FROM user_tasks;
SELECT COUNT(*) as total_journals FROM user_journals;
SELECT COUNT(*) as total_goals FROM user_goals;
SELECT COUNT(*) as total_notebooks FROM notebooks;
SELECT COUNT(*) as total_cards FROM notebook_cards;
SELECT COUNT(*) as total_footer_messages FROM footer_messages;

-- ========================================
-- READY TO USE! 🎉
-- ========================================
