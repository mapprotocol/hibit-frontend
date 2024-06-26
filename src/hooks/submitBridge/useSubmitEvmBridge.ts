// import {useCallback, useState} from "react";
// import {usePublicClient, useWalletClient} from "wagmi";
// import {prepareSendTransaction, waitForTransaction} from "@wagmi/core";
// import {useAppDispatch} from "@/store/hooks";
// import useToAddress from "@/hooks/useToAddress";
//
// const useSubmitEvmBridge = ({onComplete}: {onComplete: VoidFunction}) => {
//     const fromToken = useFromToken();
//     const toToken = useToToken();
//     const fromChain = useFromChain();
//     const toChain = useToChain();
//     const route = useSelectRouteResult();
//     const {data: signer} = useWalletClient();
//     const toAddress = useToAddress();
//     const [bridging, setBridging] = useState(false);
//     const inputAmount = useInputAmount();
//     const dispatch = useAppDispatch();
//     const client = usePublicClient();
//     const submitBridge = useCallback(async () => {
//         if (signer && route && route.tx && fromToken && fromChain && toToken && toChain) {
//             try {
//                 setBridging(true);
//                 dispatch(updateGlobalError(null));
//                 let gasParams = {};
//                 if (route.fees?.gas) {
//                     gasParams = {
//                         gasPrice: BigInt(route.fees.gas.gasPrice) * BigInt(140) / BigInt(100),
//                         gasLimit: BigInt(route.fees.gas.gasLimit),
//                     }
//                 }
//                 const res = await signer.sendTransaction({
//                     to: route.tx.to as `0x${string}`,
//                     data: route.tx.data as `0x${string}`,
//                     value: BigInt(route.tx.value),
//                     ...gasParams
//                 });
//                 await waitForTransaction({hash: res});
//                 onComplete();
//                 setBridging(false);
//                 saveHistory({
//                     route: route,
//                     params: {
//                         fromToken: fromToken,
//                         toToken,
//                         fromChain,
//                         toChain,
//                         toAddress: toAddress || "",
//                         slippage: "1",
//                         amount: inputAmount!
//                     },
//                     hash: res,
//                     timestamp: new Date().getTime(),
//                 })
//             } catch (e: any) {
//                 console.log(e);
//                 setBridging(false);
//                 dispatch(updateGlobalError({
//                     type: "error",
//                     message: transformMetamaskError(e)
//                 }));
//             }
//         }
//     }, [signer, route, fromToken, fromChain, toToken, toChain, dispatch, onComplete, toAddress, inputAmount]);
//
//     return {
//         submitBridge,
//         bridging,
//     }
// }
//
// export default useSubmitEvmBridge;
