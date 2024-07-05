const CHAINS:{[key:string]:{chainId:string,name:String,key:string,chainImage:string,nativeToken:string}} = {
    "1": {
        chainId: "1",
        name: "Ethereum",
        key:"ethereum",
        chainImage:"https://s3.amazonaws.com/map-static-file/mapSwap/ethereum.svg",
        nativeToken:"{\"symbol\":\"ETH\",\"address\":\"0x0000000000000000000000000000000000000000\",\"coinKey\":\"ETH\",\"priceUSD\":\"1885.39\",\"chainId\":1,\"decimals\":18,\"name\":\"ETH\",\"logoURI\":\"https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png\"}"
    },
    "8453": {
        chainId: "8453",
        name: "Base",
        key:"base",
        chainImage:"https://map-static-file.s3.amazonaws.com/mapSwap/base.svg",
        nativeToken:"{\"symbol\":\"ETH\",\"address\":\"0x0000000000000000000000000000000000000000\",\"coinKey\":\"ETH\",\"priceUSD\":\"0\",\"chainId\":8453,\"decimals\":18,\"name\":\"ETH\",\"logoURI\":\"https://s3.amazonaws.com/map-static-file/mapSwap/base/0x0000000000000000000000000000000000000000/logo.png\"}"
    },
    "137":{
        chainId: "137",
        name: "Polygon",
        key:"polygon",
        chainImage:"https://s3.amazonaws.com/map-static-file/mapSwap/polygon.svg",
        nativeToken:"{\"symbol\":\"MATIC\",\"address\":\"0x0000000000000000000000000000000000000000\",\"coinKey\":\"MATIC\",\"priceUSD\":\"0.629028\",\"chainId\":137,\"decimals\":18,\"name\":\"MATIC\",\"logoURI\":\"https://static.debank.com/image/matic_token/logo_url/matic/6f5a6b6f0732a7a235131bd7804d357c.png\"}"
    },
    "56":{
        chainId: "56",
        name: "BNB Chain",
        key:"binance-smart-chain",
        chainImage:"https://s3.amazonaws.com/map-static-file/mapSwap/bsc.svg",
        nativeToken:"{\"symbol\":\"BNB\",\"address\":\"0x0000000000000000000000000000000000000000\",\"coinKey\":\"BNB\",\"priceUSD\":\"233.9\",\"chainId\":56,\"decimals\":18,\"name\":\"BNB\",\"logoURI\":\"https://static.debank.com/image/coin/logo_url/bnb/9784283a36f23a58982fc964574ea530.png\"}"
    },
    "59144":{
        chainId: "59144",
        name: "Linea",
        key: "linea",
        chainImage: "https://s3.amazonaws.com/map-static-file/mapSwap/linea.webp",
        nativeToken:"{\"symbol\":\"ETH\",\"address\":\"0x0000000000000000000000000000000000000000\",\"coinKey\":\"ETH\",\"priceUSD\":\"0\",\"chainId\":59144,\"decimals\":18,\"name\":\"ETH\",\"logoURI\":\"https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png\"}"
    },
    "4200":{
        chainId: "4200",
        name: "Merlin Chain",
        key: "merlin",
        chainImage: "https://map-static-file.s3.amazonaws.com/bridge/merlin.jpg",
        nativeToken:"{\"symbol\":\"BTC\",\"address\":\"0x0000000000000000000000000000000000000000\",\"coinKey\":\"BTC\",\"priceUSD\":\"0\",\"chainId\":1501,\"decimals\":18,\"name\":\"BTC\",\"logoURI\":\"https://s3.amazonaws.com/map-static-file/mapSwap/polygon/0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6/logo.png\"}"
    }
};

export default CHAINS;
