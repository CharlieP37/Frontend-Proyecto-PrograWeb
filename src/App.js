import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './components/styles.css';
import LoginPage from "./sites/loginscreen";
import HomePage from "./sites/homescreen";
import TestError from './components/basic/TestError.js';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="main-container"><LoginPage /></div>}/>
        <Route path="/home" element={<div className="main-container"><HomePage /></div>}/>
        <Route path="/test-error" element={<TestError />} />
      </Routes>
    </Router>
  );
}

export default App;
