import {createAsyncThunk} from "@reduxjs/toolkit";
import {Wallet} from "@/lib/wallets/useWallets";
import {isIsomericChain} from "@/lib/configs";

const getTokenBalance = createAsyncThunk<
    {
        address: string,
        balance: string,
        chainId: string,
    } | null,
    { wallet: Wallet | null, tokenAddress: string, decimals: number, chainId: string }
>(
    "wallet/getFromTokenBalance",
    async ({ wallet, tokenAddress, decimals, chainId }) => {
        if (!wallet || !tokenAddress || !decimals) {
            return null;
        }
        console.log(55555,tokenAddress,decimals,chainId)
        const balance = await wallet.getBalances([{ address: tokenAddress, decimals }],
            !isIsomericChain(chainId) ? Number(chainId) : undefined
            );
        console.log(66666,balance)
        return {
            address: tokenAddress,
            balance: balance[0],
            chainId,
        }
    }
)

export default getTokenBalance;
