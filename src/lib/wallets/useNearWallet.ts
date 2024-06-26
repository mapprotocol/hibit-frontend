import {TokenBalanceProps, WalletProvider} from "./useWallets";
import {useNearWalletSelector} from "@/lib/providers/NearProvider";
import {useCallback} from "react";
import {AddressZero} from "@ethersproject/constants";
import {zipWith} from "lodash";
import {formatUnits} from "viem";
import {WalletName} from "@/lib/types";
import {WalletIcons} from "@/lib/configs";

const useNearWallet = (): WalletProvider => {
    const name = WalletName.NEAR;
    const {modal,selector, accountId, connection} = useNearWalletSelector();
    const connectWallet = useCallback(() => {
        modal.show();
    }, [modal])

    const disconnectWallet = useCallback(async () => {
        const wallet = await selector.wallet()
        return await wallet.signOut();
    }, [selector])

    const getBalances = useCallback( async (tokens: TokenBalanceProps[]) => {
        if (!accountId || !connection) {
            return [];
        }
        const account = await connection?.account(accountId)
        account.getAccountBalance().then((res) => res.available);
        const calls = tokens.map((token) => {
            if (token.address === AddressZero) {
                return account.getAccountBalance().then((res) => res.available);
            }
            return account.viewFunction(
                {
                    contractId: token.address,
                    methodName: "ft_balance_of",
                    args: {
                        account_id: accountId,
                    }
                });
        })
        const balances = await Promise.all(calls);
        return zipWith(tokens, balances, (token, balance) => {
            return formatUnits(BigInt(balance), token.decimals || 18);
        })
    }, [accountId, connection])

    const getConnectedWallet = useCallback(() => {
        if (selector && accountId) {
            return {
                address: accountId,
                connector: "near",
                providerName: name,
                getBalances,
                icon: WalletIcons[WalletName.NEAR]
            }
        }
    }, [accountId, getBalances, selector])
    return {
        connectWallet,
        disconnectWallet,
        getConnectedWallet,
        name
    }
}

export default useNearWallet;
