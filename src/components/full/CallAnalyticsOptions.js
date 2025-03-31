import React, { useState } from "react";
import DialogFull from "../basic/dialogheaderfooter";
import { CameraCaptureDialog } from "../basic/CameraCapture";
import ResultRecommendation from "../basic/ResultRecommendation";
import SelectMethodPhoto from "./SelectMethodPhoto";
import ImageUploader from "../basic/ImageUploader";
import "./CallAnalyticsOptions.css";

const CallAnalyticsOptions = ({ children }) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false); 
  const [capturedImage, setCapturedImage] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleTakePhoto = () => {
    setDialogVisible(true);
  };

  const handleUploadPhoto = () => {
    setUploadDialogVisible(true);
  };

  const handleSavePhoto = (image) => {
    setCapturedImage(image);
    setShowResult(true); 
    setDialogVisible(false);
  };

  const handleCloseResult = () => {
    setShowResult(false);
  };

  
  const handleUploadSubmit = () => {
    setUploadDialogVisible(false); 
    setShowResult(true);
  };

  return (
    <div className="AnalyticsBtnSection">
        <div className="analytics-options-container">
            <div className="analytics-btn-section">
                <SelectMethodPhoto
                    onTakePhoto={handleTakePhoto}
                    onUploadPhoto={handleUploadPhoto} 
                />
            </div>

            <DialogFull
                id="photoDialog"
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                headerContent="Tomar Foto"
                footerContent={<br/>}
                children={
                  <CameraCaptureDialog
                    visible={dialogVisible}
                    onHide={() => setDialogVisible(false)}
                    onSave={handleSavePhoto}
                />
                }
            />
            <DialogFull
                id="uploadPhoto"
                visible={uploadDialogVisible}
                onHide={() => setUploadDialogVisible(false)}
                headerContent="Subir Foto"
                footerContent={<br/>}
                children={<ImageUploader onSubmit={handleUploadSubmit} />}
            />
            {showResult && (
                <DialogFull
                    id="resultDialog"
                    visible={showResult}
                    onHide={handleCloseResult}
                    headerContent="Resultado de la Recomendación"
                    footerContent={<br/>}
                    children={
                      <ResultRecommendation
                        emotionName="Feliz"
                        artistName="Linkin Park"
                        songName="The Emptiness Machine"
                        onClose={handleCloseResult}
                    />
                    }
                >
                </DialogFull>
            )}
        </div>
    </div>
  );
};

export default CallAnalyticsOptions;
