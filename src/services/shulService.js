import axios from 'axios';

const ShulService = {
    fetchShuls: async () => {
        try {
            const response = await axios.get('/api/proxy');
            console.log(response.data);
            return response.data; // Return the data to the caller
        } catch (error) {
            console.error('Error fetching Shuls data:', error);
            throw error; // Rethrow the error to handle it in the caller
        }
    },
};

export default ShulService;
