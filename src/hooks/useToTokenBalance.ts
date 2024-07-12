import {EMPTY_ADDRESS} from "@/utils/addresses";
import {useFrom, useTo} from "@/store/hooks";
import {useTokenBalance} from "@/store/wallet/hooks";


const isEmptyAddress = (address: string) => {
    return address === EMPTY_ADDRESS;
}


const useToTokenBalance = () => {
    const to = useTo()
    const balance = useTokenBalance(to?.token?.address || "", to?.chain?.chainId || "");
    return balance || "0";
}

export default useToTokenBalance;
