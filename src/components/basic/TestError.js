import React from 'react';
import * as Sentry from '@sentry/react';

const TestSentry = () => {
  const triggerError = () => {
    try {
      // Método 1: Captura manual con Sentry
      throw new Error("¡Error de prueba para verificar Sentry!");
    } catch (error) {
      Sentry.captureException(error);
      console.error("Error capturado y enviado a Sentry:", error);
    }

    // Método 2: Alternativa directa
    // Sentry.captureException(new Error("¡Error directo a Sentry!"));
  };

  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      marginTop: '50px'
    }}>
      <h2>Prueba de Integración con Sentry</h2>
      <button
        onClick={triggerError}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#ff4d4f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Generar Error de Prueba
      </button>
    </div>
  );
};

export default TestSentry;