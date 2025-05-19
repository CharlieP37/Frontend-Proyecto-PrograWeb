import React, { useState, useEffect } from "react";
import NavBarComponent from "../components/basic/navbar.js";
import LeftMenuComponent from "../components/full/leftmenu.js"
import RightMenuComponent from "../components/full/rightmenu.js"
import ActionBarComponent from "../components/basic/actionbar.js";
import SectionHome from "../components/full/SectionHome.js";
import CallHistory from "../components/full/CallHistory.js";
import CallAnalyticsOptions from "../components/full/CallAnalyticsOptions.js";
import CallStatistics from "../components/full/CallStatistics.js";
import InitialQuiz from "../components/full/initialquiz.js";
import imageEmotionHappy from '../assets/Feliz.svg';
import imageEmotionSad from '../assets/Triste.svg';
import imageEmotionAngry from '../assets/Enojado.svg';
import imageEmotionConfused from '../assets/Confundido.svg';
import imageEmotionDisgusted from '../assets/Disgustado.svg';
import imageEmotionSurprised from '../assets/Soprendido.svg';
import imageEmotionCalm from '../assets/Tranquilo.svg';
import imageEmotionFear from '../assets/Miedo.svg';
import imageEmotionUnknown from '../assets/Desconocido.svg';
import { recommendationsHistory } from '../services/api.js';
import "./homescreen.css";

function HomeScreen(){

    const [showSurveyDialog, setShowSurveyDialog] = useState(() => { const saved = localStorage.getItem("showSurveyDialog"); return saved === "true"; });
    const [activeComponent, setActiveComponent] = useState(1);
    const [latestRecommendation, setLatestRecommendation] = useState(null);

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

    const emotionImageSelector = (emotion) => {
        switch(emotion){
        case "HAPPY":
            return imageEmotionHappy;
        case "SAD":
            return imageEmotionSad;
        case "ANGRY":
            return imageEmotionAngry;
        case "CONFUSED":
            return imageEmotionConfused;
        case "DISGUSTED":
            return imageEmotionDisgusted;
        case "SURPRISED":
            return imageEmotionSurprised;
        case "CALM":
            return imageEmotionCalm;
        case "FEAR":
            return imageEmotionFear;
        default:
            return imageEmotionUnknown;
        }
    };

    useEffect(() => {
        const fetchLatestRecommendation = async () => {
            try {
                const token = localStorage.getItem("token");
                const data = await recommendationsHistory({ token });
                if (data.result && data.result.length > 0) {
                    const latest = data.result[data.result.length-1];

                    const songImageBase64 = (latest.image);
                    const emotionImageBase64 = emotionImageSelector(latest.emotion);

                    setLatestRecommendation({
                        id: latest.id,
                        songName: latest.title,
                        artist: latest.artist,
                        songImageBase64,
                        emotionImageBase64,
                        url: latest.URL
                    });
                }
            } catch (error) {
                console.error("Error fetching latest recommendation:", error);
            }
        };

        fetchLatestRecommendation();

        const interval = setInterval(fetchLatestRecommendation, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleCloseSurvey = () => {
        setShowSurveyDialog(false);
    };

    return (
        <div className="main-homescreen-container">
            {showSurveyDialog && <InitialQuiz onClose={handleCloseSurvey} />}
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
                <ActionBarComponent {...latestRecommendation}/>
            </div>
            <div className="credits-location-container">
                <p>© Carlos Pop & Diego Gil. Universidad Rafael Landívar. 2025.</p>
            </div>
        </div>
    );
    
};

export default HomeScreen;