import {TokenBalanceProps, WalletProvider} from "./useWallets";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {useCallback} from "react";
import {useWalletModal} from "@solana/wallet-adapter-react-ui";
import {AddressZero} from "@ethersproject/constants";
import {Connection, PublicKey} from "@solana/web3.js";
import {getAccount, getAssociatedTokenAddress, getMint} from "@solana/spl-token";
import {zipWith} from "lodash";
import {formatUnits} from "viem";
import {WalletName} from "@/lib/types";
import {WalletIcons} from "@/lib/configs";

const SOLANE_NATIVE_TOKEN = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"

async function getTokenBalanceSpl(connection: Connection, tokenAccount: string, userAddress: string): Promise<string> {
    const mint = await getMint(connection, new PublicKey(tokenAccount));
    const info = await connection.getParsedTokenAccountsByOwner(new PublicKey(userAddress), {
        mint: mint.address,
    });
    if (info.value && info.value.length > 0) {
        return info.value[0].account.data.parsed.info.tokenAmount.amount.toString();
    }
    return "0"
}

const useSolanaWallet = (): WalletProvider => {
    const name = WalletName.SOLANA;
    const {wallet, publicKey, disconnect} = useWallet();
    const {connection} = useConnection();
    const modal = useWalletModal();

    const connectWallet = useCallback(() => {
        modal.setVisible && modal.setVisible(true)
    }, [modal])

    const disconnectWallet = useCallback(async () => {
        return await disconnect();
    }, [disconnect])

    const getBalances = useCallback(async (tokens: TokenBalanceProps[]) => {
        if (!publicKey || !connection) {
            return [];
        }
        const balances = await Promise.all(tokens.map((token) => {
            if ([AddressZero, SOLANE_NATIVE_TOKEN].includes(token.address)) {
                return connection.getBalance(publicKey);
            }
            return getTokenBalanceSpl(connection, token.address, publicKey.toBase58());
        }))
        return zipWith(tokens, balances, (token, balance) => {
            return formatUnits(BigInt(balance), token.decimals || 18);
        })
    }, [connection, publicKey]);

    const getConnectedWallet = useCallback(() => {
        if (publicKey && wallet) {
            return {
                address: publicKey?.toBase58(),
                connector: wallet?.adapter?.name,
                providerName: name,
                getBalances,
                icon: WalletIcons[WalletName.SOLANA]
            }
        }
    }, [getBalances, publicKey, wallet])

    return {
        name,
        connectWallet,
        disconnectWallet,
        getConnectedWallet,
    }
}

export default useSolanaWallet;
