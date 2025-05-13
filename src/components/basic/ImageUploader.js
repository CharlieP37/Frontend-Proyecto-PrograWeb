import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './ImageUploader.css';

const ImageUploader = ({ onSubmit }) => { 
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      setImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
      setImage(file);
    }
  };

  const handleSubmit = () => {
    if (image) {
        onSubmit(image);
      }
  };

  return (
    <div className="image-uploader-container">
      <div className="upload-content">
        <div 
          className={`dropzone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          {!image ? (
            <div className="dropzone-content">
              <div className="dashed-border">
                <p>Arrastra y suelta una imagen aquí</p>
              </div>
            </div>
          ) : (
            <div className="image-preview">
              <img 
                src={URL.createObjectURL(image)} 
                alt="Preview" 
              />
              <p>{image.name}</p>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <Button 
            label="Seleccionar fotografía" 
            className="select-button"
            onClick={() => fileInputRef.current.click()}
          />
          <Button 
            label="Enviar" 
            className="submit-button"
            disabled={!image}
            onClick={handleSubmit}
          />
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUploader;
