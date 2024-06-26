import {WalletName} from "@/lib/types";

const NEAR_CHAINID = "1360100178526209";
const SOLANA_CHAINID = "solana";
const TRON_CHAINID = "728126428";


export const IsomericChainIds: {
    [key: string]: string
} = {
    [WalletName.NEAR]: NEAR_CHAINID,
    [WalletName.SOLANA]: SOLANA_CHAINID,
    [WalletName.TRON]: TRON_CHAINID
}

export const isIsomericChain = (chainId: string | number) => {
    return Object.values(IsomericChainIds).includes(chainId + "");
}

export const getWalletNameForChainId = (chainId?: string | number) => {
    if (!chainId) return WalletName.EVM;
    for (const key in IsomericChainIds) {
        if (IsomericChainIds[key] === chainId + "") {
            return key as WalletName;
        }
    }
    return WalletName.EVM;
}

export const WalletIcons = {
    [WalletName.NEAR]: "https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png",
    [WalletName.TRON]: "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png",
    [WalletName.SOLANA]: "/images/wallets/solana.svg",
    [WalletName.EVM]: "/images/wallets/ethereum.svg"
}
