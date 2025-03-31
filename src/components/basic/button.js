import React, { useState } from "react";
import "./button.css";

function CustomButton({ type, atributes, ...rest}){
    const [isHovered, setIsHovered] = useState(false);

    return(
        <div className="button-container" style={{ backgroundColor: isHovered ? "var(--font-primary)" : "var(--detail1)" }} id={atributes.name + "Container"}>
            <button className ="custom-button button-action-font-style" type={type} id={atributes.name} value={atributes.value} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} {...rest}>{atributes.text}</button>
        </div>
    );

};

export default CustomButton;