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


export const fetchOrderList = async (tokenId:string|number) => {
    try {
        console.log()
        const response = await api.get(`/trades/history?tokenId=${tokenId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};

export const fetchTokenInfo = async (tokenId:string) => {
    try {
        console.log()
        const response = await api.get(`/token/info?tokenId=${tokenId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};

export const fetchVoteList = async (tokenId:string|number) => {
    try {
        console.log()
        const response = await api.get(`/token/votes?tokenId=${tokenId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};


export const updateVote = async (tokenId:string|number,walletAddress: string, voteType: string) => {
    try {
        const response = await api.post(`/token/votes`, {
            tokenId:tokenId,
            walletAddress: walletAddress,
            voteType:voteType
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};

export const fetchMyTokenTrade = async (walletAddress: string, id: string) => {
    try {
        console.log()
        const response = await api.get(`/trades/user?walletAddress=${walletAddress}&tokenId=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};

export const searchToken = async (content: string) => {
    try {
        const response = await api.get(`/token/search?search=${content}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};
export const searchTokenTrending = async () => {
    try {
        const response = await api.get(`/token/trending`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};


export const updateWatchList = async (walletAddress: string, id: string) => {
    try {
        const response = await api.post(`/user/watch_list`, {
            walletAddress: walletAddress,
            tokenId: id
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};


export const getTopgainerList = async () => {
    try {
        const response = await api.get(`/topgainer/list`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};


export const fetchTokenComments = async (tokenid: string) => {
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
    tokenId: string
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

export const trades = async (tokenId: string, address: string) => {
    try {
        const response = await api.post('/trades/user', {
            tokenId: tokenId,
            walletAddress: address,
            tradeType: "buy",
            tradePrice: "0.1",
            tradeAmount: '100'

        });

        return response.data;
    } catch (error) {
        console.error('Error fetching nonce:', error);
        throw error;
    }
};
