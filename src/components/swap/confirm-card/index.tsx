import {
    Accordion,
    ActionIcon,
    Avatar,
    Box, Button, Center,
    Flex, Loader,
    Space,
    Text,
} from "@mantine/core";
import { useConfirmCardStyles } from "@/components/swap/confirm-card/styles";
import { gsap } from "gsap";
import {useCallback, useEffect, useMemo, useRef} from "react";
import { useAmount, useAppDispatch, useFrom, useIsSwap, useSlippage, useTo } from "@/store/hooks";
import { RouteObj } from "@/utils/api/types";
import { fixToSix } from "@/utils/numbers";
import { useNetwork } from "wagmi";
import { isNear } from "@/utils/chains-helper";
import useToAddress from "@/hooks/useToAddress";
import { useTranslation } from "next-i18next";
import useFromWallet from "@/hooks/useFromWallet";
import getRouteTxData from "@/store/route/thunks/getRouteTxData";
import {useBestRoute, useLoadingRouteTxData} from "@/store/route/hooks";
import useFromTokenBalance from "@/hooks/useFromTokenBalance";
import IconCloseCircle from "@/components/icons/icon-close-circle";
import BridgeButton from "@/components/swap/confirm-card/bridge-button";
import {useShowConfirmCard} from "@/store/global/hooks";
import {setShowConfirmCard} from "@/store/global/global-slice";
import {showError} from "@/utils/notifications";

const InfoContent = () => {
    const { classes } = useConfirmCardStyles({ show: true });

    const loadingData = useLoadingRouteTxData();
    const selectedRoute = useBestRoute();
    const toAddress = useToAddress();
    const from = useFrom();
    const to = useTo();

    const route = useMemo(() => {
        if (selectedRoute && selectedRoute !== "empty") {
            return selectedRoute as RouteObj;
        }
        return null;
    }, [selectedRoute]);

    const exchangeRate = useMemo(() => {
        const fromAmount = route?.srcChain.totalAmountIn || "0";
        const toAmount = route?.dstChain ? route.dstChain.totalAmountOut : route?.srcChain.totalAmountOut || "0";
        return Number(toAmount) === 0 ? 0 : Number(toAmount) / Number(fromAmount);
    }, [route?.srcChain.totalAmountIn, route?.dstChain, route?.srcChain.totalAmountOut])

    const { t } = useTranslation("common");

    if (loadingData) {
        return (
            <Box w={"100%"} h={300}>
                <Center w={"100%"}>
                    <Loader></Loader>
                </Center>
            </Box>
        )
    }

    return (
            <Flex align={"stretch"} direction={"column"} gap={10}>
                {/*<Text fz={14} c={"opw.3"}>1 UNI = 0.7000 ETH</Text>*/}
                <Accordion value={"0"} sx={{
                    ['.mantine-Accordion-control']: {
                        backgroundColor: "#35393d",
                        borderRadius: "10px",
                        paddingLeft: "10px",
                        paddingRight: "10px"
                    },
                    ['.mantine-Accordion-item']: {
                        borderRadius: "10px",
                        backgroundColor: "#35393d",
                    },
                    ['.mantine-Accordion-panel']: {
                        padding: "12px",
                    },
                    [".mantine-Accordion-content"]: {
                        padding: "0 0 0 0",
                    }
                }}>
                    <Accordion.Item value={"0"}>
                        {/* <Accordion.Control >
                                        <Flex align={"center"} gap={4}>
                                            <Text fz={14} fw={600} c={"white"}>
                                                1 {from?.token?.symbol} = {exchangeRate.toFixed(4)} {to?.token?.symbol}
                                            </Text>

                                        </Flex>
                                    </Accordion.Control> */}
                        <Accordion.Panel>
                            <Flex direction={"column"} align={"stretch"} gap={6} w={"100%"}>
                                {/*<Flex style={{ marginBottom: '12px' }} align={"center"} gap={4}>*/}
                                {/*    <Text fz={14} fw={600} c={"white"}>*/}
                                {/*        1 {from?.token?.symbol} = {exchangeRate.toFixed(4)} {to?.token?.symbol}*/}
                                {/*    </Text>*/}
                                {/*</Flex>*/}
                                <Flex align={"center"} w={"100%"} justify={"space-between"}>
                                    <Flex align={"center"} gap={4}>
                                        <Text fz={13} c={"opw.3"}>{"Fee"}</Text>
                                        {/* <Tooltip label={"service fee"}>
                                                        <ActionIcon>
                                                            <IconInfoPrimary></IconInfoPrimary>
                                                        </ActionIcon>
                                                    </Tooltip> */}
                                    </Flex>
                                    <Text fz={13} fw={500}
                                          c={"opw.3"}>{route?.bridgeFee.amount} {route?.bridgeFee.symbol}</Text>
                                </Flex>
                                <Flex align={"center"} w={"100%"} justify={"space-between"}>
                                    <Flex align={"center"} gap={4}>
                                        <Text fz={13} c={"opw.3"}>{"Original Chain Gas Fee Estimate"}</Text>
                                    </Flex>
                                    <Text fz={13} fw={500}
                                          c={"opw.3"}>{fixToSix(Number(route?.gasFee.amount))} {route?.gasFee.symbol}</Text>
                                </Flex>
                                <Flex align={"center"} w={"100%"} justify={"space-between"}>
                                    <Flex align={"center"} gap={4}>
                                        <Text fz={13} c={"opw.3"}>{"Estimated Time of Arrival"}</Text>
                                    </Flex>
                                    <Text fz={13} fw={500} c={"opw.3"}>{Math.ceil((route?.timeEstimated || 120) / 60)} minutes</Text>
                                </Flex>
                            </Flex>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
                <Flex align={"flex-start"} direction={"column"} className={classes.addressBox}>
                    <Text fz={14} fw={700}>{"Receive Address"}:</Text>
                    <Text fz={13}>{toAddress}</Text>
                </Flex>
            </Flex>
    )
}

const ConfirmCard = () => {
    const show = useShowConfirmCard();
    const { classes } = useConfirmCardStyles({ show });
    const rootBox = useRef(null);
    const contentBox = useRef(null);
    useEffect(() => {
        if (show) {
            const tl = gsap.timeline();
            tl.set(rootBox.current, {
                display: "block"
            });
            tl.to(contentBox.current, {
                translateY: "0",
                ease: "back.out(1.7)",
                duration: "0.45"
            });
        } else {
            const tl = gsap.timeline();
            tl.to(contentBox.current, {
                translateY: "-100%",
                duration: "0.3"
            });
            tl.set(rootBox.current, {
                display: "none"
            });
        }
    }, [show]);
    const dispatch = useAppDispatch();
    const fromWallet = useFromWallet();
    const selectedRoute = useBestRoute();
    const toAddress = useToAddress();
    const slippage = useSlippage();
    const from = useFrom();
    const amount = useAmount();
    const { chain } = useNetwork();
    const balance = useFromTokenBalance();
    const insufficientBalance = useMemo(() => {
        if (!balance) {
            return true;
        }
        if (!amount) {
            return false;
        }
        return (Number(balance) < Number(amount));
    }, [balance, amount]);

    const onClose = useCallback(() => {
        dispatch(setShowConfirmCard(false));
    },[])

    // const { insufficientBalance, needApprove, approve } = useFromBalance({ routeTxData: result })
    useEffect(() => {
        if (!selectedRoute ||
            !fromWallet) {
            onClose();
        }
    }, [selectedRoute, fromWallet, onClose]);
    useEffect(() => {
        if (!isNear(Number(from?.chain?.chainId))) {
            if (chain?.id !== Number(from?.chain?.chainId))
                onClose();

        }
    }, [chain?.id]);

    const isSwap = useIsSwap();

    const route = useMemo(() => {
        if (selectedRoute && selectedRoute !== "empty") {
            return selectedRoute as RouteObj;
        }
        return null;
    }, [selectedRoute]);

    useEffect(() => {
        if (!fromWallet
            || !route
            || !toAddress
            || !slippage
            || !show
        ) return;
        dispatch(getRouteTxData({
            route: selectedRoute as RouteObj,
            from: fromWallet.address,
            toAddress: toAddress,
            slippage: slippage + "",
        })).then((res) => {
            if ((res as any).error) {
                showError((res as any).error.message);
                onClose();
            }
        })
    }, [fromWallet, selectedRoute, show, slippage, toAddress]);


    // const handleBridgeNear = async () => {
    //     if (result) {
    //         try {
    //             await nearConnector.bridgeToken({ data: result })
    //         } catch (e: any) {
    //         }
    //     }
    // }
    // const handleBridgeTron = async () => {
    //     if (result) {
    //         try {
    //             await tronConnector.bridgeToken({ data: result })
    //         } catch (e: any) {
    //         }
    //     }
    // }
    const { t } = useTranslation("common");
    return (
        <><div className={classes.modalOverlay}></div><Box className={classes.root} ref={rootBox}>
            <Box className={classes.content} ref={contentBox}>
                <Flex align={"center"} justify={"space-between"}>
                    <Text fz={18} fw={700}>
                        {"Confirm Swap"}
                    </Text>
                    <ActionIcon onClick={onClose}>
                        <IconCloseCircle></IconCloseCircle>
                    </ActionIcon>
                </Flex>
                <Space h={10}></Space>
                <Flex direction={"column"} align={"stretch"} gap={10} w={"100%"}>
                    <Flex
                        align={"center"}
                        justify={"space-between"}
                        w={"100%"}
                        className={classes.tokenBox}
                    >
                        <Text fz={18} fw={700}>
                            {route?.srcChain.totalAmountIn}
                        </Text>
                        <Flex align={"center"} justify={"flex-end"} gap={4}>
                            <Avatar src={route?.srcChain.tokenIn.icon} size={25}></Avatar>
                            <Text fz={18} fw={600}>
                                {route?.srcChain.tokenIn.symbol}
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        align={"center"}
                        justify={"space-between"}
                        w={"100%"}
                        className={classes.tokenBox}
                    >
                        <Text fz={18} fw={700}>
                            {
                                route?.minAmountOut.amount
                            }
                        </Text>
                        <Flex align={"center"} justify={"flex-end"} gap={4}>
                            <Avatar src={isSwap ? route?.srcChain?.tokenOut.icon : route?.dstChain?.tokenOut.icon}
                                size={25}></Avatar>
                            <Text fz={18} fw={600}>
                                {isSwap ? route?.srcChain.tokenOut.symbol : route?.dstChain?.tokenOut.symbol}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Space h={10}></Space>
                <InfoContent></InfoContent>
                {
                    insufficientBalance ?
                        <Button fz={18} c={"black"} h={42} disabled={true}>
                            {"Insufficient Balance"}
                        </Button>
                        :
                        (
                            show && <BridgeButton></BridgeButton>
                        )
                }
            </Box>
        </Box>
        </>
    );
};

ConfirmCard.displayName = 'ConfirmCard';

export default ConfirmCard;
