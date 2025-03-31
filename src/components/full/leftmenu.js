import CustomButton from "../basic/button.js";
import "./leftmenu.css";

function LeftMenu({ setActiveComponent }){

    return (
        <div className="main-left-menu-container">
            <CustomButton type="button" atributes={{ name:"startBtn", value:"", text:"Inicio" }} onClick={() => setActiveComponent(1)}/>
            <CustomButton type="button" atributes={{ name:"historyBtn", value:"", text:"Historial" }} onClick={() => setActiveComponent(2)}/>
            <CustomButton type="button" atributes={{ name:"analyzeEmontionBtn", value:"", text:"Analizar emoción" }} onClick={() => setActiveComponent(3)}/>
            <CustomButton type="button" atributes={{ name:"stadisticsBtn", value:"", text:"Estadisticas" }} onClick={() => setActiveComponent(4)}/>
        </div>
    );

};

export default LeftMenu;