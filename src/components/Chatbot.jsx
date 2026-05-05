import React, { useState, useRef, useEffect } from 'react';
import '../css/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your NOTE_IT assistant. I can help you with stationery, study tips, drawing, reading, organization, and much more! What would you like to know?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { text: inputMessage, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    const botResponse = generateBotResponse(inputMessage);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 500);

    setInputMessage('');
  };

  const generateBotResponse = (message) => {
    const lowerMessage = message.toLowerCase().trim();
    
    // GREETINGS
    if (lowerMessage.match(/^(hello|hi|hey|greetings|good morning|good afternoon|good evening|yo|what's up|sup)/)) {
      return getRandomResponse([
        "Hello! Welcome to NOTE_IT! How can I assist you with your stationery and creativity needs today?",
        "Hi there! I'm here to help with all things stationery, study, and creativity. What can I do for you?",
        "Greetings! Your personal NOTE_IT assistant is ready to help. What's on your mind?",
        "Hey! I'm excited to help you with notebooks, pens, studying, or drawing. What would you like to know?"
      ]);
    }
    
    // FAREWELLS
    if (lowerMessage.match(/^(bye|goodbye|see you|later|cya|farewell|take care)/)) {
      return getRandomResponse([
        "Goodbye! Stay creative and keep learning with NOTE_IT! 🌟",
        "See you later! Don't forget to explore our amazing stationery collection!",
        "Take care! Keep those creative ideas flowing! ✨",
        "Farewell! Remember: every great idea starts with a good pen and paper! 📝"
      ]);
    }
    
    // THANKS
    if (lowerMessage.match(/^(thanks|thank you|thx|appreciate|grateful)/)) {
      return getRandomResponse([
        "You're welcome! Keep up the great work with your creative projects!",
        "My pleasure! Helping you with stationery and creativity is what I do best!",
          "No problem! I'm always here to help with your note-taking and artistic needs!",
        "Happy to help! Remember, the right tools make all the difference! 🎨"
      ]);
    }

    // BOOKS & READING
    if (lowerMessage.match(/(book|books|reading|read|novel|novels|literature|story|stories)/)) {
      if (lowerMessage.match(/(recommend|suggestion|what should|which book)/)) {
        return getRandomResponse([
          "For stationery lovers, I recommend 'The War of Art' by Steven Pressfield - it's perfect for overcoming creative blocks! For study habits, try 'Deep Work' by Cal Newport.",
          "If you love notebooks and journaling, 'The Artist's Way' by Julia Cameron is fantastic! For productivity, 'Atomic Habits' by James Clear works wonders.",
          "Stationery enthusiasts often enjoy 'Steal Like an Artist' by Austin Kleon - it's great for creative inspiration! For organization, try 'Getting Things Done' by David Allen."
        ]);
      }
      if (lowerMessage.match(/(genre|type|kind)/)) {
        return "Choose a genre that excites you! For stationery lovers, creative non-fiction about art or design can be inspiring. If you're studying, academic books in your field help. Reading daily strengthens vocabulary and thinking - just like using quality stationery strengthens your work!";
      }
      return getRandomResponse([
        "Reading is wonderful! Just like choosing the right notebook, finding the right book makes all the difference. What type of books interest you?",
        "Books are like portable notebooks filled with other people's thoughts! Whether you prefer fiction, non-fiction, or educational reads, there's something perfect for you.",
        "I love books almost as much as I love stationery! Reading daily improves vocabulary and thinking skills. What kind of topics interest you most?"
      ]);
    }

    // PENS & WRITING TOOLS
    if (lowerMessage.match(/(pen|pens|writing tool|writing tools|ballpoint|gel pen|fountain pen)/)) {
      if (lowerMessage.match(/(best|which|recommend|choose)/)) {
        return getRandomResponse([
          "For everyday note-taking, gel pens offer smooth writing with vibrant ink. Ballpoint pens are reliable and long-lasting. For beautiful handwriting, fountain pens provide elegance and control. What's your primary use?",
          "The best pen depends on your needs! Gel pens for smooth writing, ballpoints for reliability, fountain pens for elegance, and rollerballs for the smoothest experience. Are you writing notes, journaling, or creating art?",
          "For students, I recommend gel pens - they're smooth and come in many colors. For professionals, fountain pens make a statement. For everyday use, quality ballpoints never fail. What's your style?"
        ]);
      }
      return getRandomResponse([
        "Pens are essential stationery! From ballpoints to fountain pens, each has unique qualities. Gel pens write smoothly, ballpoints are reliable, and fountain pens offer elegance. What would you like to know about pens?",
        "The right pen can transform your writing experience! Whether you prefer the smooth flow of gel pens or the classic feel of fountain pens, there's a perfect pen for everyone. What type of writing do you do most?"
      ]);
    }

    // NOTEBOOKS & PAPER
    if (lowerMessage.match(/(notebook|notebooks|paper|journal|planner|organizer)/)) {
      if (lowerMessage.match(/(which|what kind|recommend|best)/)) {
        return getRandomResponse([
          "For writing and notes, ruled notebooks keep text aligned. For math and technical work, grid notebooks are perfect. For drawing and creativity, plain or sketch notebooks give you freedom. What will you use it for?",
          "Choose based on your needs! Ruled for writing, grid for diagrams, plain for art. Consider paper weight too - heavier paper (80gsm+) prevents bleed-through with most pens. What's your main use?",
          "For journaling, I love high-quality paper notebooks that handle fountain pens well. For students, subject-specific notebooks help organization. For creatives, sketchbooks with thick paper are ideal. What's your priority?"
        ]);
      }
      return getRandomResponse([
        "Notebooks are where ideas come to life! From simple spiral notebooks to elegant leather journals, each serves a purpose. What type of notebook are you looking for?",
        "The perfect notebook feels like a friend - always there when you need to capture an idea. Whether you prefer lined, dotted, grid, or plain pages, there's one that's perfect for you!"
      ]);
    }

    // STUDY & PRODUCTIVITY
    if (lowerMessage.match(/(study|studying|learn|learning|focus|concentrate|productivity|time management)/)) {
      if (lowerMessage.match(/(how to|tips|advice|improve)/)) {
        return getRandomResponse([
          "For effective studying, use the Pomodoro Technique: 25 minutes focused work, 5 minutes break. Keep your study space organized with the right stationery - highlighters, sticky notes, and quality notebooks make a huge difference!",
          "Create a dedicated study space with good lighting and all your stationery within reach. Use color-coded notes and mind maps in your notebook. Break large tasks into smaller, manageable chunks. What subject are you studying?",
          "Active learning works best! Take handwritten notes (better retention than typing), use flashcards for review, and teach concepts to others. Keep a study journal to track progress. What specific study challenge are you facing?"
        ]);
      }
      return getRandomResponse([
        "Studying effectively starts with the right tools and mindset! Quality stationery can make learning more enjoyable and effective. What aspect of studying would you like help with?",
        "Learning is an adventure! With the right notebooks, pens, and organization system, you can conquer any subject. What are you currently working on?"
      ]);
    }

    // DRAWING & ART
    if (lowerMessage.match(/(draw|drawing|art|artistic|sketch|paint|color|colour)/)) {
      if (lowerMessage.match(/(how to|start|begin|tips|tools)/)) {
        return getRandomResponse([
          "Start drawing with basic shapes - circles, squares, triangles. Get quality pencils (2B, HB, 2H), an eraser, and a sketchbook. Practice daily, even if just 15 minutes. Remember, every artist was once a beginner!",
          "For drawing success, start with quality materials: graphite pencils, good paper, and patience. Begin with simple objects around you. Practice shading techniques and don't worry about perfection - progress matters more!",
          "Art supplies are your creative toolkit! Start with pencils (varying hardness), erasers, and sketchbooks. Add colored pencils or markers as you advance. The key is consistent practice. What would you like to draw?"
        ]);
      }
      return getRandomResponse([
        "Drawing is a wonderful way to express creativity! Whether you're sketching notes in your notebook or creating detailed artwork, the right tools make all the difference. What art supplies do you currently use?",
        "Art and stationery go hand in hand! From quick doodles in meeting notes to detailed sketches in your journal, drawing adds visual interest to everything. What type of creative work interests you?"
      ]);
    }

    // ORGANIZATION & PLANNING
    if (lowerMessage.match(/(organize|organization|planner|planning|schedule|routine|discipline)/)) {
      return getRandomResponse([
        "Organization is key to success! Use a planner to track tasks and deadlines. Color-code your notes by subject. Keep your stationery organized in a dedicated space. A clean workspace boosts productivity!",
        "Planning ahead reduces stress! Use bullet journaling for flexible organization, or try time-blocking in your planner. Keep sticky notes for quick reminders. What area of your life needs better organization?",
        "The right planning system transforms chaos into clarity! Whether you prefer digital tools or paper planners, consistency matters most. Use quality notebooks that you enjoy writing in. What's your biggest organizational challenge?"
      ]);
    }

    // STATIONERY GENERAL
    if (lowerMessage.match(/(stationery|supplies|tools|materials)/)) {
      return getRandomResponse([
        "Stationery is more than just tools - it's inspiration! Essential supplies include quality notebooks, reliable pens, highlighters, sticky notes, and a good eraser. What type of stationery are you looking for?",
        "The right stationery makes every task more enjoyable! From basic note-taking supplies to specialized art materials, having quality tools boosts creativity and productivity. What projects are you working on?",
        "Stationery lovers unite! Whether you're a student, professional, artist, or journaler, the right supplies make all the difference. What's your favorite type of stationery?"
      ]);
    }

    // MOTIVATION & INSPIRATION
    if (lowerMessage.match(/(motivation|inspired|inspiration|creative|creativity|ideas|blocked)/)) {
      return getRandomResponse([
        "Creativity flows when you're inspired! Try new stationery, change your environment, or explore different subjects. Keep an idea journal - capture every thought, no matter how small. What inspires you most?",
        "Creative blocks happen to everyone! Try this: grab your favorite pen and notebook, set a timer for 10 minutes, and just write or draw without judgment. Movement helps too - take a walk and observe the world. What are you working on?",
        "Inspiration is everywhere! In nature, in conversations, in problems that need solving. Keep a pocket notebook handy to capture ideas. Remember, creativity is a muscle - the more you use it, the stronger it gets!"
      ]);
    }

    // SPECIFIC PRODUCT RECOMMENDATIONS
    if (lowerMessage.match(/(recommend|suggestion|what should|which)/)) {
      return getRandomResponse([
        "I'd love to help you choose the perfect stationery! Tell me more about what you'll be using it for - note-taking, journaling, art, work, or studies? The right tool depends on your specific needs!",
        "Great question! The best recommendation depends on your use case. Are you looking for something for school, work, creative projects, or personal use? Let me know more details!",
        "I can definitely help with recommendations! Consider your budget, primary use, and personal style. What's most important to you - smooth writing, durability, aesthetics, or functionality?"
      ]);
    }

    // HELP & ASSISTANCE
    if (lowerMessage.match(/(help|assist|support|guidance|advice)/)) {
      return getRandomResponse([
        "I'm here to help with all things stationery, creativity, and productivity! Ask me about pens, notebooks, study techniques, drawing tips, organization, or anything else related to your creative journey!",
        "I'm your personal stationery assistant! I can help you choose the right tools, improve your study habits, start drawing, get organized, or find inspiration. What would you like to explore?",
        "I'm here to support your creative and academic journey! Whether you need product recommendations, study tips, drawing advice, or organization strategies, I've got you covered. What's on your mind?"
      ]);
    }

    // DEFAULT RESPONSES
    return getRandomResponse([
      "That's interesting! I can help with stationery recommendations, study tips, drawing techniques, organization strategies, and creative inspiration. What specific area would you like to explore?",
      "I'd love to help you with that! I specialize in stationery, study methods, drawing, organization, and creativity. Could you tell me more about what you're looking for?",
      "Great question! I'm here to help with all things related to notebooks, pens, studying, art, and productivity. What specific challenge or interest can I assist you with?",
      "I'm your NOTE_IT assistant! I can provide guidance on stationery choices, study techniques, drawing tips, organization methods, and creative inspiration. What would be most helpful for you right now?"
    ]);
  };

  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>NOTE_IT Assistant</h3>
            <p>Your expert guide to stationery, study & creativity!</p>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about stationery, study tips, drawing..."
              className="message-input"
            />
            <button onClick={handleSendMessage} className="send-button">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
