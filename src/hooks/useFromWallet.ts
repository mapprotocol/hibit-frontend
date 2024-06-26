import useWallets from "@/lib/wallets/useWallets";
import {useMemo} from "react";
import {useFrom} from "@/store/hooks";
import {getWalletNameForChainId} from "@/lib/configs";

const useFromWallet = () => {
    const from = useFrom();
    const {wallets} = useWallets();
    return useMemo(() => {
        const walletName = getWalletNameForChainId(from?.chain?.chainId);
        return wallets.find((wallet) => wallet.providerName === walletName);
    }, [from, wallets])
}

export default useFromWallet;
