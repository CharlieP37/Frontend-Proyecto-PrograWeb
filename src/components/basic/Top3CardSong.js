import React, { useState, useEffect } from 'react';
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
import './Top3CardSong.css';

const Top3CardSong = ({ songList }) => {

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

    return (
        <div className="top3-container">
            <h2 className="top3-title">Últimas recomendaciones</h2>
            
            <div className="songs-list">
                {songList.map((song, index) => (
                    <SongCardWrapper 
                        key={index}
                        imagenCancion={song.image}
                        imagenEmocion={emotionImageSelector(song.emotion)}
                        artistName={song.artist}
                        songName={song.title}
                        url={song.URL}
                    />
                ))}
            </div>
        </div>
    );
};

const SongCardWrapper = ({ imagenCancion, imagenEmocion, artistName, songName, url }) => {
    const [songImageBase64, setSongImageBase64] = useState("");
    const [emotionImageBase64, setEmotionImageBase64] = useState("");

    const imageUrlToBase64 = async (imageUrl) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Error converting image to Base64:", error);
            return null;
        }
    };

    useEffect(() => {
        const loadImages = async () => {
            const songBase64 = await imageUrlToBase64(imagenCancion);
            const emotionBase64 = await imageUrlToBase64(imagenEmocion);
            
            if (songBase64) setSongImageBase64(songBase64);
            if (emotionBase64) setEmotionImageBase64(emotionBase64);
        };

        loadImages();
    }, [imagenCancion, imagenEmocion]);

    return (
        <SongCard 
            songImage={songImageBase64} 
            artistName={artistName} 
            songName={songName} 
            emotionImage={emotionImageBase64}
            url={url}
        />
    );
};

export default Top3CardSong;