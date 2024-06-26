import {useInputAddress, useTo} from "@/store/hooks";
import { useMemo } from "react";
import useToWallet from "@/hooks/useToWallet";

const useToAddress = () => {
    const inputToAddress = useInputAddress();
    const toWallet = useToWallet();
    return useMemo(() => {
        return inputToAddress || toWallet?.address;
    }, [toWallet?.address, inputToAddress]);
}

export default useToAddress;
