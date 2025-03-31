import Dashboard from "./Dashboard";
import "./rightmenu.css";

function CallStatistics({children}) {
    return (
        <div className="main-right-menu-container">
            <Dashboard/>
        </div>
    );
};

export default CallStatistics;