import React, { useState } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './SongCardExtend.css';

const SongCardExtend = ({ 
  songName = "Linking Park", 
  artist = "The Emptiness Machine", 
  date = "20/01/2024",
  songImageBase64 = "",
  emotionImageBase64 = ""
}) => {
  const [reaction, setReaction] = useState(null);

  const handleLike = () => {
    if (reaction === 'like') {
      setReaction(null);
      alert(`uitaste tu LIKE de "${songName}"`);
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

  const likeButtonClass = reaction === 'like' ? 'active-like' : reaction === 'dislike' ? 'inactive' : '';
  const dislikeButtonClass = reaction === 'dislike' ? 'active-dislike' : reaction === 'like' ? 'inactive' : '';

  return (
    <div className="song-card-container">
      <div className="song-card-main">
        <div className="song-image-container">
          {songImageBase64 ? (
            <img 
              src={songImageBase64} 
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
          {emotionImageBase64 ? (
            <img 
              src={emotionImageBase64} 
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
            className={`like-button ${likeButtonClass}`}
            onClick={handleLike}
            tooltip={reaction === 'like' ? "Quitar like" : "Me gusta"}
            tooltipOptions={{ position: 'top' }}
          />
          <Button 
            icon="pi pi-heart-fill" 
            className={`dislike-button ${dislikeButtonClass}`}
            onClick={handleDislike}
            tooltip={reaction === 'dislike' ? "Quitar dislike" : "No me gusta"}
            tooltipOptions={{ position: 'top' }}
          />
        </div>

        <div className="song-date-container">
          <p className="song-date">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default SongCardExtend;