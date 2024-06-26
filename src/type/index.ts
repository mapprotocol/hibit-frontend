export interface Coin {
    chainId: number;
    createdAt: string;
    fee: number;
    highprice: string;
    holders: number;
    id: number;
    liquidity: string;
    lowprice: string | null;
    marketCap: string;
    maxSupply: string | null;
    price: string;
    price1h: string;
    price5m: string;
    price6h: string;
    priceChangePercent: string;
    priceChangePercent1h: string;
    priceChangePercent1m: string;
    priceChangePercent5m: string;
    swaps1h: number;
    swaps5m: number;
    swaps6h: number;
    swaps24h: number;
    tokenAddress: string;
    tokenDecimal: number;
    tokenLogoUrl: string;
    tokenName: string;
    totalSupply: string;
    updatedAt: string;
    volume: string;
    volume24: string;
}

interface User {
    avatarUrl: string | null;
    id: number;
    username: string;
}

export interface Comment {
    approved: boolean;
    commentType: string;
    createdAt: string;
    id: number;
    imageUrl: string | null;
    text: string;
    tokenId: number;
    tradeAmount: number | null;
    tradeType: string | null;
    updatedAt: string;
    user: User;
    userId: number;
}