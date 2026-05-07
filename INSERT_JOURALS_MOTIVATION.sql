-- ========================================
-- INSERT JOURNALS AND MOTIVATION CARDS
-- ========================================
-- Correct column names based on actual table structure

-- ========================================
-- USER_JOURNALS TABLE
-- ========================================
-- Table structure: id, user_id, title, content, mood, tags, is_private, created_at, updated_at
INSERT INTO user_journals (id, user_id, title, content, mood, tags, is_private, created_at, updated_at) VALUES
(1, 1, 'Project Milestone Achieved', 'Today we successfully completed the first phase of our new authentication system. The team worked really well together and we managed to implement all the core features ahead of schedule. Feeling proud of what we accomplished!', 'excited', 'project,team,success', TRUE, '2024-12-01T18:00:00Z', '2024-12-01T18:00:00Z'),
(2, 1, 'Learning New Technologies', 'Spent the day learning about microservices architecture. It\'s fascinating how distributed systems work. Still have a lot to learn but I\'m making good progress. The more I understand, the more I realize how much there is to know.', 'motivated', 'learning,technology,growth', TRUE, '2024-11-30T20:00:00Z', '2024-11-30T20:00:00Z'),
(3, 1, 'Team Building Success', 'Had a great team building session today. We did some problem-solving activities and it really helped improve our communication. The team feels more connected and I think we\'ll work better together going forward.', 'happy', 'team,communication,success', TRUE, '2024-11-29T17:00:00Z', '2024-11-29T17:00:00Z'),
(4, 1, 'Challenges and Growth', 'Faced some technical challenges today with the database optimization. It was frustrating at first, but I learned a lot about query optimization and indexing. Sometimes the hardest problems teach us the most valuable lessons.', 'reflective', 'challenges,learning,database', TRUE, '2024-11-28T19:00:00Z', '2024-11-28T19:00:00Z'),
(5, 1, 'Client Meeting Success', 'Had a productive meeting with our biggest client today. They were very happy with our progress and gave us some great feedback for the next phase. This could lead to more opportunities for our team.', 'accomplished', 'client,meeting,success', TRUE, '2024-11-27T16:00:00Z', '2024-11-27T16:00:00Z');

-- ========================================
-- MOTIVATION_CARDS TABLE
-- ========================================
-- Table structure: id, title, content, category, image_url, author, is_premium, is_active, created_at, updated_at
INSERT INTO motivation_cards (id, title, content, category, image_url, author, is_premium, is_active, created_at, updated_at) VALUES
(1, 'Daily Inspiration', 'The only way to do great work is to love what you do. - Steve Jobs', 'motivation', NULL, 'Steve Jobs', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(2, 'Stay Positive', 'Every day is a new beginning. Take a deep breath and start again.', 'motivation', NULL, 'Unknown', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(3, 'Dream Big', 'The future belongs to those who believe in the beauty of their dreams.', 'motivation', NULL, 'Eleanor Roosevelt', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(4, 'Keep Going', 'Success is not final, failure is not fatal: it is the courage to continue that counts.', 'motivation', NULL, 'Winston Churchill', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(5, 'Be Yourself', 'Authenticity is the daily practice of letting go of who we think we are supposed to be.', 'happiness', NULL, 'Brené Brown', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(6, 'Embrace Change', 'Change is the only constant in life. Embrace it and grow through every challenge.', 'motivation', NULL, 'Heraclitus', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(7, 'Trust the Journey', 'Every step forward is progress, even when you can\'t see the destination. Trust the process.', 'motivation', NULL, 'Unknown', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(8, 'Find Joy', 'Joy is found not in the destination, but in the journey itself. Enjoy every moment.', 'happiness', NULL, 'Unknown', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(9, 'Believe in Yourself', 'You are braver than you believe, stronger than you seem, and smarter than you think.', 'motivation', NULL, 'A.A. Milne', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(10, 'Never Give Up', 'The difference between a successful person and others is not lack of strength or knowledge, but rather a lack of will.', 'motivation', NULL, 'Vince Lombardi', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(11, 'Stay Focused', 'Focus on being productive instead of busy.', 'productivity', NULL, 'Tim Ferriss', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(12, 'Take Action', 'The way to get started is to quit talking and begin doing.', 'productivity', NULL, 'Walt Disney', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(13, 'Be Grateful', 'Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow.', 'motivation', NULL, 'Melody Beattie', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(14, 'Stay Strong', 'You never know how strong you are until being strong is your only choice.', 'motivation', NULL, 'Bob Marley', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(15, 'Keep Learning', 'The beautiful thing about learning is nobody can take it away from you.', 'motivation', NULL, 'B.B. King', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(16, 'Be Patient', 'Patience is not the ability to wait, but the ability to keep a good attitude while waiting.', 'discipline', NULL, 'Joyce Meyer', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(17, 'Stay Humble', 'Stay humble, work hard, be kind.', 'motivation', NULL, 'Unknown', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(18, 'Think Big', 'If you can dream it, you can do it.', 'goals', NULL, 'Walt Disney', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(19, 'Be Brave', 'Bravery is being the only one who knows you\'re afraid.', 'motivation', NULL, 'Franklin P. Jones', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(20, 'Stay Curious', 'The important thing is not to stop questioning.', 'motivation', NULL, 'Albert Einstein', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(21, 'Be Kind', 'In a world where you can be anything, be kind.', 'happiness', NULL, 'Unknown', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(22, 'Keep Moving', 'Life is like riding a bicycle. To keep your balance, you must keep moving.', 'motivation', NULL, 'Albert Einstein', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(23, 'Be Present', 'The present moment is filled with joy and happiness. If you are attentive, you will see it.', 'happiness', NULL, 'Deepak Chopra', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(24, 'Stay Positive', 'Positive thinking will let you do everything better than negative thinking will.', 'motivation', NULL, 'Zig Ziglar', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(25, 'Be Creative', 'Creativity is intelligence having fun.', 'motivation', NULL, 'Albert Einstein', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(26, 'Keep Growing', 'What we think, we become.', 'goals', NULL, 'Buddha', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(27, 'Be Resilient', 'The human capacity for burden is like bamboo – far more flexible than you\'d ever believe.', 'motivation', NULL, 'Jodi Picoult', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(28, 'Stay True', 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.', 'motivation', NULL, 'Ralph Waldo Emerson', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(29, 'Be Mindful', 'The mind is everything. What you think you become.', 'motivation', NULL, 'Buddha', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z'),
(30, 'Keep Believing', 'Believe you can and you\'re halfway there.', 'motivation', NULL, 'Theodore Roosevelt', TRUE, TRUE, '2024-12-01T00:00:00Z', '2024-12-01T00:00:00Z');

-- ========================================
-- USER_FAVORITE_CARDS TABLE (if exists)
-- ========================================
-- Table structure: id, user_id, card_id, created_at
INSERT INTO user_favorite_cards (id, user_id, card_id, created_at) VALUES
(1, 1, 1, '2024-12-01T12:00:00Z'),
(2, 1, 3, '2024-12-01T12:30:00Z'),
(3, 1, 9, '2024-12-01T13:00:00Z');

-- ========================================
-- VERIFICATION QUERIES
-- ========================================
-- Check data was inserted successfully
SELECT COUNT(*) as total_journals FROM user_journals;
SELECT COUNT(*) as total_motivation_cards FROM motivation_cards;
SELECT COUNT(*) as total_favorite_cards FROM user_favorite_cards;

-- ========================================
-- READY TO USE! 🎉
-- ========================================
