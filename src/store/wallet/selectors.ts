import {memoize, memoizeWithArgs} from "proxy-memoize";
import {RootState} from "@/store";

export const selectTokenBalances = memoize((state: RootState) => state.wallet.tokenBalances);
export const selectTokenBalance = memoizeWithArgs((state: RootState, address: string, chainId: string) => {
    const balances = selectTokenBalances(state);
    return balances[chainId]?.[address] || "0";
})
