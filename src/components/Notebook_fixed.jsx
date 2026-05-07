import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../css/Notebook.css';

const Notebook = () => {
  const { user } = useAuth();
  const [notebooks, setNotebooks] = useState([
    {
      id: 1,
      title: 'Quick Notes',
      description: 'Random thoughts and ideas',
      color: '#6366f1',
      card_count: 3,
      created_at: '2024-12-01T10:00:00Z'
    },
    {
      id: 2,
      title: 'Test Results',
      description: 'Various test outcomes and experiments',
      color: '#4ecdc4',
      card_count: 4,
      created_at: '2024-11-30T15:00:00Z'
    },
    {
      id: 3,
      title: 'Random Stuff',
      description: 'Casual jottings and brain dumps',
      color: '#ff6b6b',
      card_count: 2,
      created_at: '2024-11-29T20:00:00Z'
    }
  ]);
  const [selectedNotebook, setSelectedNotebook] = useState(notebooks[0]);
  const [cards, setCards] = useState([
    {
      id: 1,
      notebook_id: 1,
      title: 'Coffee Shop Idea',
      content: 'What if we opened a coffee shop that only serves coffee made with different brewing methods? Like pour-over, French press, AeroPress, cold brew... People could sample different methods and find their favorite. Might be too niche though.',
      color: '#ffffff',
      created_at: '2024-12-01T10:30:00Z',
      updated_at: '2024-12-01T11:00:00Z'
    },
    {
      id: 2,
      notebook_id: 1,
      title: 'Weekend Plans',
      content: 'Saturday: Morning run, then grocery shopping. Sunday: Try that new brunch place downtown, maybe catch a movie later. Should call Sarah about the hiking trip next month.',
      color: '#ffffff',
      created_at: '2024-11-30T18:00:00Z'
    },
    {
      id: 3,
      notebook_id: 1,
      title: 'Random Thought',
      content: 'Why do we say "head over heels" when falling in love? Shouldn\'t it be "heels over head"? That makes more sense physically. Language is weird sometimes.',
      color: '#ffffff',
      created_at: '2024-11-29T14:00:00Z'
    },
    {
      id: 4,
      notebook_id: 2,
      title: 'API Test Results',
      content: 'Test 1: GET /users - ✅ Passed (200ms)\nTest 2: POST /users - ✅ Passed (350ms)\nTest 3: PUT /users/123 - ❌ Failed (500 error)\nTest 4: DELETE /users/123 - ✅ Passed (150ms)\n\nNeed to fix the PUT endpoint issue.',
      color: '#ffffff',
      created_at: '2024-12-01T09:00:00Z'
    },
    {
      id: 5,
      notebook_id: 2,
      title: 'Database Performance Test',
      content: 'Query test with 10,000 records:\n- Simple SELECT: 0.05s\n- JOIN query: 0.23s\n- Complex aggregation: 1.2s\n\nNot bad, but aggregation could be optimized. Maybe add some indexes?',
      color: '#ffffff',
      created_at: '2024-11-30T16:00:00Z'
    },
    {
      id: 6,
      notebook_id: 2,
      title: 'User Interface Test',
      content: 'Tested new dashboard design:\n✅ Navigation works\n✅ Charts load correctly\n❌ Mobile responsiveness issues\n✅ Dark mode toggle works\n\nNeed to fix mobile layout before release.',
      color: '#ffffff',
      created_at: '2024-11-29T11:00:00Z'
    },
    {
      id: 7,
      notebook_id: 2,
      title: 'Load Test Results',
      content: 'Simulated 100 concurrent users:\n- Average response time: 450ms\n- 95th percentile: 800ms\n- No errors detected\n\nServer held up well! Ready for production.',
      color: '#ffffff',
      created_at: '2024-11-28T13:00:00Z'
    },
    {
      id: 8,
      notebook_id: 3,
      title: 'Dream Log',
      content: 'Had a weird dream last night. I was flying but my arms were made of spaghetti. Everyone was laughing but in a nice way? Then I woke up hungry. What does this even mean?',
      color: '#ffffff',
      created_at: '2024-12-01T07:00:00Z'
    },
    {
      id: 9,
      notebook_id: 3,
      title: 'Grocery List Brain Dump',
      content: 'Things I need to remember to buy:\n- Milk (almond, not regular)\n- Those weird tortilla chips I like\n- Avocados (but only the ripe ones)\n- Dark chocolate (85% or higher)\n- Maybe some kombucha?\n\nWhy is shopping so complicated?',
      color: '#ffffff',
      created_at: '2024-11-30T20:00:00Z'
    }
  ]);

  return (
    <div className="notebook-page">
      <div className="notebook-header">
        <div className="container">
          <h1 className="page-title">My Notebooks</h1>
        </div>
      </div>

      <div className="notebook-content">
        <div className="container">
          <div className="row">
            {/* Notebooks Sidebar */}
            <div className="col-md-4">
              <div className="notebooks-sidebar">
                <h3 className="sidebar-title">My Notebooks</h3>
                <div className="notebook-list">
                  {notebooks.map(notebook => (
                    <div 
                      key={notebook.id}
                      className={`notebook-item ${selectedNotebook?.id === notebook.id ? 'active' : ''}`}
                      onClick={() => setSelectedNotebook(notebook)}
                      style={{ borderLeft: `4px solid ${notebook.color}` }}
                    >
                      <div className="notebook-color" style={{ backgroundColor: notebook.color }}></div>
                      <div className="notebook-info">
                        <h4 className="notebook-title">{notebook.title}</h4>
                        <p className="notebook-description">{notebook.description}</p>
                        <span className="card-count">{notebook.card_count || 0} cards</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cards Display */}
            <div className="col-md-8">
              {selectedNotebook ? (
                <div className="cards-container">
                  <div className="cards-header">
                    <h2 className="notebook-name">{selectedNotebook.title}</h2>
                  </div>
                  
                  <div className="cards-grid">
                    {cards.filter(card => card.notebook_id === selectedNotebook.id).map(card => (
                      <div key={card.id} className="notebook-card">
                        <div className="card-header">
                          <h4 className="card-title">{card.title}</h4>
                        </div>
                        <div className="card-body">
                          <div className="card-content">{card.content}</div>
                        </div>
                        <div className="card-footer">
                          <span className="last-modified">Last modified: {card.updated_at || card.created_at}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📔</div>
                  <h3>Select a Notebook</h3>
                  <p>Choose a notebook from the sidebar to start writing and organizing your thoughts</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notebook;
