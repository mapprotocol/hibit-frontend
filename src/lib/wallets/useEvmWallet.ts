import {TokenBalanceProps, WalletProvider} from "./useWallets";
import {useConnectModal} from "@rainbow-me/rainbowkit";
import {Address, erc20ABI, useAccount, useDisconnect} from "wagmi";
import {useCallback} from "react";
import {AddressZero} from "@ethersproject/constants";
import {zipWith} from "lodash";
import {createPublicClient, fallback, formatUnits, http} from "viem";
import {WalletName} from "@/lib/types";
import {WalletIcons} from "@/lib/configs";
import {useChainsMap} from "@/store/global/hooks";
import {transformChain} from "@/lib/transformChain";

const useEvmWallet = (): WalletProvider => {
    const name = WalletName.EVM;
    const {openConnectModal} = useConnectModal();
    const {disconnectAsync} = useDisconnect();
    const account = useAccount();
    const chains = useChainsMap();

    const connectWallet = useCallback(
        () => {
            openConnectModal && openConnectModal();
        },
        [openConnectModal]
    )

    const disconnectWallet = useCallback(
        async () => {
            return disconnectAsync && await disconnectAsync();
        }
        ,[disconnectAsync]
    )

    const getBalances = useCallback( async (tokens: TokenBalanceProps[], chainId?: number) => {

        console.log(`get balance`)
        if (!account.address) {
            return [];
        }
        // const client = getPublicClient({chainId});
        const originalChain = chains[chainId || 1];
        const chain = transformChain(originalChain);
        const client = createPublicClient({
            chain,
            transport: fallback(originalChain.metamask.rpcUrls.map((rpc) => http(rpc))),
        })
        client.batch = {
            multicall: {
                batchSize: 2048,
                wait: 128
            }
        }
        const res = await Promise.all(tokens.map((token) => {
            if (token.address === AddressZero) {
                return client.getBalance({
                    address: account.address as Address
                }).then((balance) => {
                    return balance
                });
            }
            return client.readContract({
                abi: erc20ABI,
                address: token.address as Address,
                args: [account.address as Address],
                functionName: "balanceOf"
            })
        }))
        return zipWith(tokens, res, (token, balance) => {
            console.log(7777777,balance,token.decimals )
            return formatUnits(balance, token.decimals || 18)
        })
    }, [account.address, chains])

    const getConnectedWallet = useCallback(() => {
        if (account && account.address && account.connector) {
            return {
                address: account.address,
                connector: (account.connector as any)?._wallets?.[0]?.id || account.connector.id,
                providerName: name,
                getBalances: getBalances,
                icon: WalletIcons[WalletName.EVM]
            }
        }
    }, [account, getBalances, name])

    return {
        connectWallet,
        disconnectWallet,
        getConnectedWallet,
        name,
    }
}

export default useEvmWallet;
