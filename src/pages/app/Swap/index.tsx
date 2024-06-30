import Image from "next/image";
import styles from './index.module.css'
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import ChainBox from "@/components/swap/chain-box";
import {useAmount, useAppDispatch, useFrom, useTo} from "@/store/hooks";
import TokenSelector from "@/components/token-selector/token-selector";
import {ChainItem, TokenItem} from "@/utils/api/types";
import {Chain} from "@ethereumjs/common";
import {Box, Button, Center, Loader, TextInput} from "@mantine/core";
import {updateAmount, updateFrom, updateTo} from "@/store/route/routes-slice";
import {useBestRoute, useFetchRouteError, useLoadingRoute} from "@/store/route/hooks";
import Decimal from 'decimal.js'
import ConfirmCard from "@/components/swap/confirm-card";
import ConfirmButton from "@/components/swap/confirm-button";
import {Coin} from "@/type";
import {fetchMyTokenTrade, fetchTokenComments} from "@/api";
import useFromTokenBalance from "@/hooks/useFromTokenBalance";
import useSWR from "swr";
import useFromWallet from "@/hooks/useFromWallet";
import getTokenBalance from "@/store/wallet/thunks/getTokenBalance";
import {fixAmountStr} from "@/utils/numbers";
import CHAINS from "@/configs/chains";

export default function Swap({selectedCoin}: { selectedCoin: Coin | undefined }) {
    const dispatch = useAppDispatch();
    const wallet = useFromWallet();
    const [currentChainBox, setCurrentChainBox] = useState(0);
    const [showTokenSelector, setShowTokenSelector] = useState(false);

    const handleTapChainBox = () => {
        // setCurrentChainBox(index);
        setShowTokenSelector(true);
    };
    const amount = useAmount();

    const from = useFrom();
    const to = useTo();

    const routeLoading = useLoadingRoute();
    const routeError = useFetchRouteError();
    const bestRoute = useBestRoute();
    const balance = useFromTokenBalance();

    const handleSelectedToken = async (chain: ChainItem, token: TokenItem) => {
        setShowTokenSelector(false)
        console.log(2222222, chain, token)
        if (currentChainBox === 0) {
            //买入
            dispatch(
                updateFrom(
                    {
                        chain: chain,
                        token: token
                    }
                ))
        } else {
            //卖出
            dispatch(
                updateTo(
                    {
                        chain: chain,
                        token: token
                    }
                ))

        }

    }


    useSWR([
        wallet,
        from,
        "fetchFromTokenBalance"
    ], ([wallet, from]) => {
        if (wallet && from?.token && from?.chain) {
            dispatch(getTokenBalance({
                wallet: wallet,
                tokenAddress: from?.token?.address,
                decimals: from?.token?.decimals,
                chainId: from?.chain?.chainId
            }))
        }
    }, {
        refreshInterval: 6000,
    })

    const handleAmount = (percent: number) => {
        dispatch(updateAmount(new Decimal(balance).mul(percent).toFixed()));
    }

    //左边列表切换时候获取选中的token信息
    useEffect(() => {
        if (selectedCoin) {
            //买入
            if (currentChainBox === 0) {
                let chainTo: ChainItem = {
                    chainId: selectedCoin.chainId.toString(),
                    key: CHAINS[selectedCoin.chainId.toString()].key
                } as ChainItem;

                let tokenTo: TokenItem = {
                    address: selectedCoin.tokenAddress,
                    symbol: selectedCoin.tokenName,
                    image: selectedCoin.tokenLogoUrl,
                    decimals:selectedCoin.tokenDecimal

                } as TokenItem;

                dispatch(updateTo(
                    {
                        chain: chainTo,
                        token: tokenTo,
                    }
                ))
                dispatch(updateFrom(null))
            } else {
                //卖出
                let chainFrom: ChainItem = {
                    chainId: selectedCoin.chainId.toString(),
                    key: CHAINS[selectedCoin.chainId.toString()].key
                } as ChainItem;

                let tokenFrom: TokenItem = {
                    address: selectedCoin.tokenAddress,
                    symbol: selectedCoin.tokenName,
                    image: selectedCoin.tokenLogoUrl,
                    decimals:selectedCoin.tokenDecimal
                } as TokenItem;

                dispatch(updateFrom(
                    {
                        chain: chainFrom,
                        token: tokenFrom,
                    }
                ))
                dispatch(updateTo(null))
            }
        }
    }, [selectedCoin, currentChainBox])

    const empty = useMemo(() => {
        return bestRoute === "empty" || !!routeError;
    }, [bestRoute, routeError])


    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) >= 0)
            dispatch(updateAmount(e.target.value));
    }


    return (
        <div className={styles.swap}>
            {
                currentChainBox === 0 ?
                    <div className={styles.buy_buy}>
                        <img className={styles.buy_btn} src="/images/swap/buy.png" alt=""/>
                        <div className={styles.buy_text} onClick={() => {
                            setCurrentChainBox(1)
                        }}>Sell
                        </div>
                    </div>
                    :
                    <div className={styles.buy_sell}>
                        <div className={styles.buy_text} onClick={() => {
                            setCurrentChainBox(0)
                        }}>Buy
                        </div>
                        <img className={styles.buy_btn} src="/images/swap/sell.png" alt=""/>
                    </div>
            }

            {/*<div className={styles.market}>*/}
            {/*    Market*/}
            {/*    <img src="/images/swap/down.svg" className={styles.market_img} alt=""/>*/}
            {/*</div>*/}
            <div className={styles.percent_area}>
                <div className={styles.percent_top}>
                    <TextInput
                        type={"number"}
                        value={amount}
                        onChange={handleValueChange}
                        placeholder={"0.0"}
                        size={"xs"}
                        variant={"filled"}
                        sx={(theme) => ({
                            ['input']: {
                                background: "transparent",
                                fontSize: "18px",
                                fontWeight: 700,
                                color: theme.colors.yellow[0],
                                padding: 0,
                                ["&:focus"]: {
                                    border: "none"
                                }
                            }
                        })}
                        w={"100%"}
                    >
                    </TextInput>

                    <ChainBox
                        onClick={() => {
                            handleTapChainBox();
                        }}
                        // disabled={currentChainBox !== 0 && showTokenSelector}
                        disabled={showTokenSelector}
                        chain={currentChainBox === 0 ? from?.chain : to?.chain}
                        token={currentChainBox === 0 ? from?.token : to?.token}
                    ></ChainBox>

                    {/*<div className={styles.token}>*/}
                    {/*    <img className={styles.token_img} src="/images/swap/usdt.png" alt=""/>*/}
                    {/*    <div className={styles.token_symbol}>*/}
                    {/*        USDT*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className={styles.wallet}>
                    <div className={styles.total}></div>
                    <div className={styles.balance}>
                        <img className={styles.balance_img} src="/images/swap/wallet.svg" alt=""/>
                        {from?.chain?.chainId ? balance : 0}
                        <span className={styles.balance_all} onClick={() => {
                            handleAmount(1)
                        }}>ALL</span>
                    </div>
                </div>
                <div className={styles.percents}>
                    <div className={styles.percent} onClick={() => {
                        handleAmount(0.25)
                    }}>25%
                    </div>
                    <div className={styles.percent} onClick={() => {
                        handleAmount(0.5)
                    }}>50%
                    </div>
                    <div className={styles.percent} onClick={() => {
                        handleAmount(0.75)
                    }}>75%
                    </div>
                    <div className={styles.percent} onClick={() => {
                        handleAmount(1)
                    }}>100%
                    </div>
                </div>
            </div>

            <div className={styles.confirm_area}>
                {
                    routeLoading ?
                        <Box>
                            <Center w={"100%"} h={"50px"}>
                                <Loader></Loader>
                            </Center>
                        </Box>
                        :
                        (!bestRoute ? null :
                                <div>
                                    {
                                        bestRoute !== "empty" &&
                                        <div className={styles.buy_area}>
                                            <div className={styles.buy_area_img_div}>
                                                {
                                                    currentChainBox === 0 ? <img className={styles.buy_area_img}
                                                                                 src="/images/swap/buy_bg.png"
                                                                                 alt=""/>
                                                        :
                                                        <img className={styles.buy_area_img}
                                                             src="/images/swap/sell_bg.png"
                                                             alt=""/>
                                                }

                                            </div>
                                            <div className={styles.buy_area_amount}>
                                                <div className={styles.token_area}>
                                                    <div className={styles.token_area_left}>
                                                        <div className={styles.token_img_div}>
                                                            <img className={styles.token_img}
                                                                 src={to?.token?.image}
                                                                 alt=""/>
                                                        </div>
                                                        <div className={styles.token_name}>
                                                            <div className={styles.token_name_title}>
                                                                {to?.token?.symbol}
                                                            </div>
                                                            <div className={styles.token_name_bg}></div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={styles.token_amount}> +{fixAmountStr(bestRoute?.minAmountOut.amount)}</div>
                                                </div>

                                            </div>

                                        </div>
                                    }
                                </div>
                        )
                }
                <div className={styles.confirm}>
                    <div className={styles.left}>
                        <div className={styles.left_content}>
                            <img src="/images/swap/wallet.svg" alt=""/>
                            213,413
                        </div>
                        <div className={styles.left_content}>
                            <img src="/images/swap/gas.svg" alt=""/>
                            ≈ $5.21
                        </div>
                    </div>
                    <div className={styles.confirm_btn}>
                        <ConfirmButton
                            disabled={from && to ?false:true}
                        ></ConfirmButton>
                        {/*<img className={styles.conform_btn_img} src="/images/swap/confirm.png" alt=""/>*/}
                    </div>
                </div>
            </div>

            <ConfirmCard
            />

            <TokenSelector
                position={currentChainBox === 0 ? "from" : "to"}
                onSelected={handleSelectedToken}
                onClose={() => {
                    setShowTokenSelector(false);
                }}
                show={showTokenSelector}
            ></TokenSelector>
        </div>
    );
}
