import React, { useState } from "react";
import DialogWithHeader from "../basic/dialogheader";
import CustomInput from "../basic/input";
import CustomButton from "../basic/button";
import "./loginform.css";

function LoginForm(){

    const [dialogVisible, setDialogVisible] = useState(true);

    return (
        <DialogWithHeader
            id={"login"}
            visible={dialogVisible}
            onHide={() => setDialogVisible(false)}
            headerContent={
                <div className="name-container">
                    <h1>Moodify</h1>
                </div>
            }
            children={
                <div className="login-container">
                    <div className="credentials-container">
                        <CustomInput type={"text"} atributes={{name: "usernamelogin", label:"Usuario"}}/>
                        <CustomInput type={"password"} atributes={{name: "passwordlogin", label:"Contraseña"}}/>
                    </div>
                    <div className="enterlogin-btn-container">
                        <CustomButton type={"submit"} atributes={{name: "loginBtn", value:"0", text: "Entrar"}}/>
                    </div>
                </div>
            }
        />
    );
};

export default LoginForm;