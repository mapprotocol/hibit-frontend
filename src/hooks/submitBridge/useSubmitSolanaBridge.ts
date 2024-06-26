// import {
//     useFromChain,
//     useFromToken,
//     useInputAmount,
//     useSelectRouteResult, useToChain, useToToken,
// } from "@/store/global/hooks";
// import {useCallback, useMemo, useState} from "react";
// import useWallets from "@/lib/wallets/useWallets";
// import {PublicKey, Transaction, TransactionInstruction} from "@solana/web3.js";
// import {useConnection, useWallet} from "@solana/wallet-adapter-react";
// import {showError} from "@/utils/notifications";
// import {saveHistory} from "@/utils/storage";
// import useToAddress from "@/hooks/useToAddress";
//
// const testTx = "010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000810586a6a14eccce088b63ac92ab7db43b2fb82f8be50509cb311f9966ff32f5baf5768cb602db4f7d2e82457ff2710d33d3430b2aa246adb7d4e145d4a264aefcd6598eabc05148cc8aa18b1aa3204629b9793d290ce5de4573332d8557a459f4a7078d6940087960c9ea2803740e166ec7b3209d6944e1e9a4b1438ea892da2707d2f0b375b003738d85f9bbae2af766691ba85b11e3b4bd2c255c2c7a07d50b785030e2df82f44038c4de2f53a65f9073a746cae3b1f94cfb6ca814a1bb42f079bd9c6aa535b7e736c2f39c43c1a01813f1df4a7ca187ebd05228f2e387c8d4bfc1c92eb908ba081f55bbd9fe641023699fb7ab80b11b9ad4ae0df2cb275c2a7000000000000000000000000000000000000000000000000000000000000000057f2b84b5573b55cf977c8742511d5551e6182baeab5db01a0907b1fca45c9bb8c97258f4e2489f1bb3d1029148e0d830b5a1399daff1084048e7bd8dbe9f859c6fa7af3bedbad3a3d65f36aabc97431b1bbe4c2d2f6e0e47ca60203452f5d61069b8857feab8184fb687f634618c035dac439dc1aeb3b5598a0f0000000000106a7d517192c5c51218cc94c3d4af17f58daee089ba1fd44e3dbd98a0000000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a90e03685f8e909053e458121c66f5a76aedc7706aa11c82f8aa952a8f2b7879a904d9e81e2f0a2e5968b2c91f1a813a41f72d1b833a584b0ec71129c764d4ff2606080200050c020000000000000000000000080200037c03000000586a6a14eccce088b63ac92ab7db43b2fb82f8be50509cb311f9966ff32f5baf20000000000000003642736e7041544e5548515862395062597768594d4763474c4b6e3142613758f0cbc58f02000000a50000000000000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a90e04030c000d01010a060001000b080e000f0b0e000203040106070707092af8c69e91e17587c800aea68f0200000066c4707100000000503b010001000000000000000000000001010e030300000109"
//
// const useSubmitSolanaBridge = ({onComplete}: {onComplete: VoidFunction}) => {
//     const {wallets} = useWallets();
//     const route = useSelectRouteResult();
//     const {wallet, sendTransaction, signAllTransactions} = useWallet();
//     const fromToken = useFromToken();
//     const toToken = useToToken();
//     const fromChain = useFromChain();
//     const toChain = useToChain();
//     const { connection } = useConnection();
//     const toAddress = useToAddress();
//     const amount = useInputAmount();
//     const accountId = useMemo(() => {
//         return wallets.find((wallet) => wallet.providerName === "solana")?.address;
//     }, [wallets])
//     const [bridging, setBridging] = useState(false);
//     const submitBridge = useCallback(async () => {
//         if (!accountId
//             || !route?.tx
//             || !sendTransaction
//             || !fromToken
//             || !fromChain
//             || !toChain
//             || !toToken
//         ) {
//             return;
//         }
//
//         try {
//             setBridging(true);
//             const transaction = new Transaction();
//             const instructions = route.tx.tx.map((item) => {
//                 return new TransactionInstruction({
//                     keys: item.keys.map((key) => {
//                         return {
//                             ...key,
//                             pubkey: new PublicKey(key.pubkey)
//                         }
//                     }),
//                     data: Buffer.from(item.data),
//                     programId: new PublicKey(item.programId)
//                 })
//             })
//             transaction.add(...instructions);
//             const {
//                 context: { slot: minContextSlot },
//             } = await connection.getLatestBlockhashAndContext();
//             const tx = await sendTransaction(transaction, connection, {minContextSlot});
//             await connection.confirmTransaction(tx);
//             setBridging(false);
//             onComplete();
//             saveHistory({
//                 route: route,
//                 params: {
//                     fromToken,
//                     toToken,
//                     fromChain,
//                     toChain,
//                     toAddress: toAddress || "",
//                     slippage: "1",
//                     amount: amount!
//                 },
//                 hash: tx,
//                 timestamp: new Date().getTime(),
//             })
//         } catch (e: any) {
//             showError(e.message);
//             setBridging(false);
//         }
//     }, [accountId, amount, connection, fromChain, fromToken, onComplete, route, sendTransaction, toAddress, toChain, toToken]);
//
//     return {
//         submitBridge,
//         bridging,
//     }
// }
//
// export default useSubmitSolanaBridge;
