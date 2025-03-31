import React from 'react';
import './SelectMethodPhoto.css';
import CustomButton from "../basic/button";

const SelectMethodPhoto = ({ onTakePhoto, onUploadPhoto }) => {
  return (
    <div className="photo-method-selector">
        <CustomButton type={"submit"} atributes={{name: "takefotoBtn", value:"0", text: "Tomar Fotografía"}} onClick={onTakePhoto}/>
        <div className="photo-divider"></div>
        <CustomButton type={"submit"} atributes={{name: "uploadfotoBtn", value:"0", text: "Subir Fotografía"}} onClick={onUploadPhoto}/>
    </div>
  );
};

export default SelectMethodPhoto;
