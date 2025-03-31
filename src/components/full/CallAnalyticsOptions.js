import React, { useState } from "react";
import DialogFull from "../basic/dialogdefault";
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
                footerContent={null}
            >
                <CameraCaptureDialog
                    visible={dialogVisible}
                    onHide={() => setDialogVisible(false)}
                    onSave={handleSavePhoto}
                />
            </DialogFull>

            <DialogFull
                id="uploadPhotoDialog"
                visible={uploadDialogVisible}
                onHide={() => setUploadDialogVisible(false)}
                headerContent="Subir Foto"
                footerContent={null}
            >
                <ImageUploader onSubmit={handleUploadSubmit} />
            </DialogFull>

            {showResult && (
                <DialogFull
                    id="resultDialog"
                    visible={showResult}
                    onHide={handleCloseResult}
                    headerContent="Resultado de la Recomendación"
                    footerContent={null}
                >
                    <ResultRecommendation
                        emotionName="Feliz"
                        artistName="Linkin Park"
                        songName="The Emptiness Machine"
                        onClose={handleCloseResult}
                    />
                </DialogFull>
            )}

            {children}
        </div>
    </div>
  );
};

export default CallAnalyticsOptions;
