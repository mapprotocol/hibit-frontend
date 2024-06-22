import {useAppSelector} from "@/store/hooks";
import {selectTokenBalance, selectTokenBalances} from "@/store/wallet/selectors";
import {RootState} from "@/store";

export const useTokenBalances = () => {
    return useAppSelector(selectTokenBalances);
}

export const useTokenBalance = (token: string, chainId: string) => {
    return useAppSelector((state: RootState) => selectTokenBalance(state, token, chainId));
}
