import React from "react";
import CustomButton from "../basic/button";
import CreateForm from "../full/createform";
import LoginForm from "../full/loginform";
import "./signupoptions.css";

function SignUpOptions() {

    return (
        <div className="main-signup-options-container">
            <h1 className="signup-options-title titles-font-style">Moodify</h1>
            <div className="signup-options-container">
                <CustomButton type={"button"} atributes={{name: "loginMainBtn", value:"0", text: "Iniciar Sesión"}} onClick={ () => <CreateForm/>}/>
                <CustomButton type={"button"} atributes={{name: "signupMainBtn", value:"0", text: "Crear Cuenta"}} onClick={ () => <LoginForm/>}/>
            </div>
        </div>
    );

};

export default SignUpOptions;