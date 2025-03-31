import React, { useState, useEffect } from 'react';
import SongCardHistory from "../basic/SongCardHistory";
import { convertImportedImageToBase64 } from '../basic/imageUtils.js';

import imagenCancion1 from '../../assets/LinkingrkP.svg';
import imagenEmocion1 from '../../assets/Feliz.svg';
import imagenCancion2 from '../../assets/ImagineDragons.jpg';
import imagenEmocion2 from '../../assets/Tranquilo.svg';
import imagenCancion3 from '../../assets/ThreeDaysGrace.jpg';
import imagenEmocion3 from '../../assets/Enojado.svg';
import imagenCancion4 from '../../assets/AJR.jpg';
import imagenEmocion4 from '../../assets/Feliz.svg';

const CallHistory = ({ children }) => {
    const [images, setImages] = useState({
        song1: '',
        emotion1: '',
        song2: '',
        emotion2: '',
        song3: '',
        emotion3: '',
        song4: '',
        emotion4: ''
    });

    const songs = [
        {
            id: 1,
            name: "The Emptiness Machine",
            artist: "Linkin Park",
            date: "01/01/2024",
            songImage: imagenCancion1,
            emotionImage: imagenEmocion1
        },
        {
            id: 2,
            name: "Woke-Demo",
            artist: "Imagine Dragons",
            date: "02/01/2024",
            songImage: imagenCancion2,
            emotionImage: imagenEmocion2
        },
        {
            id: 3,
            name: "Painkiller",
            artist: "Three Days Grace",
            date: "03/01/2024",
            songImage: imagenCancion3,
            emotionImage: imagenEmocion3
        },
        {
            id: 4,
            name: "Weak",
            artist: "AJR",
            date: "04/01/2024",
            songImage: imagenCancion4,
            emotionImage: imagenEmocion4
        }
    ];

    useEffect(() => {
        const loadAllImages = async () => {
            const loadedImages = {};
            
            const imageLoaders = songs.map(async (song, index) => {
                const songKey = `song${index + 1}`;
                const emotionKey = `emotion${index + 1}`;
                
                try {
                    loadedImages[songKey] = await convertImportedImageToBase64(song.songImage);
                    loadedImages[emotionKey] = await convertImportedImageToBase64(song.emotionImage);
                } catch (error) {
                    console.error(`Error loading images for song ${index + 1}:`, error);
                    loadedImages[songKey] = '';
                    loadedImages[emotionKey] = '';
                }
            });

            await Promise.all(imageLoaders);
            setImages(loadedImages);
        };

        loadAllImages();
    }, []);

    return (
        <div className="main-right-menu-container">
            {songs.map((song, index) => (
                <SongCardHistory
                    key={song.id}
                    songName={song.name}
                    artist={song.artist}
                    date={song.date}
                    songImageBase64={images[`song${index + 1}`]}
                    emotionImageBase64={images[`emotion${index + 1}`]}
                />
            ))}
            {children}
        </div>
    );
};

export default CallHistory;