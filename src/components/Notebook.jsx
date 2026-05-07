import React, { useState } from 'react';
import '../css/Notebook.css';

const Notebook = () => {
  const [notebooks] = useState([
    {
      id: 1,
      title: 'Quick Notes',
      description: 'Random thoughts and ideas',
      color: '#6366f1',
      card_count: 3
    },
    {
      id: 2,
      title: 'Test Results',
      description: 'Various test outcomes and experiments',
      color: '#4ecdc4',
      card_count: 2
    },
    {
      id: 3,
      title: 'Random Stuff',
      description: 'Casual jottings and brain dumps',
      color: '#ff6b6b',
      card_count: 2
    }
  ]);

  const [selectedNotebook, setSelectedNotebook] = useState(notebooks[0]);

  const [cards] = useState([
    {
      id: 1,
      notebook_id: 1,
      title: 'Coffee Shop Idea',
      content: 'What if we opened a coffee shop that only serves coffee made with different brewing methods?',
      created_at: '2024-12-01T10:30:00Z'
    },
    {
      id: 2,
      notebook_id: 1,
      title: 'Weekend Plans',
      content: 'Saturday: Morning run, then grocery shopping. Sunday: Try that new brunch place downtown.',
      created_at: '2024-11-30T18:00:00Z'
    },
    {
      id: 3,
      notebook_id: 1,
      title: 'Random Thought',
      content: 'Why do we say "head over heels" when falling in love?',
      created_at: '2024-11-29T14:00:00Z'
    },
    {
      id: 4,
      notebook_id: 2,
      title: 'API Test Results',
      content: `Test 1: GET /users - ✅ Passed (200ms)
Test 2: POST /users - ✅ Passed (350ms)
Test 3: PUT /users/123 - ❌ Failed (500 error)
Test 4: DELETE /users/123 - ✅ Passed (150ms)

Need to fix the PUT endpoint issue.`,
      created_at: '2024-11-28T12:00:00Z'
    },
    {
      id: 5,
      notebook_id: 2,
      title: 'Load Test Results',
      content: `Simulated 100 concurrent users:
- Average response time: 450ms
- 95th percentile: 800ms
- No errors detected

Server held up well! Ready for production.`,
      created_at: '2024-11-28T13:00:00Z'
    },
    {
      id: 8,
      notebook_id: 3,
      title: 'Dream Log',
      content: 'Had a weird dream last night. I was flying but my arms were made of spaghetti.',
      created_at: '2024-12-01T07:00:00Z'
    },
    {
      id: 9,
      notebook_id: 3,
      title: 'Grocery List Brain Dump',
      content: `Things I need to remember to buy:
- Milk
- Avocados
- Dark chocolate`,
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

          {/* SIDEBAR */}
          <div className="col-md-4">

            <div className="notebooks-sidebar">
              <h3 className="sidebar-title">My Notebooks</h3>
              <div className="notebook-list">
                {notebooks.map((notebook) => (
                  <div
                    key={notebook.id}
                    className={`notebook-item ${selectedNotebook?.id === notebook.id ? 'active' : ''}`}
                    onClick={() => setSelectedNotebook(notebook)}
                  >
                    <div 
                      className="notebook-color" 
                      style={{ backgroundColor: notebook.color }}
                    />
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

          {/* MAIN */}
          <div className="col-md-8">

            <div className="cards-container">
              <div className="cards-header">
                <h2 className="notebook-name">
                  {selectedNotebook?.title || 'Select a notebook'}
                </h2>
              </div>

              <div className="cards-grid">
                {cards
                  .filter(
                    (card) =>
                      Number(card.notebook_id) ===
                      Number(selectedNotebook?.id)
                  )
                  .map((card) => (
                    <div key={card.id} className="notebook-card">
                      <div className="card-header">
                        <h3 className="card-title">{card.title}</h3>
                      </div>
                      <div className="card-body">
                        <div className="card-content" style={{ minHeight: '150px', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                          {card.content}
                        </div>
                      </div>
                      <div className="card-footer">
                        <span className="last-modified">
                          Created: {new Date(card.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}

                {cards.filter(
                  (card) =>
                    Number(card.notebook_id) ===
                    Number(selectedNotebook?.id)
                ).length === 0 && (
                  <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <h3>No cards yet</h3>
                    <p>This notebook doesn't have any cards.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
);
};

export default Notebook;