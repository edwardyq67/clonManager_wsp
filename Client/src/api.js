import axios from "axios";

// Base URL para la API
const API_URL = "http://localhost:5001/api";
// const API_URL = 'http://10.10.10.3:5000/api';

// Función para obtener las instancias
export const fetchInstances = async () => {
  try {
    const response = await axios.get(`${API_URL}/instances`);
    return response.data;
  } catch (error) {
    console.error("Error al recuperar instancias:", error);
    throw error;
  }
};

export const createInstance = async (instanceName) => {
  try {
    const response = await axios.post(`${API_URL}/create-instance`, {
      instanceName,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la instancia:", error);
    throw error;
  }
};

export const logoutInstance = async (instanceName) => {
  try {
    const response = await axios.delete(
      `${API_URL}/logout-instance/${instanceName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error logging out instance:", error);
    throw error.response?.data || error;
  }
};

export const deleteInstance = async (instanceName) => {
  try {
    const response = await axios.delete(
      `${API_URL}/delete-instance/${instanceName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting instance:", error);
    throw error.response?.data || error;
  }
};

// Función para generar el QR de una instancia
export const generateQrCode = async (instanceName) => {
  try {
    const response = await axios.get(`${API_URL}/generate-qr/${instanceName}`);
    return response.data; // Se espera que esto devuelva el base64
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error.response?.data || error;
  }
};

export const deleteCampaignApi = async (itemId) => {
  try {
    const responseDeleteCam = await axios.delete(
      `http://5.161.42.50:3000/campaigns/deleteCampaign`,
      {
        data: { idCampaign: itemId }, // Pasamos 'idCampaign' en el cuerpo de la solicitud
      }
    );

    return responseDeleteCam.data;
  } catch (error) {
    console.log("Error en eliminar campaña: ", error);
    return {
      success: 3,
      message: "Error al conectar con la API. Intenta de nuevo.",
    };
  }
};

export const checkInstanceExists = async (name) => {
  try {
    // Llamada a la API para obtener todas las instancias
    const response = await axios.get("http://localhost:5000/api/instances");
    const instances = response.data; // Suponemos que la respuesta contiene el array de instancias

    // Verificamos si alguna instancia tiene el mismo nombre
    const instanceExists = instances.some((instance) => instance.name === name);

    return instanceExists; // Devuelve true si la instancia existe
  } catch (error) {
    console.error("Error checking instance existence:", error);
    return false; // Si hay un error, asumimos que no existe
  }
};

// Función para enviar WhatsApp usando la API local
export const sendWhatsApp = async (idmensaje, Tenvio, Ninstancia, Cenvio) => {
  try {
    const response = await axios.post(`${API_URL}/send-whatsapp/envio`, {
      idmensaje,
      Tenvio,
      Ninstancia,
      Cenvio,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    throw error.response?.data || error;
  }
};

// Función para registrar una campaña de WhatsApp usando la API local
export const registerCampaign = async (
  campania,
  titulo,
  mensaje,
  tipo,
  cantidad,
  telefonosNombres,
  media,
  FormatoData,
  setLoading
) => {
  try {
    setLoading(true); // Activar el indicador de carga

    let imgUrl = ""; // URL de la imagen (inicialmente vacía)

    // Si el tipo es "imagen" y media no está vacío, subir la imagen
    if (tipo === "imagen" || tipo === "video" || tipo === "pdf") {
      const formImg = new FormData();
      formImg.append("bucket", "masivo");
      formImg.append("file", media);

      // Subir la imagen al servidor
      const imgResponse = await axios.post(
        "https://cloud.3w.pe/media2",
        formImg,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Asegúrate de configurar el encabezado
          },
        }
      );

      // Obtener la URL de la imagen subida
      imgUrl = imgResponse.data.url;
    }
    const requestBody = {
      Campania: campania,
      Titulo: titulo,
      Mensaje: mensaje,
      Tipo: tipo,
      Cantidad: cantidad,
      Empresa: "Yego",
      TelefonosNombres: telefonosNombres,
      Media: imgUrl,
      fecha_pendiente: FormatoData,
    };
    const response = await axios.post(
      `http://localhost:5000/api/sendwhatsapp/registro`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error registering campaign:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  } finally {
    setLoading(false); // Desactivar el indicador de carga
  }
};

// // Función para obtener el resumen de WhatsApp usando la API local
// export const getWhatsAppSummary = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/send-whatsapp/resumen`);
//         // const response = await axios.get('http://10.10.10.10:5000/api/sendwhatsapp/resumen');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching WhatsApp summary:', error);
//         throw error.response?.data || error;
//     }
// };

// Función para obtener el resumen de WhatsApp usando la API local
export const getWhatsAppSummary = async () => {
  try {
    // Añadir el parámetro empresa con valor 'Monterrico'
    const response = await axios.get(`${API_URL}/send-whatsapp/resumen`, {
      params: {
        empresa: "Yego",
      },
    });

    // const response = await axios.get('http://10.10.10.10:5000/api/sendwhatsapp/resumen');
    return response.data;
  } catch (error) {
    console.error("Error al obtener el resumen de WhatsApp:", error);
    throw error.response?.data || error;
  }
};

export const postWspState = async (idcampania, estado) => {
  try {
    const response = await axios.post(`${API_URL}/send-whatsapp/estado`, {
      idcampania: idcampania,
      estado: estado,
    });
    return response.data;
  } catch (error) {
    console.error("Error change whatasapp status:", error);
    throw error.response?.data || error;
  }
};

export const getCallSummary = async () => {
  try {
    const response = await axios.get(`${API_URL}/send-call/resumenCall`);
    // const response = await axios.get('http://5.161.42.50:3000/campaigns');
    return response.data;
  } catch (error) {
    console.error("Error fetching WhatsApp summary:", error);
    throw error.response?.data || error;
  }
};

// Función para registrar una campaña de WhatsApp usando la API local
export const registerCamapaingCall = async (campaign, numbers, audio_url) => {
  try {
    // const response = await axios.post(`${API_URL}/send-call/startCall`, {
    const response = await axios.post("http://5.161.42.50:3000/start-call", {
      campaign: campaign,
      numbers: numbers,
      audio_url: audio_url,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering campaign:", error);
    throw error.response?.data || error;
  }
};

export const login = async (idacceso, contraseña) => {
  try {
    const reponse = await axios.post(`${API_URL}/login`, {
      idacceso,
      contraseña,
    });
    return reponse.data;
  } catch (error) {
    console.error("Error login", error);
    throw error;
  }
};

export const IdSendmessagewhatsapp = async () => {
  try {
    const response = await axios.get(`http://188.245.38.255:5000/api/sendwhatsapp/colaenvio/?empresa=yego`);

    // Verifica si el arreglo tiene datos antes de intentar acceder
    if (response.data.length > 0 && response.data[0].idSendmessagewhatsapp) {
      return response.data[0].idSendmessagewhatsapp;
    } else {
      return "No hay registros en la cola de envío."; // Mensaje si el arreglo está vacío o no contiene la propiedad
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return "No hay registros en la cola de envío."; // Mensaje para error 404
    }
    throw error; // Lanza otros errores
  }
};


export const FirstfechaPendienteCached=async()=>{
  try {
    const response = await axios.get(`http://188.245.38.255:5000/api/sendwhatsapp/FirstfechaPendienteCached`);
    return response.data[0];
  } catch (error) {
    console.error("Error al recuperar instancias:", error);
    throw error;
  }
}

export const MessageActive=async()=>{
  try {
    const response = await axios.get(`http://188.245.38.255:5000/api/sendwhatsapp/MessageActive`);
    return response.data;
  } catch (error) {
    console.error("Error al recuperar instancias:", error);
    throw error;
  }
}