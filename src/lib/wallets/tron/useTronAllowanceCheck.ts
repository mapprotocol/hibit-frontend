import {useCallback, useEffect, useMemo, useState} from "react";
import useTronClient, {tronClient} from "@/lib/wallets/tron/useTronClient";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";
import useSWR from "swr";
import {TRX_ADDRESS} from "@/lib/wallets/useTronWallet";
import {parseUnits} from "viem";
import {showError, showSuccess} from "@/utils/notifications";
import Trc20Abi from "@/utils/abis/trc20";

const useTronAllowanceCheck = ({
                                   amount,
                                   token,
                                   target
}: {
    amount: number | string,
    token: string,
    target: string
}) => {
    const [allowance, setAllowance] = useState("0");
    const [decimals, setDecimals] = useState(18);
    const [approving, setApproving] = useState(false);
    const {wallet, address, disconnect} = useWallet();
    const tronClient = useTronClient();

    const needApprove = useMemo(() => {
        if (token === TRX_ADDRESS) {
            return false;
        }
        const bigAmount = parseUnits(amount + "", decimals);
        return bigAmount > BigInt(allowance);
    }, [token, amount, decimals, allowance])

    useSWR([address, target, token, tronClient, 'checkTronAllowance'], async ([
        address,
        target,
        token,
        tronClient,
                                                                  ]) => {
        if (!tronClient || !token || !target || !address || token === TRX_ADDRESS) {
            return "0";
        }
        tronClient.setAddress(address);
        const contract = tronClient.contract(Trc20Abi as any, token);
        try {
            const res = await Promise.all([
                contract.methods.decimals().call(),
                contract.methods.allowance(address, target).call()
            ])
            const allowance = res[1][0].toString();
            setAllowance(allowance.toString());
            setDecimals(res[0]);
        } catch (e: any) {
            console.log(e.message);
        }
    }, {
        refreshInterval: 6000,
    })

    const approve = useCallback(async () => {
        if (!address || !token || !target || token === TRX_ADDRESS || !wallet) {
            return;
        }
        try {
            const bigAmount = parseUnits(amount + "", decimals);
            const txn = await tronClient.transactionBuilder.triggerSmartContract(
                token,
                "approve(address,uint256)",
                {
                    callValue: 0,
                },
                [
                    {
                        type: "address",
                        value: target
                    },
                    {
                        type: "uint256",
                        value: bigAmount.toString()
                    }
                ],
                address,
            )
            const res = await wallet.adapter.signTransaction(txn.transaction as any)
            const txRes = await tronClient.trx.sendRawTransaction(res as any);
            showSuccess("Approved!");
        } catch (e: any) {
            console.error(e.message);
            showError(e.message);
        }

    }, [address, amount, decimals, target, token, tronClient.transactionBuilder, tronClient.trx, wallet])

    return {
        approve,
        approving,
        needApprove,
    }
}

export default useTronAllowanceCheck;
