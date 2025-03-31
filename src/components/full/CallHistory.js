import React, { useState, useEffect } from 'react';
import SongCardHistory from "../basic/SongCardHistory";

import imagenCancion1 from '../../assets/LinkingrkP.svg';
import imagenEmocion1 from '../../assets/Feliz.svg';
import imagenCancion2 from '../../assets/ImagineDragons.jpg';
import imagenEmocion2 from '../../assets/Tranquilo.svg';
import imagenCancion3 from '../../assets/ThreeDaysGrace.jpg';
import imagenEmocion3 from '../../assets/Enojado.svg';
import imagenCancion4 from '../../assets/AJR.jpg';
import imagenEmocion4 from '../../assets/Feliz.svg';

const CallHistory = ({children}) => {
    const [songImage1Base64, setSongImage1Base64] = useState('');
    const [emotionImage1Base64, setEmotionImage1Base64] = useState('');

    const [songImage2Base64, setSongImage2Base64] = useState('');
    const [emotionImage2Base64, setEmotionImage2Base64] = useState('');

    const [songImage3Base64, setSongImage3Base64] = useState('');
    const [emotionImage3Base64, setEmotionImage3Base64] = useState('');

    const [songImage4Base64, setSongImage4Base64] = useState('');
    const [emotionImage4Base64, setEmotionImage4Base64] = useState('');

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
            console.error("Error al convertir imagen a Base64:", error);
            return null;
        }
    };

    useEffect(() => {
        const loadImages = async () => {
            const song1Base64 = await imageUrlToBase64(imagenCancion1);
            const emotion1Base64 = await imageUrlToBase64(imagenEmocion1);
    
            const song2Base64 = await imageUrlToBase64(imagenCancion2);
            const emotion2Base64 = await imageUrlToBase64(imagenEmocion2);
    
            const song3Base64 = await imageUrlToBase64(imagenCancion3);
            const emotion3Base64 = await imageUrlToBase64(imagenEmocion3);
    
            const song4Base64 = await imageUrlToBase64(imagenCancion4);
            const emotion4Base64 = await imageUrlToBase64(imagenEmocion4);
    
            console.log("Song 1 Base64: ", song1Base64);
            console.log("Emotion 1 Base64: ", emotion1Base64);
    
            setSongImage1Base64(song1Base64);
            setEmotionImage1Base64(emotion1Base64);
    
            setSongImage2Base64(song2Base64);
            setEmotionImage2Base64(emotion2Base64);
    
            setSongImage3Base64(song3Base64);
            setEmotionImage3Base64(emotion3Base64);
    
            setSongImage4Base64(song4Base64);
            setEmotionImage4Base64(emotion4Base64);
        };
    
        loadImages();
    }, []);
    

    return (
        <div className="main-right-menu-container">
            <div className="right-menu-content-container">
                {children}
                <SongCardHistory
                    songName="Song 1"
                    artist="Artist 1"
                    date="01/01/2024"
                    songImage={songImage1Base64}
                    emotionImage={emotionImage1Base64}
                />
                <SongCardHistory
                    songName="Song 2"
                    artist="Artist 2"
                    date="02/01/2024"
                    songImage={songImage2Base64}
                    emotionImage={emotionImage2Base64}
                />
                <SongCardHistory
                    songName="Song 3"
                    artist="Artist 3"
                    date="03/01/2024"
                    songImage={songImage3Base64}
                    emotionImage={emotionImage3Base64}
                />
                <SongCardHistory
                    songName="Song 4"
                    artist="Artist 4"
                    date="04/01/2024"
                    songImage={songImage4Base64}
                    emotionImage={emotionImage4Base64}
                />
            </div>
        </div>
    );
};

export default CallHistory;
