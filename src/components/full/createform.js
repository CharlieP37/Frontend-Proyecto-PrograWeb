import React, { useState, useRef } from "react";
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { addLocale } from 'primereact/api';
import CustomInput from "../basic/input";
import DialogWithHeader from "../basic/dialogheader";
import CustomButton from "../basic/button";
import calendarIcon from '../../assets/calendar-icon.svg';
import "./createform.css";

function CreateForm(){
    
    const [date, setDate] = useState(null);
    const calendarRef = useRef(null);
    const [dialogVisible, setDialogVisible] = useState(true);

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
            visible={dialogVisible}
            onHide={() => setDialogVisible(false)}
            headerContent={
                <div className="name-container titulo titles-font-style">
                    <h1>Moodify</h1>
                </div>
            }
            children={
                <div className="create-form-container">
                    <div className="username-group custom-container">
                        <CustomInput type={"text"} atributes={{name: "username", label:"Usuario"}}/>
                    </div>
                    <div className="email-group custom-container">
                        <CustomInput type={"email"} atributes={{name: "email", label:"Correo Electrónico"}}/>
                    </div>
                    <div className="pass-group custom-container">
                        <CustomInput type={"password"} atributes={{name: "password", label:"Contraseña"}}/>
                        <CustomInput type={"password"} atributes={{name: "passwordconfirm", label:"Confirmar Contraseña"}}/>
                    </div>
                    <div className="calendar-group custom-container">
                        <div className="card">
                            <br/>
                            <FloatLabel id="calendarFloatLabel">
                                <div className="calendar-button-container custom-container">
                                    <Calendar className="custom-calendar" panelClassName="custom-datetimepicker-panel" ref={calendarRef} inputId="birthDate" value={date} onChange={(e) => setDate(e.value)} onFocus={preventInputInteraction} onInput={preventInputInteraction} disabledDays={null} dateTemplate={dateTemplate} showButtonBar locale="es"/>
                                    <Button onClick={openCalendar} id="calendarBtn">
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
                }
            >
        </DialogWithHeader>
    );

};

export default CreateForm;