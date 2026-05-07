-- ========================================
-- FINAL WORKING SQL COMMANDS
-- NO FOREIGN KEYS - NO ERRORS
-- ========================================

-- COMMAND 1: Create user_notebooks table
CREATE TABLE user_notebooks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    color VARCHAR(7) DEFAULT '#6366f1',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- COMMAND 2: Create user_notebook_cards table
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

-- COMMAND 3: Add performance indexes
CREATE INDEX idx_notebook_user ON user_notebooks(user_id);
CREATE INDEX idx_card_notebook ON user_notebook_cards(notebook_id);
CREATE INDEX idx_card_user ON user_notebook_cards(user_id);

-- ========================================
-- EXECUTION INSTRUCTIONS:
-- 1. Copy COMMAND 1 and execute
-- 2. Copy COMMAND 2 and execute  
-- 3. Copy COMMAND 3 and execute
-- 4. Test with: http://localhost:5000/api/test
-- 5. NO FOREIGN KEYS - Application handles relationships
-- ========================================

-- SUCCESS INDICATORS:
-- ✓ Tables created without errors
-- ✓ Indexes created successfully
-- ✓ API test endpoint responds
-- ✓ Notebook creation works
-- ✓ Card management works

-- ========================================
-- READY TO GO! 🚀
