import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import DialogHeader from '../basic/dialogheader';
import { convertImportedImageToBase64 } from './imageUtils';
import './actionbar.css';

const ActionBar = ({ 
  id,
  songName = "", 
  artist = "", 
  songImageBase64 = "",
  emotionImageBase64 = "",
  url = ""
}) => {
  const [songImage, setSongImage] = useState("");
  const [emotionImage, setEmotionImage] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const songImg = songImageBase64;
      const emotionImg = emotionImageBase64;
      
      const songBase64 = await convertImportedImageToBase64(songImg);
      const emotionBase64 = await convertImportedImageToBase64(emotionImg);
      
      if (songBase64) setSongImage(songBase64);
      if (emotionBase64) setEmotionImage(emotionBase64);
    };
    
    loadImages();
  }, [songImageBase64, emotionImageBase64, id]);

  const handleMusic = () => {
    setDialogVisible(true);
  };

  function extractSpotifyTrackId(url) {
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  }

  return (
    <>
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
            <a
              href={url}
              target='_blank'
              rel="noopener noreferrer"
              className='song-actionbar-link'
            >
              <h3 className="song-title">{songName}</h3>
            </a>
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
              icon="pi pi-play-circle"
              className='song-listen-window-button'
              onClick={handleMusic}
              tooltip='Reproducir Canción'
              tooltipOptions={{position: "top"}}
            />
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

export default ActionBar;