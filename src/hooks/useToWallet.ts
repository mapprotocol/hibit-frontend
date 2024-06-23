import useWallets from "@/lib/wallets/useWallets";
import {useMemo} from "react";
import {useTo} from "@/store/hooks";
import {getWalletNameForChainId} from "@/lib/configs";

const useToWallet = () => {
    const to = useTo();
    const {wallets} = useWallets();
    return useMemo(() => {
        const walletName = getWalletNameForChainId(to?.chain?.chainId);
        return wallets.find((wallet) => wallet.providerName === walletName);
    }, [to, wallets])
}

export default useToWallet;
