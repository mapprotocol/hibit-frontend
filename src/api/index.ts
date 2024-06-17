import axios from 'axios'
export const api = axios.create({
    baseURL: 'https://bibobibo.xyz/api',
    timeout: 10000,
});





export const fetchNonce = async (address: string) => {
    try {
        const response = await api.post('/user/nonce', { walletAddress: address });
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};

export const fetchWatchList = async (address: string) => {
    try {
        console.log()
        const response = await api.get(`/user/watch_list?walletAddress=${address}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};

export const loginRequest = async (nonce: string, signature: string, address: string) => {
    try {
        const response = await api.post('/user/login', {
            nonce,
            signature,
            walletAddress: address
        });
      
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};