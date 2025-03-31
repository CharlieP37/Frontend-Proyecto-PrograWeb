import React from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from 'primereact/inputtext';
import "./input.css";

function CustomInput({ type, atributes, value, onChange, ...rest}){

    return(
        <div className="input-container" id={atributes.name + "Container"}>
            <FloatLabel className="custom-floatlabel" id={atributes.name + "FloatLabel"}>
                <InputText className ="custom-input" type={type} id={atributes.name} name={atributes.name} value={value} onChange={(e) => {if (onChange) {onChange(e);}}} {...rest}/>
                <label id={atributes.name + "Label"} htmlFor={atributes.name}>{atributes.label}</label>
            </FloatLabel>
        </div>
    );

};

export default CustomInput;