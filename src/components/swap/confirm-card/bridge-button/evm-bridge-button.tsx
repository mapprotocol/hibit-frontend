import useEvmAllowance from "@/hooks/allowance/useEvmAllowance";
import {useBestRoute, useRouteTxData} from "@/store/route/hooks";
import {Button} from "@mantine/core";
import {useTranslation} from "next-i18next";
import {useCallback, useMemo, useState} from "react";
import {ethers} from "ethers";
import {useNetwork, usePublicClient, useWalletClient} from "wagmi";
import {prepareSendTransaction} from "@wagmi/core";
import {sleep} from "@/utils/timeout";
import {showError, showSuccess} from "@/utils/notifications";
import {NewOrderObj, RouteObj, TokenItem} from "@/utils/api/types";
import {useAmount, useAppDispatch, useAppSelector, useBuyOrSell, useFrom, useTo} from "@/store/hooks";
import useFromWallet from "@/hooks/useFromWallet";
import {setShowConfirmCard} from "@/store/global/global-slice";
import {setCurrentHistoryData, updateNewOrder, updateShowSwapPop} from "@/store/route/routes-slice";
import useToAddress from "@/hooks/useToAddress";
import {fetchNewOrder} from "@/api";

const EvmBridgeButton = () => {
    const {t} = useTranslation("common");
    const dispatch = useAppDispatch();
    const routeRxData = useRouteTxData();
    const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
    const {chain} = useNetwork();
    const fromWallet = useFromWallet();
    const toAddress = useToAddress();
    const {
        needApprove,
        approve,
    } = useEvmAllowance({data: routeRxData || []})
    const {data: signer} = useWalletClient();
    const [loading, setLoading] = useState(false);
    const [approving, setApproving] = useState(false);
    const amount = useAmount();
    const from = useFrom();
    const to = useTo();
    const buyOrSell = useBuyOrSell();
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
    const route = useMemo(() => {
        if (selectedRoute && selectedRoute !== "empty") {
            return selectedRoute as RouteObj;
        }
        return null;
    }, [selectedRoute]);

    console.log(routeRxData, "data")
    console.log(selectedRoute, 'selectedRoute')
    const publicClient = usePublicClient({chainId: Number(from?.chain?.chainId) || 0});
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


            //订单入库
            let tokenId: string | undefined = ''
            let tradePrice: string | undefined = ''
            let tokenSymbol: string | undefined = ''
            let tokenImage: string | undefined = ''
            let tradeAmount: string | undefined = ''

            if (buyOrSell == 'buy') {
                tokenId = to?.token?.tokenId
                tradePrice = to?.token?.price
                tokenSymbol = to?.token?.symbol
                tokenImage = to?.token?.image
                tradeAmount = route?.minAmountOut?.amount
            } else {
                tokenId = from?.token?.tokenId
                tradePrice = from?.token?.price
                tokenSymbol = from?.token?.symbol
                tokenImage = from?.token?.image
                if (selectedRoute != null && selectedRoute !== "empty") {
                    tradeAmount = selectedRoute.srcChain?.totalAmountIn
                }
            }

            //订单入库
            try {
                await fetchNewOrder(
                    tokenId,
                    fromWallet?.address,
                    buyOrSell,
                    route?.minAmountOut?.amount,
                    tradePrice,
                    hash
                )
            }catch (ex){
                console.log(ex)
            }


            //更新store 同步到动画展示
            let newOrder: NewOrderObj = {
                tokenId: tokenId,
                walletAddress: fromWallet?.address,
                tradeType: buyOrSell,
                tradeAmount: tradeAmount,
                tradePrice: tradePrice,
                hash: hash,
                symbol: tokenSymbol,
                image: tokenImage
            } as NewOrderObj;

            dispatch(updateNewOrder(newOrder));

            dispatch(updateShowSwapPop(true));

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
