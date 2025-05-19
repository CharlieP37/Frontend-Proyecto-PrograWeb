import React, { useState, useRef } from "react";
import DialogDefault from "../basic/dialogdefault";
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { addLocale } from 'primereact/api';
import CustomButton from "../basic/button";
import CustomDropDown from "../basic/dropdown";
import CustomInput from "../basic/input";
import calendarIcon from '../../assets/calendar-icon.svg';
import { quizOptions, saveQuiz, profileOptions, profileSave } from "../../services/api";
import "./initialquiz.css";

function InitialQuiz(){

    const [dialogVisible1, setDialogVisible1] = useState(true);
    const [dialogVisible2, setDialogVisible2] = useState(false);
    const [dialogVisible3, setDialogVisible3] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [selectedAnswersIndex, setSelectedAnswersIndex] = useState({});
    const [questionOptions, setQuestionOptions] = useState({});
    const [countryData, setCountryData] = useState();
    const [formData, setFormData] = useState({
        personname: "",
        personlastname: "",
        personbirthday: null,
        personsex: "",
        personcountry: null
    });
    const calendarRef = useRef(null);

    const sex = [
        "Masculino",
        "Femenino"
    
    const questions = [
        "¿Qué género musical disfrutas más?",
        "¿Cuál de los siguientes artistas escuchas?",
        "¿Qué canción te gusta más?"
    ]
    
    const handleNextClick = async () => {
        setDialogVisible1(false);
        setDialogVisible2(true);
        await handleProfileOptions();
    };

    const handleProfileClick = async () => {
        if (!formData.personname && !formData.personlastname && !formData.personsex && !formData.personcountry && !formData.personbirthday) {
            return alert("Debe llenar los campos");
        }
        if (!formData.personname) {
            return alert("Debe ingresar un nombre!");
        }
        if (!formData.personlastname) {
            return alert("Debe ingresar un apellido!");
        }
        if (!formData.personsex) {
            return alert("Debe seleccionar un sexo!");
        }
        if (!formData.personcountry) {
            return alert("Debe seleccionar un país!");
        }
        if (!formData.personbirthday) {
            return alert("Debe ingresar su fecha de nacimiento!");
        }
        setDialogVisible2(false);
        setDialogVisible3(true);
        await handleProfileSave();
        await handleGetOptions();
    };

    const handleNextQuestion = async () => {
        if (!selectedAnswers[currentQuestionIndex]) {
            return alert("Debe seleccionar una opción!");
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            await handleSaveQuiz();
            setDialogVisible3(false);
            localStorage.removeItem("showSurveyDialog");
        }
    };

    const handleOptionChange = (selectedOption) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentQuestionIndex]: selectedOption
        }));
        setSelectedAnswersIndex((prevAnswers) => ({
            ...prevAnswers,
            [currentQuestionIndex]: questionOptions[currentQuestionIndex].indexOf(selectedOption) + 1
        }));
    };

    const handleProfileOptions = async () => {
        try {
            const responseData = await profileOptions();
            setCountryData(responseData.country);
        } catch (error) {
            console.error("Error al obtener opciones para el perfil: ", error.message);
        };
    };

    const handleProfileSave = async () => {
        try {
            const currenttoken = localStorage.getItem('token');
            const profiledata = ({name: formData.personname, lastname: formData.personlastname, birthdate: formData.personbirthday.toISOString().split("T")[0], sex: formData.personsex, country: countryData.indexOf(formData.personcountry)+1 });
            const profile = ({ token: currenttoken, profile: profiledata });
            await profileSave(profile);
        } catch (error) {
            console.error("Error al guardar información de perfil: ", error.message);
        }
    }

    const handleGetOptions = async () => {
        try {
            const responseData = await quizOptions();
            const options = [responseData.genre, responseData.artists, responseData.songs];
            setQuestionOptions(options);

        } catch (error) {
            console.error("Error al obtener opciones para quiz: ", error.message);
        }
    }

    const handleSaveQuiz = async () => {
        try {
            const currenttoken = localStorage.getItem('token');
            const answers = ({ token: currenttoken, genre_Id: selectedAnswersIndex[0], artist_Id: selectedAnswersIndex[1], song_Id: selectedAnswersIndex[2] });
            await saveQuiz(answers);
        } catch (error) {
            console.error("Error al guardar respuestas de quiz: ", error.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleChangeDrop = (e, name) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDateChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
           personbirthday : e.value
        }));
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
        <div className="quiz-dialog-container">
            <DialogDefault
                id={"initialwelcome"}
                visible={dialogVisible1}
                onHide={() => setDialogVisible1(false)}
                children={
                    <div className="quiz-content-container">
                        <h2 className="title2" id="welcomeTitleH2">¡Bienvenido a Moodify! Queremos conocerte un poco mejor y tus gustos músicales para hacer que la música se adapte a ti.</h2>
                        <CustomButton type={"button"} atributes={{name: "welcomeBtn", value:"", text: "Continuar"}} onClick={handleNextClick}/>
                    </div>
                    }
            />
            <DialogDefault
                id={"profileform"}
                visible={dialogVisible2}
                onHide={() => setDialogVisible2(false)}
                children={
                    <div className="profile-content-container">
                        <div className="profile-title-container">
                            <h2 className="title2" id="profileTitleH2">Completa los siguientes datos</h2>
                        </div>
                        <div className="profile-options-container">
                            <div className="row-one-information">
                                <CustomInput type={"text"} atributes={{name: "personname", label:"Nombre"}} value={formData.personname} onChange={handleChange}/>
                                <div className="middle-div"></div>
                                <CustomInput type={"text"} atributes={{name: "personlastname", label:"Apellido"}} value={formData.personlastname} onChange={handleChange}/>
                            </div>
                            <div className="row-two-information">
                                <div className="card quizcard">
                                    <FloatLabel>
                                        <CustomDropDown id={"profilesex"} text={""} name={"name"} options={sex} value={formData.personsex || ""} onChange={(e) => handleChangeDrop(e, "personsex")}/>
                                        <label id="sexLabel" htmlFor="profilesex">Sexo</label>
                                    </FloatLabel>
                                </div>
                                <div className="middle-div"></div>
                                <div className="card quizcard">
                                    <FloatLabel>
                                        <CustomDropDown id={"profilecountry"} text={""} name={"name"} options={countryData} value={formData.personcountry || ""} onChange={(e) => handleChangeDrop(e, "personcountry")}/>
                                        <label id="countryLabel" htmlFor="profilecountry">País</label>
                                    </FloatLabel>
                                </div>
                            </div>
                            <div className="row-three-information">
                                <div className="calendar-group custom-container profile-calendar">
                                    <div className="card">
                                        <FloatLabel id="calendarFloatLabel">
                                            <div className="calendar-button-container custom-container">
                                                <Calendar className="custom-calendar" panelClassName="custom-datetimepicker-panel" ref={calendarRef} inputId="personbirthday" value={formData.personbirthday} onChange={handleDateChange} onFocus={preventInputInteraction} onInput={preventInputInteraction} disabledDays={null} dateTemplate={dateTemplate} showButtonBar locale="es"/>
                                                <Button type={Button} onClick={openCalendar} id="calendarBtn">
                                                    <img id="calendarIcon" alt="logo" src={calendarIcon}></img>
                                                </Button>
                                            </div>
                                            <label id="birthDateLabel" htmlFor="birthDate">Fecha de nacimiento</label>
                                        </FloatLabel>
                                    </div>
                                </div>
                            </div>
                            <div className="row-btn-container">
                                <CustomButton type={"submit"} atributes={{name: "profileSubmitBtn", value:"", text: "Siguiente"}} onClick={handleProfileClick}/>
                            </div>
                        </div>
                    </div>
                }
            />
            <DialogDefault
                id={"initialquiz"}
                visible={dialogVisible3}
                onHide={() => setDialogVisible3(false)}
                children={
                    <div className="quiz-content-container">
                        <div className="quiz-title-container">
                            <h2 className="title2" id="questionTitleH2">{questions[currentQuestionIndex]}</h2>
                        </div>
                        <div className="quiz-options-container">
                            <CustomDropDown id={"questionsquiz"} text={"Selecciona una opción"} name={"name"} options={questionOptions[currentQuestionIndex]} value={selectedAnswers[currentQuestionIndex] || ""} onChange={(e) => handleOptionChange(e.target.value)}/>
                            <CustomButton type={"submit"} atributes={{name: "quiznextBtn", value:"", text: "Siguiente"}} onClick={handleNextQuestion}/>
                        </div>
                    </div>
                }
            />
        </div>
    );
}

export default InitialQuiz;