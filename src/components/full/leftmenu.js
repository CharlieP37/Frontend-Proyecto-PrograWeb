import CustomButton from "../basic/button.js";
import "./leftmenu.css";

function LeftMenu(){

    return (
        <div className="main-left-menu-container">
            <CustomButton type="button" atributes={{ name:"startBtn", value:"", text:"Inicio" }} onClick={() => alert("Inicio")}/>
            <CustomButton type="button" atributes={{ name:"historyBtn", value:"", text:"Historial" }} onClick={() => alert("Historial")}/>
            <CustomButton type="button" atributes={{ name:"analyzeEmontionBtn", value:"", text:"Analizar emoción" }} onClick={() => alert("Analizar Emoción")}/>
            <CustomButton type="button" atributes={{ name:"stadisticsBtn", value:"", text:"Estadisticas" }} onClick={() => alert("Estadísticas")}/>
        </div>
    );

};

export default LeftMenu;