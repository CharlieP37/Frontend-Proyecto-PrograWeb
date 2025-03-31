import React, { useState, useEffect } from 'react';
import '../components/styles.css';
// imports para SongCard
import SongCard from '../components/basic/SongCard';
import imagenCancion from '../assets/logo.svg';
import imagenEmocion from '../assets/logo.svg';
// imports para ImageUploader
import { Dialog } from 'primereact/dialog';
import ImageUploader from '../components/basic/ImageUploader.js'; 
// imports para CamaraCapture
import { Button } from 'primereact/button';
import { CameraCaptureDialog } from '../components/basic/CameraCapture.js';
// imports para ResultRecomendation
import ResultRecommendation from '../components/basic/ResultRecommendation.js';
// imports para SongCardExtend
import SongCardExtend from '../components/basic/SongCardExtend.js';
// imports para Top3CardSong
import Top3CardSong from '../components/basic/Top3CardSong.js';
// imports para SectionHome 
import SectionHome from '../components/full/SectionHome.js';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

 

function TestScreen() {
/*     // Probar el SongCard
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
    }, []);

    return (
        <>
            <SongCard 
                songImage={songImageBase64} 
                artistName="Linkin Park" 
                songName="The Emptiness Machine" 
                emotionImage={emotionImageBase64} 
            />

            
        </>
    ); */


/*     // Probar el ImageUploader
    const [showDialog, setShowDialog] = useState(false);

    return (
        <div style={{ padding: '20px', background: 'var(--background)' }}>
          <button 
            onClick={() => setShowDialog(true)}
            style={{
              padding: '10px 20px',
              background: 'var(--detail1)',
              color: 'var(--font-primary)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Abrir subidor de imágenes
          </button>
    
          <Dialog
            header="Subir fotografía"
            visible={showDialog}
            style={{ width: '90vw', maxWidth: '500px' }}
            onHide={() => setShowDialog(false)}
          >
            <ImageUploader />
          </Dialog>
        </div>
      );  */


/*     // Probar el CameraCapture
  const [showDialog, setShowDialog] = useState(false);

  return React.createElement(
    'div',
    { 
      style: { 
        padding: '20px', 
        minHeight: '100vh',
        backgroundColor: 'var(--background)'
      }
    },
    React.createElement(
      Button,
      {
        label: "Abrir Cámara",
        onClick: function() { setShowDialog(true); },
        className: "open-camera-button"
      }
    ),
    React.createElement(CameraCaptureDialog, {
      visible: showDialog,
      onHide: function() { setShowDialog(false); },
      onSave: function() { 
        alert("Imagen enviada"); 
        setShowDialog(false);
      }
    })
  ); */
      

    /* // Probar el ResultRecomendation
    const [visible, setVisible] = useState(false);

    return (
      <div className="App">
        <button onClick={() => setVisible(true)}>
          Mostrar Recomendación
        </button>
  
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          style={{ width: '750px' }}
          contentStyle={{ 
            padding: '0',
            backgroundColor: 'var(--background)',
            borderRadius: '12px'
          }}
          header={null}
        >
          <ResultRecommendation
            onClose={() => setVisible(false)}
          />
        </Dialog>
      </div>
    ); */


/*     // Probar el SongCardExtend
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
    }, []);
  
    return (
      <div className="app-container">
        <SongCardExtend 
          songName="Linking Park"
          artist="The Emptiness Machine"
          date="20/01/2024"
          songImageBase64={songImageBase64}
          emotionImageBase64={emotionImageBase64}
        />
      </div>
    ); */

/*     // Probar el Top3CardSong
    return (
      <Top3CardSong />
    ); */

  // Probar el SectionHome
  return (
    <SectionHome />
  );


}

export default TestScreen;