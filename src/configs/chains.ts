const CHAINS:{[key:string]:{chainId:string,name:String,key:string,chainImage:string}} = {
    "1": {
        chainId: "1",
        name: "Ethereum",
        key:"ethereum",
        chainImage:"https://s3.amazonaws.com/map-static-file/mapSwap/ethereum.svg"
    },
    "8453": {
        chainId: "8453",
        name: "Base",
        key:"base",
        chainImage:"https://map-static-file.s3.amazonaws.com/mapSwap/base.svg"
    },
    "137":{
        chainId: "137",
        name: "Polygon",
        key:"polygon",
        chainImage:"https://s3.amazonaws.com/map-static-file/mapSwap/polygon.svg"
    },
    "56":{
        chainId: "56",
        name: "BNB Chain",
        key:"binance-smart-chain",
        chainImage:"https://s3.amazonaws.com/map-static-file/mapSwap/bsc.svg"
    },
    "59144":{
        chainId: "59144",
        name: "Linea",
        key: "linea",
        chainImage: "https://s3.amazonaws.com/map-static-file/mapSwap/linea.webp",
    },
    "324":{
        chainId: "324",
        name: "zksync",
        key: "zksync",
        chainImage: "https://icons.llamao.fi/icons/chains/rsz_zksync%20era?w=48&h=48",
    },
    "42161":{
        chainId: "42161",
        name: "arbitrum-one",
        key: "arbitrum-one",
        chainImage: "https://icons.llamao.fi/icons/chains/rsz_arbitrum?w=48&h=48",
    }
};

export default CHAINS;
