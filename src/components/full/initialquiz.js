import React, { useState } from "react";
import DialogDefault from "../basic/dialogdefault";
import CustomButton from "../basic/button";
import CustomDropDown from "../basic/dropdown";
import { quizOptions, saveQuiz } from "../../services/api";
import "./initialquiz.css";

function InitialQuiz(){

    const [dialogVisible1, setDialogVisible1] = useState(true);
    const [dialogVisible2, setDialogVisible2] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [selectedAnswersIndex, setSelectedAnswersIndex] = useState({});
    const [questionOptions, setQuestionOptions] = useState({});
    
    const questions = [
        "¿Qué género musical disfrutas más?",
        "¿Cuál de los siguientes artistas escuchas?",
        "¿Qué canción te gusta más?"
    ]
    
    const handleNextClick = async () => {

        setDialogVisible1(false);
        setDialogVisible2(true);
        await handleGetOptions();
    };

    const handleNextQuestion = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            await handleSaveQuiz();
            setDialogVisible2(false);
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

    return (
        <div className="quiz-dialog-container">
            <DialogDefault
                id={"initialwelcome"}
                visible={dialogVisible1}
                onHide={() => setDialogVisible1(false)}
                children={
                    <div className="quiz-content-container">
                        <h2 className="title2" id="welcomeTitleH2">¡Bienvenido a Moodify! Queremos conocer tus gustos para hacer que la música se adapte a ti.</h2>
                        <CustomButton type={"button"} atributes={{name: "welcomeBtn", value:"", text: "Continuar"}} onClick={handleNextClick}/>
                    </div>
                    }
            />
            <DialogDefault
                id={"initialquiz"}
                visible={dialogVisible2}
                onHide={() => setDialogVisible2(false)}
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