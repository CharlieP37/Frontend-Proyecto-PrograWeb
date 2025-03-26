import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './components/styles.css';
import LoginPage from "./sites/loginscreen";
import HomePage from "./sites/homescreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/home" element={<HomePage />}/>
      </Routes>
    </Router>
  );
}

export default App;
