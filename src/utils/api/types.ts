export type TokenItem = {
    id: number,
    chainId: string,
    address: string,
    blockchainNetwork: string,
    coingeckoId: string,
    price:string,
    decimals: number,
    image: string,
    name: string,
    rank: number,
    symbol: string,
    tokenSecurity: null,
    usdprice: number,
    usedIniframe: number,
    balance?: string,
    tokenId:string
}

export interface MetamaskData {
    chainName: string,
    blockExplorerUrls: string[],
    chainId: string,
    nativeCurrency: {
        symbol: string,
        decimals: number,
        name: string
    },
    rpcUrls: string[]
}

export interface NativeTokenData {
    symbol: string,
    address: string,
    coinKey: string,
    priceUSD: string,
    chainId: number,
    decimals: number,
    name: string,
    logoURI: string
}

export type ChainItem = {
    isBlock: number
    id: number,
    chainId: string,
    chainType: "EVM" | "Near",
    coin: string,
    key: string,
    logoUri: string,
    mainnet: 0 | 1,
    metamask: MetamaskData,
    multicallAddress: string,
    name: string,
    nativeToken: NativeTokenData,
    tokenlistUrl: string,
}

export interface ChainTokenSelectedItem {
    chain: ChainItem | null,
    token: TokenItem | null,
}


export interface NewOrderObj {
    tokenId: string,
    walletAddress: string,
    tradeType: string,
    tradeAmount: string,
    tradePrice: string,
    hash: string,
    symbol: string,
    image: string,
}


export interface RouteTokenItem {
    address: string,
    name: string,
    decimals: number,
    symbol: string,
    icon: string
}

export interface RouteSubRouteItem {
    amountIn: string,
    amountOut: string,
    dexName: string,
    path: []
}

export interface RouteChainItem {
    bridge: string,
    chainId: string,
    tokenIn: RouteTokenItem,
    tokenOut: RouteTokenItem,
    totalAmountIn: string,
    totalAmountOut: string,
    route: RouteSubRouteItem[],
    singleRoute?: RouteSubRouteItem,
}

export interface RouteObj {
    diff: string,
    bridgeFee: {
        amount: string,
        symbol: string
    },
    tradeType: number,
    gasFee: {
        amount: string,
        symbol: string
    },
    gasEstimated: string,
    hash: string,
    srcChain: RouteChainItem,
    bridgeChain: RouteChainItem,
    dstChain: RouteChainItem,
    minAmountOut: {
        amount: string,
        symbol: string
    },
    timeEstimated: number
}


export interface RouteTxData {
    to: string,
    data: string,
    value: string,
    method?: string,
    chainId: string,
    args: {
        type: string,
        value: any
    }[]
}

export interface UserSwapHistoryChainItem {
    id: number | null,
    chainId: string | null,
    chainName: string | null,
    scanUrl: string | null,
    chainImg: string | null
}

export interface UserSwapHistoryTokenItem {
    id: number,
    chainId: number,
    address: string,
    name: string,
    symbol: string,
    icon: string | null,
    decimal: number,
    isMainCurrency: number
}

export interface UserSwapHistoryResponseItem {
    receiveTokenDict: any
    id: number,
    sourceAddress: string,
    destinationAddress: string,
    fromChainId: string,
    toChainId: string,
    sourceHash: string,
    sourceHeight: number,
    destinationHash: string | null,
    destinationHeight: number | null,
    orderId: string,
    sourceTokenAddress: string,
    destinationTokenAddress: string | null,
    amount: number,
    type: number,
    state: number,
    timestamp: string,
    sourceChain: UserSwapHistoryChainItem,
    destinationChain: any,
    bridgeTokenDict: any,
    sourceToken: UserSwapHistoryTokenItem,
    destinationToken: any | null,
    inAmount: number | null,
    completeTime: string | null,
    isMessageBridge: number,
    relayerChain: UserSwapHistoryChainItem | null,
    relayerChainId: string | null,
    relayerHash: string | null,
    relayerHeight: number | null
}

export interface UserSwapHistoryDetailResponse {
    info: {
        receiveToken: any
        receiveAmount: any
        bridgeToken: any
        bridgeAmount: number
        "id": 106179,
        "fromChain": UserSwapHistoryChainItem,
        "relayerChain": UserSwapHistoryChainItem,
        "toChain": UserSwapHistoryChainItem,
        "tokenAddress": string,
        "tokenSymbol": string,
        "timestamp": string,
        "completeTime": string,
        "amount": number,
        "inAmount": number,
        "fee": string,
        "state": number,
        "sourceHash": string,
        "relayerHash": string,
        "toHash": string,
        "sourceAddress": string,
        "toAddress": string,
        "fromTokenDecimal": number,
        "sourceToken": UserSwapHistoryTokenItem,
        "destinationToken": UserSwapHistoryTokenItem,
        "feeToken": UserSwapHistoryTokenItem,
        "isMessageBridge": 0
    }
}
