import { useNavigate } from "react-router-dom";
import MoodifyIcon from "../../assets/MoodifyLogoMain.svg";
import ProfileIcon from "../../assets/UserProfile.png";
import CustomButton from "./button";
import "./navbar.css";

function NavBar(){
    
    const navigate = useNavigate();

    const handleSignOut = () => {
        alert("Cerrando Sesión");
        navigate("/");
    };

    return (
        <div className="navbar-container">
            <div className="navbar-inner-container">
                <div className="navbar-image-container">
                    <img alt="Moodify Logo" id ="logoIcon" src={MoodifyIcon}></img>
                </div>
                <div className="navbar-logon-container">
                    <div className="navbar-account-icon-container">
                        <img alt="profile" id="profileIcon" src={ProfileIcon}/>
                    </div>
                    <div className="navbar-signout-container">
                        <CustomButton type={"button"} atributes={{name: "signoutBtn", value:"0", text: "Cerrar Sesión"}} onClick={() => handleSignOut()}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;