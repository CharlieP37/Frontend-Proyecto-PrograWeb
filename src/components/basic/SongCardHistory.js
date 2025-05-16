import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './SongCardHistory.css';

const SongCardHistory = ({ 
  songName = "",
  artist = "",
  date = "",
  songImageBase64 = "",
  emotionImageBase64 = ""
}) => {
  const [reaction, setReaction] = useState(null);

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
    <div className="song-history-container">
      <div className="song-history-main">
        <div className="song-history-image-container">
          {songImageBase64 ? (
            <img 
              src={songImageBase64} 
              alt={`Portada de ${songName}`} 
              className="song-history-image"
            />
          ) : (
            <div className="song-history-image-placeholder">
              <i className="pi pi-music" />
            </div>
          )}
        </div>

        <div className="song-history-text-info">
          <Tooltip target=".song-history-artist" />
          <Tooltip target=".song-history-title" />
          
          <p 
            className="song-history-artist"
            data-pr-tooltip={artist}
            data-pr-position="top"
          >
            {artist}
          </p>
          <h3 
            className="song-history-title"
            data-pr-tooltip={songName}
            data-pr-position="top"
          >
            {songName}
          </h3>
        </div>

        <div className="song-history-emotion-container">
          {emotionImageBase64 ? (
            <img 
              src={emotionImageBase64} 
              alt="Emoción de la canción"
              className="song-history-emotion-image"
            />
          ) : (
            <div className="song-history-emotion-placeholder">
              <i className="pi pi-image" />
            </div>
          )}
        </div>

        <div className="song-history-actions">
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

        <div className="song-history-date-container">
          <p className="song-history-date">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default SongCardHistory;