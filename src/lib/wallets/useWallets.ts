import {ReactNode, useCallback, useMemo} from "react";
import useEvmWallet from "./useEvmWallet";
import useSolanaWallet from "./useSolanaWallet";
import {showError} from "@/utils/notifications";
import useNearWallet from "./useNearWallet";
import useTronWallet from "@/lib/wallets/useTronWallet";

export type TokenBalanceProps = {
    address: string,
    decimals?: number
}

export type Wallet = {
    address: string | `0x${string}`;
    providerName: string
    icon?: string;
    connector?: string;
    metadata?: any;
    chainId?: string | number
    getBalances: (tokens: TokenBalanceProps[], chainId?: number) => Promise<string[]>
}


export type WalletProvider = {
    connectWallet: (chain?: string | number | undefined | null) => Promise<void> | undefined | void,
    disconnectWallet: () => Promise<void> | undefined | void,
    getConnectedWallet: () => Wallet | undefined,
    name: string;
}

export default function useWallets() {
    const evm = useEvmWallet();
    const solana = useSolanaWallet();
    const near = useNearWallet();
    const tron = useTronWallet();
    const WalletProviders: WalletProvider[] = useMemo(() => {
        return [evm, solana, near, tron];
    }, [evm, solana, near])

    const handleConnect = useCallback((providerName: string, chain?: string | number) => {
        const provider = WalletProviders.find((provider) => provider.name === providerName);
        try {
            provider?.connectWallet(chain);
        } catch {
            console.error("Couldn't connect the account");
        }
    }, [WalletProviders])

    const handleDisconnect = useCallback(async (providerName: string) => {
        const provider = WalletProviders.find((provider) => provider.name === providerName);
        try {
            await provider?.disconnectWallet();
        } catch (e) {
            showError("Couldn't disconnect the account")
        }
    }, [WalletProviders])

    const getConnectedWallets = useCallback(() => {
        let connectedWallets: Wallet[] = [];
        WalletProviders.forEach((wallet) => {
            const w = wallet.getConnectedWallet();
            connectedWallets = w ? [...connectedWallets, w] : [...connectedWallets];
        })
        return connectedWallets;
    }, [WalletProviders])
    return {
        wallets: getConnectedWallets(),
        connectWallet: handleConnect,
        disconnectWallet: handleDisconnect,
    }
}
