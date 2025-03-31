import React, { useState } from "react";
import NavBarComponent from "../components/basic/navbar.js";
import LeftMenuComponent from "../components/full/leftmenu.js"
import RightMenuComponent from "../components/full/rightmenu.js"
import ActionBarComponent from "../components/basic/actionbar.js";
import "./homescreen.css";
import SectionHome from "../components/full/SectionHome.js";
import CallHistory from "../components/full/CallHistory.js";
import CallAnalyticsOptions from "../components/full/CallAnalyticsOptions.js";
import CallStatistics from "../components/full/CallStatistics.js";

function HomeScreen(){

    const [activeComponent, setActiveComponent] = useState(1);

    const renderRightMenuComponent = () => {
        switch (activeComponent) {
            case 1:
                return <SectionHome/>
            case 2:
                return <CallHistory/>
            case 3:
                return <CallAnalyticsOptions/>
            case 4:
                return <CallStatistics/>
            default:
                return <SectionHome/>
        }
    };

    return (
        <div className="main-homescreen-container">
            <div className="navbar-location-container">
                <NavBarComponent/>
            </div>
            <div className="menu-location-container">
                <div className="left-menu-location-container">
                    <LeftMenuComponent setActiveComponent={setActiveComponent}/>
                </div>
                <div className="right-menu-location-container">
                    <RightMenuComponent children={renderRightMenuComponent()}/>
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