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

        <Routes>

          {/* ✅ ONLY homepage has footer */}
          <Route 
            path="/" 
            element={
              <Layout>
                <Getproducts />
              </Layout>
            } 
          />

          {/* ❌ ALL OTHER PAGES: NO FOOTER */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/addproducts" element={<Addproducts />} />
          <Route path="/makepayment" element={<Makepayment />} />
          <Route path="*" element={<Notfound />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;