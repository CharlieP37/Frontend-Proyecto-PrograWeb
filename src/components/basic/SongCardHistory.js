import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import DialogHeader from '../basic/dialogheader';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { setRecommendationFeedback } from '../../services/api.js';
import './SongCardHistory.css';

const SongCardHistory = ({
  id,
  songName = "",
  artist = "",
  date = "",
  songImageBase64 = "",
  emotionImageBase64 = "",
  url = "",
  feedback
}) => {
  const [reaction, setReaction] = useState(feedback);
  const [Id] = useState(id);
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleSetRecommendationFeedback = async (value) => {
    try {
      const data = ({ token: localStorage.getItem('token'), feedback: value });
      await setRecommendationFeedback(Id, data);
    } catch (error) {
      console.error("Error al actualizar feedbakc de recomendación", error.message);
    };
  };

  const handleLike = async () => {
    if (reaction === 'like') {
      setReaction(null);
      await handleSetRecommendationFeedback(null);
      alert(`Quitaste tu LIKE de "${songName}"`);
    } else {
      setReaction('like');
      await handleSetRecommendationFeedback(true);
      alert(`LIKE a "${songName}"`);
    }
  };

  const handleDislike = async () => {
    if (reaction === 'dislike') {
      setReaction(null);
      await handleSetRecommendationFeedback(null);
      alert(`Quitaste tu DISLIKE de "${songName}"`);
    } else {
      setReaction('dislike');
      await handleSetRecommendationFeedback(false);
      alert(`DISLIKE a "${songName}"`);
    }
  };

  const handleMusic = () => {
    setDialogVisible(true);
  };

  function extractSpotifyTrackId(url) {
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  }

  const likeButtonClass = reaction === 'like' ? 'song-history-active-like' : reaction === 'dislike' ? 'song-history-inactive' : '';
  const dislikeButtonClass = reaction === 'dislike' ? 'song-history-active-dislike' : reaction === 'like' ? 'song-history-inactive' : '';

  return (
    <>
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
            <a
              href={url}
              target='_blank'
              rel="noopener noreferrer"
              className='song-history-link'
            >
              <h3 
                className="song-history-title"
                data-pr-tooltip={songName}
                data-pr-position="top"
              >
                {songName}
              </h3>
            </a>
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
              icon="pi pi-play-circle"
              className='song-listen-window-button'
              onClick={handleMusic}
              tooltip='Reproducir Canción'
              tooltipOptions={{position: "top"}}
            />
            <Button
              icon="pi pi-heart" 
              className={`song-history-like-button ${likeButtonClass}`}
              onClick={handleLike}
              tooltip={reaction === 'like' ? "Quitar like" : "Me gusta"}
              tooltipOptions={{ position: 'top' }}
            />
            <Button 
              icon="pi pi-ban"
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
      {dialogVisible && (
        <DialogHeader
          id={"playerspotify"}
          visible={dialogVisible}
          onHide={() => setDialogVisible(false)}
          children={
            <div className='music-player-preview-container'>
              <iframe
              className='spotify-iframe-custom'
              src={`https://open.spotify.com/embed/track/${extractSpotifyTrackId(url)}`}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Embed"
              ></iframe>
            </div>
          }
        />)}
    </>
  );
};

export default SongCardHistory;