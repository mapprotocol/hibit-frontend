import {EMPTY_ADDRESS} from "@/utils/addresses";
import {useFrom} from "@/store/hooks";
import {useTokenBalance} from "@/store/wallet/hooks";


const isEmptyAddress = (address: string) => {
    return address === EMPTY_ADDRESS;
}


const useFromTokenBalance = () => {
    const from = useFrom();
    console.log(333333,from)
    const balance = useTokenBalance(from?.token?.address || "", from?.chain?.chainId || "");
    console.log(44444,balance)
    return balance || "0";
}

export default useFromTokenBalance;
