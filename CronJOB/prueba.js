function sendDocument(messageData) {
    const data = {
      number: messageData.number,
      mediatype: "document",
      mimetype: "application/pdf",
      media: messageData.media, // URL del PDF
      fileName: messageData.fileName,
      caption: messageData.caption
    };
  
    const options = {
      method: 'POST',
      headers: {
        'apikey': 'C83E5B8C0F0A-48EA-9CF2-027ED2679B4C', // Tu API Key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  
    fetch('https://apievo.3w.pe/message/sendMedia/Avisos-02', options)
      .then(response => response.json())
      .then(responseData => {
        console.log('Respuesta del servidor:', responseData);
      })
      .catch(error => {
        console.error('Error al enviar el documento:', error);
      });
  }
  
  // Ejemplo de uso de la función
  const messageData = {
    number: "51916628409",  // Número de teléfono
    media: "https://cdn.3w.pe/masivo/82a0dcea-54bd-49e5-bb5b-83ca88a3a9dd-WebSocket.pdf",  // URL del PDF
    fileName: "documento.pdf",  // Nombre del archivo
    caption: "Este es un documento PDF enviado."  // Descripción del archivo
  };
  
  // Llamada a la función
  sendDocument(messageData);
  