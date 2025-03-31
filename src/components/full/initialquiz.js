import React, { useState } from "react";
import DialogDefault from "../basic/dialogdefault";
import CustomButton from "../basic/button";
import CustomDropDown from "../basic/dropdown";
import "./initialquiz.css";

function InitialQuiz(){

    const [dialogVisible1, setDialogVisible1] = useState(true);
    const [dialogVisible2, setDialogVisible2] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    
    const questions = [
        "¿Qué género musical disfrutas más?",
        "¿Cuál de los siguientes artistas escuchas?",
        "¿Qué canción te gusta más?"
    ]

    const answers = [
        ["a1", "a2", "a3"],
        ["b1", "b2", "b3"],
        ["c1", "c2", "c3"],
    ]
    
    const handleNextClick = () => {

        setDialogVisible1(false);
        setDialogVisible2(true);

    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            console.log("End of quiz");
            console.log("Selected Answers:", selectedAnswers);
            setDialogVisible2(false);
        }
    };

    const handleOptionChange = (selectedOption) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentQuestionIndex]: selectedOption
        }));
    };

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
                            <CustomDropDown id={"questionsquiz"} text={"Selecciona una opción"} name={"name"} options={answers[currentQuestionIndex]} value={selectedAnswers[currentQuestionIndex] || ""} onChange={(e) => handleOptionChange(e.target.value)}/>
                            <CustomButton type={"submit"} atributes={{name: "quiznextBtn", value:"", text: "Siguiente"}} onClick={handleNextQuestion}/>
                        </div>
                    </div>
                }
            />
        </div>
    );
}

export default InitialQuiz;