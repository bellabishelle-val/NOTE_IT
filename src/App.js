import './App.css';
import './css/Animations.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import "bootstrap/dist/css/bootstrap.min.css";
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import HeroSection from './components/HeroSection';
import Aboutus from './components/Aboutus';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './contexts/CartContext';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';
import Collection from './components/Collection';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
        
        <header className="App-header">
          <br />
          <h2 className='title'>~WELCOME TO NOTE_IT~</h2>
          <i className='juu'>Journal Your Ideas To Life!</i>
          <br />
        </header>

        <Navbar />
        

        <Routes>
          
          {/* ✅ ALL pages now inherit Layout (footer included) */}
          <Route path="/" element={<Layout><HeroSection /><Getproducts /></Layout>} />
          <Route path="/signup" element={<Layout><Signup /></Layout>} />
          <Route path="/signin" element={<Layout><Signin /></Layout>} />
          <Route path="/addproducts" element={<Layout><ProtectedRoute><Addproducts /></ProtectedRoute></Layout>} />
          <Route path="/makepayment" element={<Layout><Makepayment /></Layout>} />
          <Route path="/aboutus" element={<Layout><Aboutus /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/wishlist" element={<Layout><Wishlist /></Layout>} />
          <Route path="/collection" element={<Layout><Collection /></Layout>} />
          <Route path="*" element={<Layout><Notfound /></Layout>} />
          

        </Routes>

      </div>
      
      <Chatbot />
      <ScrollToTop />
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;