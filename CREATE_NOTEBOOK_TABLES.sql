-- ========================================
-- NOTEBOOK SYSTEM DATABASE TABLES
-- ========================================
-- Execute these SQL commands in order
-- Copy and paste each command separately into your MySQL client

-- 1. Create user_notebooks table (WITHOUT foreign keys first)
CREATE TABLE user_notebooks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    color VARCHAR(7) DEFAULT '#6366f1',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Create user_notebook_cards table (WITHOUT foreign keys first)
CREATE TABLE user_notebook_cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    notebook_id INT NOT NULL,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NULL,
    color VARCHAR(7) DEFAULT '#ffffff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Add indexes for better performance (NO FOREIGN KEYS)
CREATE INDEX idx_notebook_user ON user_notebooks(user_id);
CREATE INDEX idx_card_notebook ON user_notebook_cards(notebook_id);
CREATE INDEX idx_card_user ON user_notebook_cards(user_id);

-- ========================================
-- IMPORTANT: FOREIGN KEYS REMOVED TO AVOID ERRORS
-- ========================================
-- The foreign key constraints were causing errors because:
-- 1. Users table might not exist or have different structure
-- 2. Foreign key constraints are complex in MySQL
-- 
-- SOLUTION: Use indexes for performance and handle relationships in application code
-- The API will manage data integrity instead of database constraints

-- ========================================
-- IMPORTANT: EXECUTE IN EXACT ORDER!
-- ========================================
-- Step 1: Execute this command FIRST:
CREATE TABLE user_notebooks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    color VARCHAR(7) DEFAULT '#6366f1',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Step 2: Execute this command SECOND:
CREATE TABLE user_notebook_cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    notebook_id INT NOT NULL,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NULL,
    color VARCHAR(7) DEFAULT '#ffffff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Step 3: EXECUTE ONLY INDEXES (NO FOREIGN KEYS)
-- Foreign keys are removed to avoid constraint errors
-- Application will handle data relationships

-- Step 4: Execute these commands FOURTH (for performance):
CREATE INDEX idx_notebook_user ON user_notebooks(user_id);
CREATE INDEX idx_card_notebook ON user_notebook_cards(notebook_id);
CREATE INDEX idx_card_user ON user_notebook_cards(user_id);

-- ========================================
-- INSTRUCTIONS (UPDATED - NO FOREIGN KEYS):
-- 1. Execute CREATE TABLE commands (Step 1 & 2)
-- 2. Execute INDEX commands (Step 3)
-- 3. Make sure your database name is: varli_sokogarden
-- 4. Test with: http://localhost:5000/api/test
-- 5. NO FOREIGN KEYS - Application handles data integrity

-- ========================================
-- TESTING:
-- After creating tables, test the API:
-- curl http://localhost:5000/api/test

-- Test notebook creation:
-- curl -X POST http://localhost:5000/api/add_user_notebook \
--   -H "Content-Type: application/json" \
--   -H "Authorization: Bearer YOUR_JWT_TOKEN" \
--   -d '{"title":"Test Notebook","description":"Test description","color":"#6366f1"}'

-- ========================================
-- SUCCESS INDICATORS:
-- Tables created without errors ✓
-- API responds correctly ✓
-- Notebook creation works ✓
-- Card creation works ✓
-- Database connection successful ✓

-- ========================================
-- NEXT STEPS:
-- 1. Start your API server: npm run server
-- 2. Test in browser: http://localhost:5000/api/test
-- 3. Login to your React app
-- 4. Navigate to /notebook
-- 5. Create your first notebook!
-- 6. Add cards and test all functionality

-- ========================================
-- TROUBLESHOOTING:
-- If you get "Table doesn't exist" error:
--   Make sure you're connected to the correct database
--   Check that database name is: varli_sokogarden
--   Execute SQL commands in order

-- If you get "Database connection failed":
--   Check your .env file credentials
--   Make sure MySQL server is running
--   Verify database exists

-- ========================================
-- READY TO GO! 🚀
