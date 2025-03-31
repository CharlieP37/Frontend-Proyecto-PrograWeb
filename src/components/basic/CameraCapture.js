import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './CameraCapture.css';

export function CameraCaptureDialog({ visible, onHide, onSave }) {
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isCapturing, setIsCapturing] = useState(true);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Iniciar cámara
  const startCamera = async function() {
    try {
      if (streamRef.current) {
        stopCamera();
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });

      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setError(null);
      setIsCapturing(true);
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      setError("No se pudo acceder a la cámara. Por favor verifica los permisos.");
      setIsCapturing(false);
    }
  };

  // Detener cámara
  const stopCamera = function() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(function(track) {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Tomar foto
  const captureImage = function() {
    if (!videoRef.current || !streamRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob(function(blob) {
      if (blob) {
        const file = new File([blob], 'captura-' + Date.now() + '.jpg', { type: 'image/jpeg' });
        setCapturedImage(file);
        setIsCapturing(false);
        stopCamera();
      }
    }, 'image/jpeg', 0.9);
  };

  // Guardar foto
  const saveImage = function() {
    if (capturedImage && onSave) {
      onSave(capturedImage);
    }
    if (onHide) onHide();
  };

  // Reiniciar captura
  const retakePhoto = function() {
    setCapturedImage(null);
    startCamera();
  };

  // Limpieza al desmontar
  useEffect(function() {
    if (visible) {
      startCamera();
    } else {
      stopCamera();
      setCapturedImage(null);
    }
    return function() {
      stopCamera();
    };
  }, [visible]);

  const renderFooter = function() {
    if (capturedImage) {
      return (
        React.createElement('div', { className: 'dialog-footer' },
          React.createElement(
            Button,
            {
              label: "Tomar otra foto",
              icon: "pi pi-refresh",
              onClick: retakePhoto,
              className: "p-button-text"
            }
          ),
          React.createElement(
            Button,
            {
              label: "Guardar foto",
              icon: "pi pi-check",
              onClick: saveImage,
              className: "save-button"
            }
          )
        )
      );
    }
    return null;
  };

  return React.createElement(
    Dialog,
    {
      header: "Tomar Fotografía",
      visible: visible,
      style: { width: '90vw', maxWidth: '500px' },
      onHide: onHide,
      footer: renderFooter(),
      className: "camera-dialog"
    },
    error ? (
      React.createElement(
        'div',
        { className: 'error-message' },
        React.createElement('i', { className: 'pi pi-exclamation-triangle' }),
        React.createElement('p', null, error),
        React.createElement(
          Button,
          {
            label: "Intentar de nuevo",
            onClick: startCamera,
            className: "retry-button"
          }
        )
      )
    ) : capturedImage ? (
      React.createElement(
        'div',
        { className: 'photo-preview' },
        React.createElement('img', { 
          src: URL.createObjectURL(capturedImage),
          alt: "Captura",
          className: "captured-image"
        })
      )
    ) : (
      React.createElement(
        'div',
        { className: 'camera-view' },
        React.createElement('video', {
          ref: videoRef,
          autoPlay: true,
          playsInline: true,
          muted: true,
          className: "camera-feed"
        }),
        isCapturing && React.createElement(
          Button,
          {
            label: "Capturar",
            icon: "pi pi-camera",
            onClick: captureImage,
            className: "capture-button"
          }
        )
      )
    )
  );
}