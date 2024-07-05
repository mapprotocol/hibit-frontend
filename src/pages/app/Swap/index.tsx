import Image from "next/image";
import styles from './index.module.css'
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import ChainBox from "@/components/swap/chain-box";
import {useAmount, useAppDispatch, useFrom, useNewOrder, useShowSwapPop, useTo} from "@/store/hooks";
import TokenSelector from "@/components/token-selector/token-selector";
import {ChainItem, TokenItem} from "@/utils/api/types";
import {Chain} from "@ethereumjs/common";
import {Box, Button, Center, Loader, TextInput} from "@mantine/core";
import {updateAmount, updateBuyOrSell, updateFrom, updateShowSwapPop, updateTo} from "@/store/route/routes-slice";
import {useBestRoute, useFetchRouteError, useLoadingRoute} from "@/store/route/hooks";
import Decimal from 'decimal.js'
import ConfirmCard from "@/components/swap/confirm-card";
import ConfirmButton from "@/components/swap/confirm-button";
import {Coin} from "@/type";
import {fetchMyTokenTrade, fetchTokenComments, sendComment} from "@/api";
import useFromTokenBalance from "@/hooks/useFromTokenBalance";
import useSWR from "swr";
import useFromWallet from "@/hooks/useFromWallet";
import getTokenBalance from "@/store/wallet/thunks/getTokenBalance";
import {fixAmountStr} from "@/utils/numbers";
import CHAINS from "@/configs/chains";
import SwapPop from "@/components/swap/swap-pop";
import {notifications} from "@mantine/notifications";
import {countCharacters} from "@/utils";
import {useAccount, useChainId} from "wagmi";

export default function Swap({selectedCoin}: { selectedCoin: Coin | undefined }) {
    const dispatch = useAppDispatch();
    const wallet = useFromWallet();
    const {address, isConnected, isConnecting} = useAccount();
    const chainId = useChainId();
    const [currentChainBox, setCurrentChainBox] = useState(0);
    const [showTokenSelector, setShowTokenSelector] = useState(false);
    const [textValue, setTextValue] = useState<string>('');
    const [showBarragePop, setShowBarragePop] = useState<boolean>(false);
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
    const showSwapPop = useShowSwapPop();
    const newOrder = useNewOrder()

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

        let inputValue = new Decimal(balance).mul(percent).toFixed();
        // 允许输入的正则表达式：整数部分最多可以有任意位数，小数部分最多4位
        const regex = /^\d*\.?\d{0,4}$/;

        if (regex.test(inputValue)) {
            dispatch(updateAmount(inputValue))
        } else {
            // 如果输入值不符合正则表达式，自动截取4位小数
            const match = inputValue.match(/^\d*\.?\d{0,4}/);
            if (match) {
                dispatch(updateAmount(match[0]))
            }
        }
    }


    useEffect(() => {
        if(showSwapPop == true){
            setTextValue('')
        }
    }, [showSwapPop]);

    //左边列表切换时候获取选中的token信息
    useEffect(() => {
        if (selectedCoin) {
            //买入
            if (currentChainBox === 0) {
                let chainTo: ChainItem = {
                    chainId: selectedCoin.chainId.toString(),
                    key: CHAINS[selectedCoin.chainId.toString()]?.key
                } as ChainItem;

                let tokenTo: TokenItem = {
                    address: selectedCoin.tokenAddress,
                    symbol: selectedCoin.tokenName,
                    image: selectedCoin.tokenLogoUrl,
                    decimals: selectedCoin.tokenDecimal,
                    price: selectedCoin.price,
                    tokenId: selectedCoin.coingeckoId

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
                    key: CHAINS[selectedCoin.chainId.toString()]?.key
                } as ChainItem;

                console.log(`sell sell sell `, selectedCoin)
                let tokenFrom: TokenItem = {
                    address: selectedCoin.tokenAddress,
                    symbol: selectedCoin.tokenName,
                    image: selectedCoin.tokenLogoUrl,
                    decimals: selectedCoin.tokenDecimal,
                    price: selectedCoin.price,
                    tokenId: selectedCoin.coingeckoId
                } as TokenItem;

                dispatch(updateFrom(
                    {
                        chain: chainFrom,
                        token: tokenFrom,
                    }
                ))
                // dispatch(updateTo(null))
            }
        }
        dispatch(updateBuyOrSell(currentChainBox == 0 ? "buy" : "sell"));

    }, [selectedCoin, currentChainBox])


    //切换时候给个默认主网币
    useEffect(() => {
        if (currentChainBox !== 0 && chainId) {
            console.log(`change to sell`)
            let chainDefault = CHAINS[chainId];

            let chainTo: ChainItem = {
                chainId: chainId.toString(),
                key: chainDefault?.key
            } as ChainItem;

            let defaultToken = JSON.parse(chainDefault.nativeToken)
            let tokenTo: TokenItem = {
                address: defaultToken.address,
                symbol: defaultToken.name,
                image: defaultToken.logoURI,
                decimals: defaultToken.decimals,
            } as TokenItem;

            dispatch(updateTo(
                {
                    chain: chainTo,
                    token: tokenTo,
                }
            ))
        }

    }, [currentChainBox,chainId]);



    const empty = useMemo(() => {
        return bestRoute === "empty" || !!routeError;
    }, [bestRoute, routeError])


    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {


        let inputValue = e.target.value;
        // 允许输入的正则表达式：整数部分最多可以有任意位数，小数部分最多4位
        const regex = /^\d*\.?\d{0,4}$/;

        if (regex.test(inputValue)) {
            dispatch(updateAmount(inputValue))
        } else {
            // 如果输入值不符合正则表达式，自动截取4位小数
            const match = inputValue.match(/^\d*\.?\d{0,4}/);
            if (match) {
                dispatch(updateAmount(match[0]))
            }
        }

        // if (Number(e.target.value) >= 0){
        //     dispatch(updateAmount(e.target.value));
        // }
    }

    const handleSubmitBarrage = (showShare: boolean) => {


        if (Number(textValue) === 0) {
            notifications.show({
                title: 'Failed to send',
                message: `Message cannot be empty`,
                color: 'red'
            })
            return;

        }
        const {len, spaceCount} = countCharacters(textValue);

        if (len > 20 || textValue.length > 40) {
            notifications.show({
                title: 'Failed to send',
                message: `Message is too long`,
                color: 'red'
            })
            return;
        }
        if (address && selectedCoin)
            sendComment({
                walletAddress: address,
                tokenId: selectedCoin.coingeckoId,
                commentType: 'text',
                text: textValue.toString()
            }).then((res) => {
                console.log(res, 'sendText')
            })


        //弹窗输出
        dispatch(updateShowSwapPop(false))
        if (showShare) {
            setShowBarragePop(true)
        }
        //同步弹幕内容


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

                    {
                        currentChainBox == 0 ?<ChainBox
                            onClick={() => {
                                handleTapChainBox();
                            }}
                            // disabled={currentChainBox !== 0 && showTokenSelector}
                            disabled={showTokenSelector}
                            chain={from?.chain}
                            token={from?.token}
                        ></ChainBox>
                            :
                           <div className={styles.sell_token_info}>
                               <img className={styles.sell_token_info_img} src={from?.token?.image} alt=""/>
                               <span className={styles.sell_token_info_symbol}>{from?.token?.symbol}</span>
                           </div>
                    }

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
                                        <img className={`${styles.sell_area_img}`}
                                             src="/images/swap/sell_bg.png"
                                             alt=""/>
                                }

                            </div>
                            <div className={styles.buy_area_amount}>
                                <div className={styles.token_area}>
                                    {
                                        currentChainBox == 0 ?
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
                                                    <div className={styles.token_name_bg}>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div
                                                onClick={()=>{handleTapChainBox()}}
                                                className={`${styles.token_area_left} ${styles.btn_pointer}`}>
                                                <div className={styles.token_img_div}>
                                                    <img className={styles.token_img}
                                                         src={to?.token?.image}
                                                         alt=""/>
                                                </div>
                                                <div className={styles.token_name}>
                                                    <div className={styles.token_name_title}>
                                                        {to?.token?.symbol}
                                                    </div>
                                                    <div className={styles.token_name_bg}>
                                                        <img className={styles.select_to_token_icon}
                                                             src="/images/swap/select_to_token.svg" alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                    }

                                    {
                                        routeLoading ?
                                            <Box>
                                                <Center w={"100%"} h={"50px"}>
                                                    <Loader></Loader>
                                                </Center>
                                            </Box>
                                            :
                                            (!bestRoute ? null :
                                                    <div
                                                        className={styles.token_amount}> +{fixAmountStr(bestRoute?.minAmountOut.amount)}</div>
                                            )
                                    }
                                </div>

                            </div>

                        </div>
                    }
                </div>

                <div className={styles.confirm}>
                    <div className={styles.left}>
                        <div className={styles.left_content}>
                            <img src="/images/swap/wallet.svg" alt=""/>
                            213,413
                        </div>
                    </div>
                    <div className={styles.confirm_btn}>
                        <ConfirmButton
                            disabled={from && to ? false : true}
                        ></ConfirmButton>
                        {
                            showSwapPop && <div className={styles.swap_popover}>
                                <input
                                    onChange={(event) => {
                                        setTextValue(event.target.value)
                                    }}
                                    className={styles.swap_popover_input} placeholder={'Broadcast a message...'}
                                    type="text"/>
                                <div className={styles.bottom_btns}>
                                    <div className={styles.bottom_btns_left}>
                                        <div
                                            onClick={() => {
                                                dispatch(updateShowSwapPop(false))
                                            }}
                                            className={styles.bottom_btn}>
                                            Skip
                                        </div>
                                    </div>
                                    <div className={styles.bottom_btns_right}>
                                        <div
                                            onClick={() => {
                                                handleSubmitBarrage(true)
                                            }}
                                            className={styles.bottom_btn}>
                                            Submit & Share
                                        </div>
                                        <div
                                            onClick={() => {
                                                handleSubmitBarrage(false)
                                            }}
                                            className={styles.bottom_btn}>
                                            <span className={styles.bottom_btn_green}>Submit</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.swap_popover_icon}></div>
                            </div>
                        }
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
            {
                showBarragePop &&
                <SwapPop onClose={setShowBarragePop} newOrder={newOrder} textValue={textValue}></SwapPop>
            }
            {/*{*/}
            {/*    showBarragePop && newOrder ?*/}
            {/*        <SwapPop onClose={handleCloseSwapPop()} newOrder={newOrder} textValue={textValue}></SwapPop>*/}
            {/*        :null*/}
            {/*}*/}
        </div>
    );
}
