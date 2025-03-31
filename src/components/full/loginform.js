import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogWithHeader from "../basic/dialogheader";
import CustomInput from "../basic/input";
import CustomButton from "../basic/button";
import "./loginform.css";

function LoginForm({ visible, onHide }){

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        usernamelogin: "",
        passwordlogin: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados al backend:", formData);

        // Simulación de envío al backend
        setTimeout(() => {
            alert("Datos validados (simulado)");
            onHide();
            navigate("/home");
        }, 1000);
    };

    return (
        <DialogWithHeader
            id={"login"}
            visible={visible}
            onHide={onHide}
            headerContent={
                <div className="name-container titles-font-style">
                    <h1>Moodify</h1>
                </div>
            }
            children={
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-container">
                        <div className="credentials-container">
                            <CustomInput type={"text"} atributes={{name: "usernamelogin", label:"Usuario"}} value={formData.username} onChange={handleChange}/>
                            <CustomInput type={"password"} atributes={{name: "passwordlogin", label:"Contraseña"}} value={formData.password} onChange={handleChange}/>
                        </div>
                        <div className="enterlogin-btn-container">
                            <CustomButton type={"submit"} atributes={{name: "loginBtn", value:"0", text: "Entrar"}}/>
                        </div>
                    </div>
                </form>
            }
        />
    );
};

export default LoginForm;