import React from 'react';
import './ResultRecommendation.css';
import SongCard from './SongCard';
import imageEmotionHappy from '../../assets/Feliz.svg';
import imageEmotionSad from '../../assets/Triste.svg';
import imageEmotionAngry from '../../assets/Enojado.svg';
import imageEmotionConfused from '../../assets/Confundido.svg';
import imageEmotionDisgusted from '../../assets/Disgustado.svg';
import imageEmotionSurprised from '../../assets/Soprendido.svg';
import imageEmotionCalm from '../../assets/Tranquilo.svg';
import imageEmotionFear from '../../assets/Miedo.svg';
import imageEmotionUnknown from '../../assets/Desconocido.svg';

const emotionImageSelector = (emotion) => {
  switch(emotion){
    case "HAPPY":
      return imageEmotionHappy;
    case "SAD":
      return imageEmotionSad;
    case "ANGRY":
      return imageEmotionAngry;
    case "CONFUSED":
      return imageEmotionConfused;
    case "DISGUSTED":
      return imageEmotionDisgusted;
    case "SURPRISED":
      return imageEmotionSurprised;
    case "CALM":
      return imageEmotionCalm;
    case "FEAR":
      return imageEmotionFear;
    default:
      return imageEmotionUnknown;
  }
};

const ResultRecommendation = ({ 
  emotionName,
  artistName,
  songName,
  songImage,
  recomendationPhrase,
  onClose
}) => {
  return (
    <div className="result-container">
      <div className="emotion-module">
        <h3 className="module-title">Emoción detectada</h3>
        <div className="emotion-image-container">
          <img 
            src={emotionImageSelector(emotionName.toUpperCase())}
            alt={`Emoción ${emotionName}`} 
            className="emotion-img" 
          />
        </div>
        <h2 className="detected-emotion">{emotionName}</h2>
      </div>

      <div className="recommendation-module">
        <p className="recommendation-text">
          {recomendationPhrase}
        </p>
        <div className="song-card-container">
          <SongCard
            songImage={songImage}
            artistName={artistName}
            songName={songName}
            emotionImage={emotionImageSelector(emotionName.toUpperCase())}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultRecommendation;