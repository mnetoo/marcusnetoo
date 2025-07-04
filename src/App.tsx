import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/home'
import Portfolio from './pages/portfolio';
import About from './pages/about';
import Contact from './pages/contact';

function App() {
  return (
    <Router basename="/marcusnetoo">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </ Router>
  )
}

export default App