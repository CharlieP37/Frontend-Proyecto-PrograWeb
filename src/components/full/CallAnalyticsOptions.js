import React, { useState } from "react";
import DialogFull from "../basic/dialogheaderfooter";
import { CameraCaptureDialog } from "../basic/CameraCapture";
import ResultRecommendation from "../basic/ResultRecommendation";
import SelectMethodPhoto from "./SelectMethodPhoto";
import ImageUploader from "../basic/ImageUploader";
import { emotion, recommendations } from "../../services/api";
import "./CallAnalyticsOptions.css";

const CallAnalyticsOptions = ({ children }) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false); 
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [SongRecommendtion, setSongRecommendtion] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCloseResult = () => {
    setShowResult(false);
  };
  
  const handleTakePhoto = () => {
    setDialogVisible(true);
  };

  const handleUploadPhoto = () => {
    setUploadDialogVisible(true);
  };

  const handleSavePhoto = async (image) => {
    setLoading(true);
    try {
      const responseData = await emotion(image);
      if (responseData.response && responseData.response.length > 0) {
        const topEmotion = responseData.response[0].Type;
        setDetectedEmotion(topEmotion);
        await handleMusicRecommendation(topEmotion);
        setDialogVisible(false);
        setShowResult(true);
      }
      else {
        alert(responseData.message || "No se detectaron emociones.");
        setDialogVisible(true);
      }
    } catch (error) {
      console.error("Error al enviar imagen tomada: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSubmit = async (image) => {
    setLoading(true);
    try {
      const responseData = await emotion(image);
      if (responseData.response && responseData.response.length > 0) {
        const topEmotion = responseData.response[0].Type;
        setDetectedEmotion(topEmotion);
        await handleMusicRecommendation(topEmotion);
        setUploadDialogVisible(false);
        setShowResult(true);
      }
      else {
        alert(responseData.message || "No se detectaron emociones.");
      }
    } catch (error) {
      console.error("Error al enviar imagen cargada: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMusicRecommendation = async (emotion) => {
    try {
      const emotionQuery = emotion + " song";
      const responseData = await recommendations({ mood: emotionQuery });
      setSongRecommendtion(responseData);
    } catch (error) {
      console.error("Error al obtener recomendación: ", error.message);
    }
  }

  return (
    <div className="AnalyticsBtnSection">
        <div className="analytics-options-container">
            <div className="analytics-btn-section">
                <SelectMethodPhoto
                    onTakePhoto={handleTakePhoto}
                    onUploadPhoto={handleUploadPhoto} 
                />
            </div>
            <CameraCaptureDialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                onSave={handleSavePhoto}
            />
            <DialogFull
                id="uploadPhoto"
                visible={uploadDialogVisible}
                onHide={() => setUploadDialogVisible(false)}
                headerContent="Subir Foto"
                footerContent={<br/>}
                children={<ImageUploader onSubmit={handleUploadSubmit} />}
            />
            {loading && (
              <div className="loading-overlay">
                <div className="loading-spinner" />
                <p className="loading-text shorttext-secondary-font-style">Analizando emoción y buscando recomendación musical...</p>
              </div>
            )}
            {showResult && (
                <DialogFull
                    id="resultDialog"
                    visible={showResult}
                    onHide={handleCloseResult}
                    headerContent="Resultado de la Recomendación"
                    footerContent={<br/>}
                    children={
                      <ResultRecommendation
                        emotionName={detectedEmotion}
                        artistName={SongRecommendtion.artist}
                        songName={SongRecommendtion.name}
                        songImage={SongRecommendtion.cover}
                        recomendationPhrase="Esta es tu recomendación!"
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
