import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const register = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, credentials);
        return response.data;
    } catch (error) {
        throw new Error (`Error al crear usuario: ${error.response.status}`);
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        throw new Error (`Error al iniciar sesión: ${error.response.status}`);
    }
};

export const meProfile = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/user/me`, { headers: { Authorization: `Bearer ${data.token}` }});
        return response.data;
    } catch (error) {
        throw new Error (`Error al obtener datos del usuario: ${error.response.status}`);
    }
};

export const profileOptions = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/options`);
        return response.data;
    } catch (error) {
        throw new Error (`Error la obtener las opciones de perfil: ${error.response.status}`);
    }
};

export const profileSave = async (profile) => {
    try {
        const response = await axios.post(`${API_URL}/user/save`, profile);
        return response.data;
    } catch (error) {
        throw new Error (`Error al guardar el perfil: ${error.response.status}`);
    }
};

export const quizOptions = async (credentials) => {
    try {
        const response = await axios.get(`${API_URL}/quiz`);
        return response.data;
    } catch (error) {
        throw new Error (`Error al obtener opciones para quiz: ${error.response.status}`);
    }
};

export const saveQuiz = async (answers) => {
    try {
        const response = await axios.post(`${API_URL}/quiz`, answers);
        return response.data;
    } catch (error) {
        throw new Error (`Error al guardar respuestas de quiz: ${error.response.status}`);
    }
};

export const emotion = async (image) => {
    try {
        const formData = new FormData();
        formData.append("file", image);
        const headers = ({headers: { "Content-Type": "multipart/form-data" }});
        const response = await axios.post(`${API_URL}/emotion/analyze`, formData, headers);
        return response.data;
    } catch (error) {
        throw new Error (`Error al analizar emoción: ${error.response.status}`);
    }
};

export const recommendations = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/recommendations`, data);
        return response.data;
    } catch (error) {
        throw new Error (`Error al obtener recomendaciones: ${error.response.status}`);
    }
};

export const saveRecommendation = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/recommendations/save`, data);
        return response.data;
    } catch (error) {
        throw new Error (`Error al guardar recomendación: ${error.response.status}`);
    }
};

export const recommendationsHistory = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/recommendations/history`, { headers: { Authorization: `Bearer ${data.token}` }});
        return response.data;
    } catch (error) {
        throw new Error (`Error al obtener historial: ${error.response.status}`);
    }
};

export const recommendationsLatest = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/recommendations/latest`, { headers: { Authorization: `Bearer ${data.token}` }});
        return response.data;
    } catch (error) {
        throw new Error (`Error al obtener recomendaciones recientes: ${error.response.status}`);
    }
};

export const setRecommendationFeedback = async (id, feedback) => {
    try {
        const response = await axios.patch(`${API_URL}/recommendations/${id}`, feedback);
        return response.data;
    } catch (error) {
        throw new Error (`Error al guardar feedback de la recomendación: ${error.response.status}`);
    }
}

export async function dashboard() {
  const token = localStorage.getItem('token');
  console.log('Llamando a API dashboard con token:', token);

  if (!token) throw new Error('No token found');

  const response = await axios.get('http://localhost:3001/dashboard/weekly-summary', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}