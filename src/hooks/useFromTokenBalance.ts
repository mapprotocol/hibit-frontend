import {EMPTY_ADDRESS} from "@/utils/addresses";
import {useFrom} from "@/store/hooks";
import {useTokenBalance} from "@/store/wallet/hooks";


const isEmptyAddress = (address: string) => {
    return address === EMPTY_ADDRESS;
}


const useFromTokenBalance = () => {
    const from = useFrom();
    const balance = useTokenBalance(from?.token?.address || "", from?.chain?.chainId || "");
    return balance || "0";
}

export default useFromTokenBalance;
