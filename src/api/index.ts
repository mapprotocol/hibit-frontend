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

export const fetchTokenList = async () => {
    try {
        console.log()
        const response = await api.get(`/token/list`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};


export const fetchMyTokenTrade = async (walletAddress: string, id: number) => {
    try {
        console.log()
        const response = await api.get(`/trades/user?walletAddress=${walletAddress}&tokenId=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};

export const fetchTokenComments = async (tokenid: number) => {
    try {
        console.log()
        const response = await api.get(`/comments/token?tokenId=${tokenid}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};

export const sendComment = async ({
    walletAddress,
    tokenId,
    text,
    commentType,
    tradeType
}: {

    walletAddress: string
    tokenId: number
    text?: string
    commentType: string
    tradeType?: string
    tradeAmount?: string
}) => {
    try {
        console.log()
        const response = await api.post(`/comments/token/user`, {
            walletAddress,
            tokenId,
            text,
            approved: true,
            commentType,
            tradeType
        });
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