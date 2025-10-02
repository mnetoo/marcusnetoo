import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/home/home'
import About from './pages/about/about';

function App() {
  return (
    <Router basename="/marcusnetoo">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </ Router>
  )
}

export default App