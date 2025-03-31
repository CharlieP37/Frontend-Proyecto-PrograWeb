import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';
import imagenCancion1 from '../../assets/LinkingrkP.svg';
import imagenEmocion1 from '../../assets/Feliz.svg';
import imagenCancion2 from '../../assets/ImagineDragons.jpg';
import imagenEmocion2 from '../../assets/Tranquilo.svg';
import imagenCancion3 from '../../assets/ThreeDaysGrace.jpg';
import imagenEmocion3 from '../../assets/Enojado.svg';
import './Top3CardSong.css';

const Top3CardSong = () => {
    const songs = [
        {
            artist: "Linkin Park",
            title: "The Emptiness Machine",
            songImageUrl: imagenCancion1,
            emotionImageUrl: imagenEmocion1
        },
        {
            artist: "Imagine Dragons",
            title: "Woke-Demo",
            songImageUrl: imagenCancion2,
            emotionImageUrl: imagenEmocion2
        },
        {
            artist: "Three Days Grace",
            title: "Painkiller",
            songImageUrl: imagenCancion3,
            emotionImageUrl: imagenEmocion3
        }
    ];

    return (
        <div className="top3-container">
            <h2 className="top3-title">Últimas 3 recomendaciones</h2>
            
            <div className="songs-list">
                {songs.map((song, index) => (
                    <SongCardWrapper 
                        key={index}
                        imagenCancion={song.songImageUrl}
                        imagenEmocion={song.emotionImageUrl}
                        artistName={song.artist}
                        songName={song.title}
                    />
                ))}
            </div>
        </div>
    );
};

const SongCardWrapper = ({ imagenCancion, imagenEmocion, artistName, songName }) => {
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
        />
    );
};

export default Top3CardSong;