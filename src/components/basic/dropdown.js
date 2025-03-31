import React from "react";
import { Dropdown } from 'primereact/dropdown';
import "./dropdown.css"

function CustomDropDown({id, name, text, options, value, onChange, ...rest}) {

    const t = "custom-dropdown-panel "+ id +"-dropdown-panel";

    return (
        <div className="card flex justify-content-center">
            <div className="dropdown-container" id={id + "Container"}>
                <Dropdown id={id + "Dropdown"} value={value} onChange={onChange} options={options} optionLabel={name}
                    placeholder={text} className="w-full md:w-14rem custom-dropdown" panelClassName={ t } dropdownIcon={"pi pi-arrow-down custom-pi"} collapseIcon={"pi pi-arrow-down custom-pi"}/>
            </div>
        </div>
    );

}

export default CustomDropDown;