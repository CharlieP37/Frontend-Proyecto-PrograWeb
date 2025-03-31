import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './actionbar.css';
import imagenCancion from '../../assets/LinkingrkP.svg';
import imagenEmocion from '../../assets/Feliz.svg';
import { convertImportedImageToBase64 } from './imageUtils';

const ActionBar = ({ 
  songName = "Linking Park", 
  artist = "The Emptiness Machine", 
  songImageBase64 = "",
  emotionImageBase64 = ""
}) => {
  const [reaction, setReaction] = useState(null);
  const [songImage, setSongImage] = useState("");
  const [emotionImage, setEmotionImage] = useState("");

  useEffect(() => {
    const loadImages = async () => {
      const songImg = songImageBase64 || imagenCancion;
      const emotionImg = emotionImageBase64 || imagenEmocion;
      
      const songBase64 = await convertImportedImageToBase64(songImg);
      const emotionBase64 = await convertImportedImageToBase64(emotionImg);
      
      if (songBase64) setSongImage(songBase64);
      if (emotionBase64) setEmotionImage(emotionBase64);
    };
    
    loadImages();
  }, [songImageBase64, emotionImageBase64]);

  const handleLike = () => {
    if (reaction === 'like') {
      setReaction(null);
      alert(`Quitaste tu LIKE de "${songName}"`);
    } else {
      setReaction('like');
      alert(`LIKE a "${songName}"`);
    }
  };

  const handleDislike = () => {
    if (reaction === 'dislike') {
      setReaction(null);
      alert(`Quitaste tu DISLIKE de "${songName}"`);
    } else {
      setReaction('dislike');
      alert(`DISLIKE a "${songName}"`);
    }
  };

  const likeButtonClass = reaction === 'like' ? 'song-history-active-like' : reaction === 'dislike' ? 'song-history-inactive' : '';
  const dislikeButtonClass = reaction === 'dislike' ? 'song-history-active-dislike' : reaction === 'like' ? 'song-history-inactive' : '';

  return (
    <div className="song-card-container">
      <div className="song-card-main">
        <div className="song-image-container">
          {songImage ? (
            <img 
              src={songImage} 
              alt={`Portada de ${songName}`} 
              className="song-image"
            />
          ) : (
            <div className="song-image-placeholder">
              <i className="pi pi-music" />
            </div>
          )}
        </div>

        <div className="song-text-info">
          <p className="song-artist">{artist}</p>
          <h3 className="song-title">{songName}</h3>
        </div>

        <div className="emotion-image-container">
          {emotionImage ? (
            <img 
              src={emotionImage} 
              alt="Emoción de la canción"
              className="emotion-image"
            />
          ) : (
            <div className="emotion-placeholder">
              <i className="pi pi-image" />
            </div>
          )}
        </div>

        <div className="song-actions">
          <Button 
            icon="pi pi-heart" 
            className={`song-history-like-button ${likeButtonClass}`}
            onClick={handleLike}
            tooltip={reaction === 'like' ? "Quitar like" : "Me gusta"}
            tooltipOptions={{ position: 'top' }}
          />
          <Button 
            icon="pi pi-heart-fill" 
            className={`song-history-dislike-button ${dislikeButtonClass}`}
            onClick={handleDislike}
            tooltip={reaction === 'dislike' ? "Quitar dislike" : "No me gusta"}
            tooltipOptions={{ position: 'top' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionBar;