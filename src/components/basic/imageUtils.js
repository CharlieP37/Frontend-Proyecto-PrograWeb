export const convertImportedImageToBase64 = async (importedImage) => {
    try {
      if (typeof importedImage === 'string' && importedImage.startsWith('data:image')) {
        return importedImage;
      }
      
      if (typeof importedImage === 'string') {
        const response = await fetch(importedImage);
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }
      
      return null;
    } catch (error) {
      console.error('Error al convertir imagen a Base64:', error);
      return null;
    }
  };