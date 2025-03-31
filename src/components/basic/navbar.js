import MoodifyIcon from "../../assets/MoodifyLogoMain.svg";
import "./navbar.css";

function NavBar(){
    return (
        <div className="navbar-container">
            <div className="navbar-inner-container">
                <div className="navbar-image-container">
                    <img alt="Moodify Logo" id ="logoIcon" src={MoodifyIcon}></img>
                </div>
            </div>
        </div>
    );
};

export default NavBar;