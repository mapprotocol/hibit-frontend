import {useCallback, useState} from "react";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";
import useTronClient from "@/lib/wallets/tron/useTronClient";
import {showError, showSuccess} from "@/utils/notifications";
import {useRouteTxData} from "@/store/route/hooks";

const useSubmitTronBridge = () => {
    const route = useRouteTxData();
    const {wallet, address} = useWallet();
    const tronClient = useTronClient();

    const [bridging, setBridging] = useState(false);
    const submitBridge = useCallback(async () => {
        if (!route || route.length === 0 || !wallet || !address || !tronClient) {
            return;
        }
        for (const txn of route) {
            try {
                setBridging(true);
                let functionSelector = txn.method + "("
                txn.args.map((item: any, index: number) => {
                    if (index !== 0)
                        functionSelector += ","
                    functionSelector += item.type

                })
                functionSelector += ")"
                console.log('txn args', txn)

                const preExecResult = await tronClient.transactionBuilder.triggerConstantContract(
                    txn.to,
                    functionSelector,
                    {
                        callValue: Number(txn.value),
                    },
                    txn.args,
                    address // from address
                );

                if (!preExecResult || !preExecResult.constant_result || preExecResult.constant_result.length === 0) {
                    throw new Error('pre-execute error');
                }
                console.log('pre-execute result:', preExecResult);

                const unsignedTxn = await tronClient.transactionBuilder.triggerSmartContract(
                    txn.to,
                    functionSelector,
                    {
                        callValue: Number(txn.value),
                        feeLimit: 500000000
                    },
                    txn.args,
                    address // from address
                );

                const unsignedTxnData = unsignedTxn.transaction;
                if (!unsignedTxnData)
                    throw new Error('triggerSmartContract failed to create transaction');

                const signedTxn = await wallet.adapter.signTransaction(unsignedTxnData as any);
                const receipt = await tronClient.trx.sendRawTransaction(signedTxn as any);
                console.log(receipt);
                showSuccess("Success!")
                setBridging(false);
            } catch (e: any) {
                setBridging(false);
                showError(e.message);
                console.error(e);
            }
        }
    }, [address, route, tronClient, wallet])

    return {
        bridging,
        submitBridge,
    }
}

export default useSubmitTronBridge;
