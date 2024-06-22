import {TronWeb, providers} from "tronweb";

const TronRpc = "https://api.trongrid.io";
const HttpProvider = providers.HttpProvider;
const fullNode = new HttpProvider(TronRpc, undefined, undefined,undefined, {
    'TRON-PRO-API-KEY': '6c42d887-8df4-4660-9642-a608ba131ecb'
});
const solidityNode = new HttpProvider(TronRpc, undefined, undefined,undefined, {
    'TRON-PRO-API-KEY': '6c42d887-8df4-4660-9642-a608ba131ecb'
});
const fullHost = new HttpProvider(TronRpc, undefined, undefined,undefined, {
    'TRON-PRO-API-KEY': '6c42d887-8df4-4660-9642-a608ba131ecb'
});
const eventServer = new HttpProvider(TronRpc, undefined, undefined,undefined, {
    'TRON-PRO-API-KEY': '6c42d887-8df4-4660-9642-a608ba131ecb'
});
export const tronClient = new TronWeb({fullNode, solidityNode, fullHost, eventServer});


const useTronClient = () => {
    return tronClient;
}

export default useTronClient;
