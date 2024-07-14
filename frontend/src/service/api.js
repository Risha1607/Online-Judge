import axios from 'axios';

const API_URI = 'https://api.codeconquest.online';

export const registerUser = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/register`, data);
        return response.data;
    } catch (error) {
        console.error("Error while calling API:", error);
        throw error;
    }
};

export const uploadinfo = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/login`, data);
        return response.data;  // Ensure this returns the token and user
    } catch (error) {
        console.error("Error while calling API:", error);
        throw error;
    }
};

// Other API functions...

export const fetchProblemsByTopic = async (topicKey) => {
    try {
        const response = await axios.get(`${API_URI}/problems/topic/${topicKey}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching problems by topic:", error);
        throw error;
    }
};

export const fetchProblemById = async (problemId) => {
    try {
        const response = await axios.get(`${API_URI}/problems/${problemId}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching problems by ID:", error);
        throw error;
    }
};

export const getUserData = async (token) => {
    try {
        const response = await axios.get(`${API_URI}/auth/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error while fetching user data:', error);
        throw error;
    }
};

export default {
    registerUser,
    uploadinfo,
    fetchProblemsByTopic,
    fetchProblemById,
    getUserData
};
