import './App.css';
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
import Mycarousel from './components/Mycarousel';
import Aboutus from './components/Aboutus';

function App() {
  return (
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
          <Route path="/" element={<Layout><Mycarousel /><Getproducts /></Layout>} />
          <Route path="/signup" element={<Layout><Signup /></Layout>} />
          <Route path="/signin" element={<Layout><Signin /></Layout>} />
          <Route path="/addproducts" element={<Layout><Addproducts /></Layout>} />
          <Route path="/makepayment" element={<Layout><Makepayment /></Layout>} />
          <Route path="/aboutus" element={<Layout><Aboutus /></Layout>} />
          <Route path="*" element={<Layout><Notfound /></Layout>} />
          

        </Routes>

      </div>
    </Router>
  );
}

export default App;