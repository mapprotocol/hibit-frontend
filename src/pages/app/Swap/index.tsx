import Image from "next/image";
import styles from './index.module.css'
import {ChangeEvent, useEffect, useState} from "react";
import ChainBox from "@/components/swap/chain-box";
import {useAmount, useAppDispatch, useFrom} from "@/store/hooks";
import TokenSelector from "@/components/token-selector/token-selector";
import {ChainItem, TokenItem} from "@/utils/api/types";
import {Chain} from "@ethereumjs/common";
import {Button, TextInput} from "@mantine/core";
import {updateAmount, updateFrom, updateTo} from "@/store/route/routes-slice";

export default function Swap({}) {
    const dispatch = useAppDispatch();
    const [currentChainBox, setCurrentChainBox] = useState(0);
    const [showTokenSelector, setShowTokenSelector] = useState(false);
    const handleTapChainBox = (index: number) => {
        setCurrentChainBox(index);
        setShowTokenSelector(true);
    };
    const amount = useAmount();

    const [selectChain, setSelectChain] = useState<ChainItem>();
    const [selectToken, setSelectToken] = useState<TokenItem>();

    const from = useFrom();

    const handleSelectedToken = async (chain: ChainItem, token: TokenItem) => {
        setSelectChain(chain)
        setSelectToken(token)
        setShowTokenSelector(false)
    }

    useEffect(() => {
        let chainTo: ChainItem = {
            chainId: "1"
        } as ChainItem;

        let tokenTo: TokenItem = {
            address: "0x9e976f211daea0d652912ab99b0dc21a7fd728e4"
        } as TokenItem;

        dispatch(updateTo(
            {
                chain: chainTo,
                token: tokenTo,
            }
        ))
    }, []);


    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) >= 0)
            dispatch(updateAmount(e.target.value));
    }

    return (
        <div className={styles.swap}>
            <div className={styles.buy_sell}>
                <img className={styles.buy_btn} src="/images/swap/buy.png" alt=""/>
                <div>Sell</div>
            </div>
            <div className={styles.market}>
                Market
                <img src="/images/swap/down.svg" className={styles.market_img} alt=""/>
            </div>
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
                            handleTapChainBox(0);
                        }}
                        // disabled={currentChainBox !== 0 && showTokenSelector}
                        disabled={showTokenSelector}
                        chain={selectChain}
                        token={selectToken}
                    ></ChainBox>

                    {/*<div className={styles.token}>*/}
                    {/*    <img className={styles.token_img} src="/images/swap/usdt.png" alt=""/>*/}
                    {/*    <div className={styles.token_symbol}>*/}
                    {/*        USDT*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className={styles.wallet}>
                    <div className={styles.total}>US$500</div>
                    <div className={styles.balance}>
                        <img className={styles.balance_img} src="/images/swap/wallet.svg" alt=""/>
                        5,540.00
                        <span className={styles.balance_all}>ALL</span>
                    </div>
                </div>
                <div className={styles.percents}>
                    <div className={styles.percent}>25%</div>
                    <div className={styles.percent}>50%</div>
                    <div className={styles.percent}>75%</div>
                    <div className={styles.percent}>100%</div>
                </div>
            </div>

            <div className={styles.confirm_area}>
                <div className={styles.top}>12312</div>
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
                        <img className={styles.conform_btn_img} src="/images/swap/confirm.png" alt=""/>
                    </div>
                </div>
            </div>

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
