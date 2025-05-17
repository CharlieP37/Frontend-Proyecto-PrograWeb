import React, { useState, useEffect } from 'react';
import SongCardHistory from "../basic/SongCardHistory";
import { convertImportedImageToBase64 } from '../basic/imageUtils.js';
import { recommendationsHistory } from '../../services/api.js';
import imageEmotionHappy from '../../assets/Feliz.svg';
import imageEmotionSad from '../../assets/Triste.svg';
import imageEmotionAngry from '../../assets/Enojado.svg';
import imageEmotionConfused from '../../assets/Confundido.svg';
import imageEmotionDisgusted from '../../assets/Disgustado.svg';
import imageEmotionSurprised from '../../assets/Soprendido.svg';
import imageEmotionCalm from '../../assets/Tranquilo.svg';
import imageEmotionFear from '../../assets/Miedo.svg';
import imageEmotionUnknown from '../../assets/Desconocido.svg';
import "./CallHistory.css";

const CallHistory = ({ children }) => {
    const [songs, setSongs] = useState([]);
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');
                const data = await recommendationsHistory({token});
                setSongs(data.result);
                await loadAllImages(data.result);
            } catch (err) {
                setError('Error al cargar el historial de recomendaciones.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const loadAllImages = async (songs) => {
            const loadedImages = {};

            const loaders = songs.map(async (song, index) => {
                try {
                    loadedImages[`song${index}`] = await convertImportedImageToBase64(song.image);
                    loadedImages[`emotion${index}`] = await convertImportedImageToBase64(emotionImageSelector(song.emotion));
                } catch (e) {
                    loadedImages[`song${index}`] = '';
                    loadedImages[`emotion${index}`] = '';
                }
            });

            await Promise.all(loaders);
            setImages(loadedImages);
        };

        fetchHistory();
    }, []);

    return (
        <div className="main-right-menu-container history-right-alternative-container">
            <div className='history-main-container'>
                {loading ? (<p className='status-message'>Cargando historial...</p>) :
                error ? (<p className='status-message error'>{error}</p>) :
                !loading && !error && songs.length === 0 ? (<p className='status-message'>No hay historial de recomendaciones.</p>) :
                (
                <>
                    {songs.map((song, index) => (
                        <SongCardHistory
                            key={song.id}
                            id={song.id}
                            songName={song.title}
                            artist={song.artist}
                            date={song.date}
                            songImageBase64={images[`song${index}`]}
                            emotionImageBase64={images[`emotion${index}`]}
                            url={song.URL}
                            feedback={song.feedback === true ? "like" : song.feedback === false ? "dislike" : null}
                        />
                    ))}
                    {children}
                </>)}
            </div>
        </div>
    );
};

export default CallHistory;