-- ========================================
-- CREATE FOOTER MESSAGES TABLE
-- ========================================
-- Execute this SQL command to create the footer_messages table

CREATE TABLE footer_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_messages (user_id)
);

-- Add foreign key constraint (after users table exists)
ALTER TABLE footer_messages 
ADD CONSTRAINT fk_message_user 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- ========================================
-- VERIFICATION
-- ========================================
-- Check if table was created successfully
DESCRIBE footer_messages;
