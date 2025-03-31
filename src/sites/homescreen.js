import NavBarComponent from "../components/basic/navbar.js";
import LeftMenuComponent from "../components/full/leftmenu.js"
import RightMenuComponent from "../components/full/rightmenu.js"
import ActionBarComponent from "../components/basic/actionbar.js";
import "./homescreen.css";

function HomeScreen(){

    return (
        <div className="main-homescreen-container">
            <div className="navbar-location-container">
                <NavBarComponent/>
            </div>
            <div className="menu-location-container">
                <div className="left-menu-location-container">
                    <LeftMenuComponent/>
                </div>
                <div className="right-menu-location-container">
                    <RightMenuComponent/>
                </div>
            </div>
            <div className="actionbar-location-container">
                <ActionBarComponent/>
            </div>
            <div className="credits-location-container">
                <p>© Carlos Pop & Diego Gil. Universidad Rafael Landívar. 2025.</p>
            </div>
        </div>
    );
    
};

export default HomeScreen;