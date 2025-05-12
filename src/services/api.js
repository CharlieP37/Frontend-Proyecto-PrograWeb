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

export const emotion = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/emotion/analyze`, data);
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

export const recommendationsHistory = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/recommendations/history`, data);
        return response.data;
    } catch (error) {
        throw new Error (`Error al obtener historial: ${error.response.status}`);
    }
};

export const recommendationsLatest = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/recommendations/latest`, data);
        return response.data;
    } catch (error) {
        throw new Error (`Error al obtener recomendaciones recientes: ${error.response.status}`);
    }
};

export const dashboard = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/dashboard/weekly-summary`, data);
        return response.data;
    } catch (error) {
        throw new Error (`Error al generar informe semanal: ${error.response.status}`);
    }
};