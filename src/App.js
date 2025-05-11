import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './components/styles.css';
import LoginPage from "./sites/loginscreen";
import HomePage from "./sites/homescreen";
import ProtectedRoute from "./components/basic/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="main-container"><LoginPage /></div>}/>
        <Route path="/home" element={<div className="main-container"><ProtectedRoute><HomePage /></ProtectedRoute></div>}/>
        <Route path="*" element={<Navigate to = "/" />}/>
      </Routes>
    </Router>
  );
}

export default App;
