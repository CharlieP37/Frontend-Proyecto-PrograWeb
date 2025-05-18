import React, { useState, useRef } from "react";
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { addLocale } from 'primereact/api';
import { useNavigate } from "react-router-dom";
import CustomInput from "../basic/input";
import DialogWithHeader from "../basic/dialogheader";
import CustomButton from "../basic/button";
import calendarIcon from '../../assets/calendar-icon.svg';
import { register } from "../../services/api";
import "./createform.css";

function CreateForm({ visible, onHide }){
    
    const calendarRef = useRef(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordconfirm: "",
        birthDate: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDateChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            birthDate: e.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.username || !formData.email || !formData.password || !formData.passwordconfirm || !formData.birthDate) {
            setError("Por favor, complete todos los campos.");
            return;
        };

        const usernameRegex = /^(?!.*[._-]{2})[a-zA-Z0-9._-]{3,20}$/;
        if (!usernameRegex.test(formData.username)) {
            setError("El nombre de usuario debe\ntener entre 3 y 20 caracteres,\n y solo puede contener letras, números, puntos (.),\n guiones (-) o \nguiones bajos (_),\n sin símbolos repetidos.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email) || formData.email.length > 255) {
            setError("El correo electrónico no es válido.");
            return;
        }

        if (formData.password !== formData.passwordconfirm) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        const today = new Date();
        const minBirthDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
        if (formData.birthDate > minBirthDate) {
            setError("Debes tener al menos 13 años para registrarte.");
            return;
        }

        try {
            const credentials = ({ user: formData.username, email: formData.email, password: formData.password, birthday: formData.birthDate });
            const responseData = await register(credentials);
            localStorage.setItem("token", responseData.token);
            alert("Usuario creado éxitosamente!");
            onHide();
            localStorage.setItem("showSurveyDialog", "true");
            navigate("/home");
        }
        catch (e) {
            setError(e.message || "Ocurrió un error durante el registro.");
        };

    };

    const openCalendar = (e) => {
        e.preventDefault();
        if (calendarRef.current) {
            calendarRef.current.show();
        }
    };

    const preventInputInteraction = (e) => {
        calendarRef.current.hide();
    }

    const dateTemplate = (date) => {
        if (date < date.today) {
            return (
                <>{date.disable}</>
            );
        }

        return date.day;
    }

    addLocale('es', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Borrar'
    });

    return (
        <DialogWithHeader
            id={"createaccount"}
            visible={visible}
            onHide={onHide}
            headerContent={
                <div className="name-container titulo titles-font-style">
                    <h1>Moodify</h1>
                </div>
            }
            children={
                <form className="create-account-form" onSubmit={handleSubmit}>
                    <div className="create-form-container">
                        <div className="username-group custom-container">
                            <CustomInput type={"text"} atributes={{name: "username", label:"Usuario"}}  value={formData.username} onChange={handleChange}/>
                        </div>
                        <div className="email-group custom-container">
                            <CustomInput type={"email"} atributes={{name: "email", label:"Correo Electrónico"}} value={formData.email} onChange={handleChange}/>
                        </div>
                        <div className="pass-group custom-container">
                            <CustomInput type={"password"} atributes={{name: "password", label:"Contraseña"}} value={formData.password} onChange={handleChange}/>
                            <CustomInput type={"password"} atributes={{name: "passwordconfirm", label:"Confirmar Contraseña"}} value={formData.passwordconfirm} onChange={handleChange}/>
                        </div>
                        <div className="calendar-group custom-container">
                            <div className="card">
                                <br/>
                                <FloatLabel id="calendarFloatLabel">
                                    <div className="calendar-button-container custom-container">
                                        <Calendar className="custom-calendar" panelClassName="custom-datetimepicker-panel" ref={calendarRef} inputId="birthDate" value={formData.birthDate} onChange={handleDateChange} onFocus={preventInputInteraction} onInput={preventInputInteraction} disabledDays={null} dateTemplate={dateTemplate} showButtonBar locale="es"/>
                                        <Button type={Button} onClick={openCalendar} id="calendarBtn">
                                            <img id="calendarIcon" alt="logo" src={calendarIcon}></img>
                                        </Button>
                                    </div>
                                    <label id="birthDateLabel" htmlFor="birthDate">Fecha de nacimiento</label>
                                </FloatLabel>
                            </div>
                        </div>
                        <div className="custom-container createaccount-btn-container">
                            <div className="form-error-message">
                                <br></br>
                                {error.split('\n').map((line, idx) => (
                                <span key={idx}>
                                    {line}
                                    <br />
                                </span>
                                ))}
                            </div>
                            <CustomButton type={"submit"} atributes={{name: "createaccountBtn", value:"0", text: "Crear"}}/>
                        </div>
                    </div>
                </form>
                }
            >
        </DialogWithHeader>
    );

};

export default CreateForm;