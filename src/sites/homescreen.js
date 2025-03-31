import React, { useState } from "react";
import NavBarComponent from "../components/basic/navbar.js";
import LeftMenuComponent from "../components/full/leftmenu.js"
import RightMenuComponent from "../components/full/rightmenu.js"
import ActionBarComponent from "../components/basic/actionbar.js";
import "./homescreen.css";

/* Componentes dummy de prueba */
const Inicio = () => <div className="right-content" style={{justifySelf:"center", justifyItems:"center", width:"100%", height:"100%"}}><p>Componente Inicio</p></div>;
const Historial = () => <div className="right-content" style={{justifySelf:"center", justifyItems:"center", width:"100%", height:"100%"}}><p>Componente Historial</p></div>;
const AnalizarEmocion = () => <div className="right-content" style={{justifySelf:"center", justifyItems:"center", width:"100%", height:"100%"}}><p>Componente Analizar Emoción</p></div>;
const Estadisticas = () => <div className="right-content" style={{justifySelf:"center", justifyItems:"center", width:"100%", height:"100%"}}><p>Componente Estadísticas</p></div>;
/* --- Eliminar al implementar componentes finales */

function HomeScreen(){

    const [activeComponent, setActiveComponent] = useState(1);

    const renderRightMenuComponent = () => {
        switch (activeComponent) {
            case 1:
                return <Inicio />; /* Reemplazar por componente para módulo de Inicio */
            case 2:
                return <Historial />; /* Reemplazar por componente para módulo de Historial */
            case 3:
                return <AnalizarEmocion />; /* Reemplazar por componente para módulo de Analizar Emoción */
            case 4:
                return <Estadisticas />; /* Reemplazar por componente para módulo de Estadísticas */
            default:
                return <Inicio />; /* Reemplazar por componente para módulo de Inicio */
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