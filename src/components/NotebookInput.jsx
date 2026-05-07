import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../css/NotebookInput.css';

const NotebookInput = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('✨');
  const [isSaving, setIsSaving] = useState(false);

  const stickers = ['✨', '🌟', '💫', '⭐', '🌙', '🌈', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🌺', '🦋', '🌻', '🦊', '🐾', '🌿', '🍃', '🌸'];

  const getToken = () => localStorage.getItem('authToken');
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  });

  const API_BASE = 'https://varli.alwaysdata.net/api';

  // Fetch entries
  const fetchEntries = async () => {
    try {
      const response = await fetch(`${API_BASE}/get_notebook_entries`, {
        headers: getHeaders()
      });
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  // Save entry
  const saveEntry = async () => {
    if (!currentEntry.trim()) return;

    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE}/save_notebook_entry`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          content: currentEntry,
          sticker: selectedSticker,
          user_id: user.id
        })
      });
      const data = await response.json();
      
      if (data.success) {
        setCurrentEntry('');
        fetchEntries(); // Refresh entries
        
        // Show success feedback
        const successMessage = document.createElement('div');
        successMessage.className = 'success-toast';
        successMessage.textContent = '✨ Entry saved successfully!';
        successMessage.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #87ceeb, #6dd5ed);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          z-index: 1000;
          animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
          successMessage.style.animation = 'slideOut 0.3s ease';
          setTimeout(() => document.body.removeChild(successMessage), 300);
        }, 2000);
      }
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="notebook-input-page">
      <div className="input-header">
        <h1 className="page-title">📔 My Notebook</h1>
        <p className="page-subtitle">Write your thoughts, add stickers, and save your moments</p>
      </div>

      <div className="input-container">
        <div className="sticker-selector">
          <div className="sticker-label">Choose Sticker:</div>
          <div className="stickers-grid">
            {stickers.map(sticker => (
              <button
                key={sticker}
                className={`sticker-btn ${selectedSticker === sticker ? 'selected' : ''}`}
                onClick={() => setSelectedSticker(sticker)}
              >
                <span className="sticker-emoji">{sticker}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="entry-input-section">
          <div className="input-label">Write Your Entry:</div>
          <textarea
            className="entry-textarea"
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="Start writing your thoughts here..."
            rows={8}
          />
          
          <div className="input-actions">
            <button
              className="save-btn"
              onClick={saveEntry}
              disabled={isSaving || !currentEntry.trim()}
            >
              {isSaving ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : (
                <>
                  <span className="save-icon">💾</span>
                  Save Entry
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="recent-entries">
        <h3 className="entries-title">Recent Entries</h3>
        <div className="entries-list">
          {entries.map(entry => (
            <div key={entry.id} className="entry-item">
              <div className="entry-sticker">{entry.sticker}</div>
              <div className="entry-content">{entry.content}</div>
              <div className="entry-date">
                {new Date(entry.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotebookInput;
