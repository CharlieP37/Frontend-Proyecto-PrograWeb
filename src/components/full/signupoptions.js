import React, { useState } from "react";
import CustomButton from "../basic/button";
import CreateForm from "../full/createform";
import LoginForm from "../full/loginform";
import "./signupoptions.css";

function SignUpOptions() {

    const [activeDialog, setActiveDialog] = useState(null);

    const handleShowDialog = (dialogType) => {
        setActiveDialog(dialogType);
    };

    const handleCloseDialog = () => {
        setActiveDialog(null);
    };
    return (
        <div className="main-signup-options-container">
            <h1 className="signup-options-title titles-font-style">Moodify</h1>
            <div className="signup-options-container">
                <CustomButton type={"button"} atributes={{name: "loginMainBtn", value:"0", text: "Iniciar Sesión"}} onClick={() => handleShowDialog("login")}/>
                <CustomButton type={"button"} atributes={{name: "signupMainBtn", value:"0", text: "Crear Cuenta"}} onClick={() => handleShowDialog("signup")}/>
            </div>
            <div className="dynamic-component-container">
            {activeDialog === "login" && (
                    <LoginForm visible={true} onHide={handleCloseDialog} />
                )}
                {activeDialog === "signup" && (
                    <CreateForm visible={true} onHide={handleCloseDialog} />
                )}
            </div>
        </div>
    );

};

export default SignUpOptions;