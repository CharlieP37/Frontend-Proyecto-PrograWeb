import React from 'react';
import './ResultRecommendation.css';
import SongCard from './SongCard';
import imagenCancion from '../../assets/logo.svg'; 
import imagenEmocion from '../../assets/logo.svg'; 

const ResultRecommendation = ({ 
  emotionName = "Feliz",
  artistName = "Linkin Park",
  songName = "The Emptiness Machine",
  onClose
}) => {
  return (
    <div className="result-container">
      <div className="emotion-module">
        <h3 className="module-title">Emoción detectada</h3>
        <div className="emotion-image-container">
          <img 
            src={imagenEmocion} 
            alt={`Emoción ${emotionName}`} 
            className="emotion-img" 
          />
        </div>
        <h2 className="detected-emotion">{emotionName}</h2>
      </div>

      <div className="recommendation-module">
        <p className="recommendation-text">
          ¡Tu energía es contagiosa! Aquí tienes una canción para seguir disfrutando el momento.
        </p>
        <div className="song-card-container">
          <SongCard 
            songImage={imagenCancion}
            artistName={artistName}
            songName={songName}
            emotionImage={imagenEmocion} 
          />
        </div>
      </div>
    </div>
  );
};

export default ResultRecommendation;