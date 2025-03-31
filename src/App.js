import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './components/styles.css';
import LoginPage from "./sites/loginscreen";
import HomePage from "./sites/homescreen";
import Test from "./sites/testscreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="main-container"><LoginPage /></div>}/>
        <Route path="/home" element={<div className="main-container"><HomePage /></div>}/>
        <Route path="/test" element={<Test />}/>
      </Routes>
    </Router>
  );
}

export default App;
