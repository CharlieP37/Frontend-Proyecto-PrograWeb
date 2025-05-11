import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogWithHeader from "../basic/dialogheader";
import CustomInput from "../basic/input";
import CustomButton from "../basic/button";
import { login } from "../../services/api";
import "./loginform.css";

function LoginForm({ visible, onHide }){

    const navigate = useNavigate();
    const [error, setError] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.usernamelogin || !formData.passwordlogin) {
            alert("Error! Ingrese información de inicio de sesión.");
            return;
        };

        try {
            const credentials = ({ user: formData.usernamelogin, password: formData.passwordlogin });
            const responseData = await login(credentials);
            localStorage.setItem("token", responseData.token);
            alert("Inicio de sesión exitoso!");
            onHide();
            navigate("/home");
        }
        catch (e) {
            setError(e.message);
        };
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