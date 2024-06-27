import axios from 'axios';

const API_URI = 'http://localhost:8000';

const uploadinfo = async(data) => {
    try {
        const response = await axios.post(`${API_URI}/login`, data);
        console.log("API response:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error while calling API:", error.message);
        throw error;
    }
}

export const fetchProblemsByTopic = async (topicKey) => {
    try {
        const response = await axios.get(`${API_URI}/problems/topic/${topicKey}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching problems by topic:", error);
        throw error;
    }
};


export default uploadinfo;