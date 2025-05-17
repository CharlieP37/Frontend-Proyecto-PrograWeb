import React from 'react';
import './SongCard.css';

const SongCard = ({ songImage, artistName, songName, emotionImage, url }) => {
  return (
    <div className="song-card">
      <div className="song-image-container">
        <img 
          src={songImage} 
          alt={`Cover de ${songName}`} 
          className="song-image" 
        />
      </div>
      
      <div className="song-info">
        <div className="text-content">
          <h2 className="artist-name">{artistName}</h2>
          <a
            href={url}
            target='_blank'
            rel="noopener noreferrer"
            className='song-top-link'
          >
            <h1 className="song-title">{songName}</h1>
          </a>
        </div>
        
        <div className="emotion-container">
          <img 
            src={emotionImage} 
            alt="Emoción" 
            className="emotion-image" 
          />
        </div>
      </div>
    </div>
  );
};

export default SongCard;