import {TokenBalanceProps, WalletProvider} from "@/lib/wallets/useWallets";
import {useWalletModal} from "@tronweb3/tronwallet-adapter-react-ui";
import {useCallback} from "react";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";
import {AddressZero} from "@ethersproject/constants";
import {zipWith} from "lodash";
import {formatUnits} from "viem";
import {tronClient} from "@/lib/wallets/tron/useTronClient";
import Trc20Abi from "@/utils/abis/trc20";
import {WalletName} from "@/lib/types";
import {WalletIcons} from "@/lib/configs";

export const TRX_ADDRESS = "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb";

const useTronWallet = (): WalletProvider => {
    const name = WalletName.TRON;
    const {visible, setVisible} = useWalletModal();
    const {wallet, address, disconnect} = useWallet();
    const connectWallet = useCallback(() => {
        setVisible(true);
    }, [setVisible])
    const disconnectWallet = useCallback(async () => {
        return await disconnect();
    }, [disconnect]);

    const getBalances = useCallback( async (tokens: TokenBalanceProps[]) => {
        if (!address || !tronClient) {
            return [];
        }
        const calls = tokens.map((token) => {
            if (token.address === TRX_ADDRESS) {
                return tronClient.trx.getBalance(address)
            }
            const contract = tronClient.contract(Trc20Abi, token.address);
            return contract.methods.balanceOf(address).call();
        })
        tronClient.setAddress(address);
        const balances = await Promise.all(calls);
        return zipWith(tokens, balances, (token, balance) => {
            return formatUnits(BigInt(balance), token.decimals || 18);
        })
    }, [address])

    const getConnectedWallet = useCallback(() => {
        if (wallet && address) {
            return {
                address: address,
                connector: "tron",
                providerName: name,
                getBalances,
                icon: WalletIcons[WalletName.TRON]
            }
        }
    }, [address, wallet])

    return {
        connectWallet,
        disconnectWallet,
        getConnectedWallet,
        name
    }
}


export default useTronWallet;
