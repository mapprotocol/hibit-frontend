import {ChainItem} from "@/utils/api/types";
import {Chain} from "wagmi";

export const transformChain = (chainItem: ChainItem): Chain => {
    return {
        id: Number(chainItem.chainId),
        name: chainItem.name,
        network: chainItem.metamask.chainName,
        nativeCurrency: {
            decimals: chainItem.nativeToken.decimals,
            name: chainItem.nativeToken.name,
            symbol: chainItem.nativeToken.symbol
        },
        rpcUrls: {
            default: {
                http: chainItem.metamask.rpcUrls
            },
            public: {
                http: chainItem.metamask.rpcUrls
            }
        },
        blockExplorers: {
            default: {
                name: "",
                url: chainItem.metamask.blockExplorerUrls[0]
            }
        }
    };
};
