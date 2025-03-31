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
import "./createform.css";

function CreateForm({ visible, onHide }){
    
    const calendarRef = useRef(null);
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados al backend:", formData);

        // Simulación de envío al backend
        setTimeout(() => {
            alert("Cuenta creada correctamente (simulado)");
            onHide();
            navigate("/home");
        }, 1000);
    };

    const openCalendar = () => {
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