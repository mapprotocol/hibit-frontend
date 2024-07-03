import useWallets from "@/lib/wallets/useWallets";
import {useMemo} from "react";
import {getWalletNameForChainId} from "@/lib/configs";
import {useChainId} from "wagmi";

const useCurrentWallet = () => {
    const chainId = useChainId();
    const {wallets} = useWallets();
    return useMemo(() => {
        const walletName = getWalletNameForChainId(chainId);
        return wallets.find((wallet) => wallet.providerName === walletName);
    }, [chainId, wallets])
}

export default useCurrentWallet;
