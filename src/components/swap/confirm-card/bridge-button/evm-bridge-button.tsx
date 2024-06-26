import useEvmAllowance from "@/hooks/allowance/useEvmAllowance";
import {useRouteTxData} from "@/store/route/hooks";
import {Button} from "@mantine/core";
import {useTranslation} from "next-i18next";
import {useCallback, useState} from "react";
import {ethers} from "ethers";
import {useNetwork, usePublicClient, useWalletClient} from "wagmi";
import {prepareSendTransaction} from "@wagmi/core";
import {sleep} from "@/utils/timeout";
import {showError, showSuccess} from "@/utils/notifications";
import {RouteObj} from "@/utils/api/types";
import {useAmount, useAppDispatch, useAppSelector, useFrom} from "@/store/hooks";
import useFromWallet from "@/hooks/useFromWallet";
import {setShowConfirmCard} from "@/store/global/global-slice";
import {setCurrentHistoryData} from "@/store/route/routes-slice";
import useToAddress from "@/hooks/useToAddress";

const EvmBridgeButton = () => {
    const {t} = useTranslation("common");
    const dispatch = useAppDispatch();
    const routeRxData = useRouteTxData();
    const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
    const { chain } = useNetwork();
    const fromWallet = useFromWallet();
    const toAddress = useToAddress();
    const {
        needApprove,
        approve,
    } = useEvmAllowance({data: routeRxData || []})
    const { data: signer } = useWalletClient();
    const [loading, setLoading] = useState(false);
    const [approving, setApproving] = useState(false);
    const amount = useAmount();
    const from = useFrom();
    const handleTapApprove = async () => {
        try {
            setApproving(true);
            // if (isTron(Number(from?.chain?.chainId))) {
            //     const res = await tronConnector.approve(from?.token?.address as string, ethers.utils.parseUnits(amount, from?.token?.decimals).toString())
            //
            // } else {
                const res = await approve(ethers.utils.parseUnits(amount, from?.token?.decimals).toString());
            // }
            setApproving(false);
            // onClose();
        } catch (e: any) {
            // showError(e.message);
            setApproving(false);
        }
    }

    console.log(routeRxData, "data")
    const publicClient = usePublicClient({ chainId: Number(from?.chain?.chainId) || 0 });
    const handleTapConfirm = useCallback(async () => {
        // if (isNear(Number(from?.chain?.chainId))) {
        //     handleBridgeNear();
        //     return;
        // } else if (isTron(Number(from?.chain?.chainId))) {
        //     setLoading(true);
        //     await handleBridgeTron()
        //     setLoading(false);
        //
        //     return;
        // }
        if (!routeRxData || !fromWallet) return;
        try {
            setLoading(true);
            const request = await prepareSendTransaction({
                to: routeRxData[0].to as `0x${string}`,
                data: routeRxData[0].data as `0x${string}`,
                value: BigInt(routeRxData[0].value || 0),
                chainId: Number(routeRxData[0].chainId)
            })
            const hash = await signer?.sendTransaction({
                ...request as any,
                gas: request.gas ? request.gas * BigInt(15) / BigInt(10) : undefined,
                chain: chain,
            });
            if (hash) {
                await sleep(2000)
                await publicClient.waitForTransactionReceipt({
                    hash: hash as `0x${string}`,
                    pollingInterval: 1000,
                    timeout: 50000,
                    confirmations: 1,
                })
            }
            showSuccess("Success!")
            dispatch(setShowConfirmCard(false));
            dispatch(setCurrentHistoryData(
                {
                    txHash: hash as string,
                    fromAddress: fromWallet?.address,
                    toAddress: toAddress,
                    route: selectedRoute as RouteObj,
                    timestamp: new Date().getTime(),
                }
            ))
            setLoading(false);
        } catch (e: any) {
            showError(e.message);
            setLoading(false);
        }
    }, [chain, fromWallet, publicClient, routeRxData, selectedRoute, signer, toAddress])

    if (needApprove) {
        return (
            <Button
                loading={approving}
                fz={18} c={"black"} h={42} onClick={handleTapApprove}>
                {"Approve"}
            </Button>
        )
    }

    return (
            <Button
                loading={loading}
                onClick={handleTapConfirm}
                fz={18}
                c={"black"}
                h={42}
            >{"Confirm"}</Button>
    )
}

export default EvmBridgeButton;
