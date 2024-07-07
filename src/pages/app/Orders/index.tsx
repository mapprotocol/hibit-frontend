import Image from "next/image";
import styles from './index.module.css'
import {useEffect, useState} from "react";
import {Coin} from "@/type";
import {fetchOrderList, fetchVoteList, updateVote, updateWatchList} from "@/api";
import {ellipsisThree} from "@/utils/addresses";
import {fixAmountStr} from "@/utils/numbers";
import {Button} from "@mantine/core";
import {useAccount} from "wagmi";
import Decimal from "decimal.js";
import {formatNumber} from "@/utils";
import useSWR from "swr";
import getTokenBalance from "@/store/wallet/thunks/getTokenBalance";

export default function Orders({selectedCoin}: { selectedCoin: Coin | undefined }) {
    const [orderLists, setOrderLists] = useState<[]>([]);
    const [votes, setVotes] = useState<any>({bullishPercent: 0, trashPercent: 0});
    const [voteLoading, setVoteLoading] = useState<boolean>(false);
    const {address, isConnected, isConnecting} = useAccount();
    useEffect(() => {
        if (selectedCoin) {
            fetchOrderList(selectedCoin?.coingeckoId).then(res => {
                console.log(res, 'orderList')
                setOrderLists(res.data?.tickers)
            })
            getVoteList()

        }
    }, [selectedCoin])

    useSWR([
        "fetchOrders"
    ], ([]) => {
        if (selectedCoin) {
            fetchOrderList(selectedCoin?.coingeckoId).then(res => {
                console.log(res, 'orderList')
                setOrderLists(res.data?.tickers)
            })
        }
    }, {
        refreshInterval: 3000,
    })

    const getVoteList = () => {
        if (selectedCoin) {
            fetchVoteList(selectedCoin?.coingeckoId).then(res => {
                console.log(res, 'votesList')
                let voteRes = res.data
                if (voteRes.bullish != 0 || voteRes.trash != 0) {
                    let total = voteRes.bullish + voteRes.trash
                    voteRes.bullishPercent = voteRes.bullish / total * 100
                    voteRes.trashPercent = voteRes.trash / total * 100
                } else {
                    voteRes.bullishPercent = 0
                    voteRes.trashPercent = 0
                }
                setVotes(voteRes)
            })
        }
    }


    const addVotes = (voteType: string) => {
        setVoteLoading(true)
        if (address && selectedCoin)
            updateVote(
                selectedCoin.coingeckoId,
                address,
                voteType
            ).then(res => {
                setVoteLoading(false)
                getVoteList()
            })
    }


    return (
        <div className={styles.order_area}>
            <div className={styles.evaluate}>
                <Button
                    variant="transparent"
                    className={styles.bullish_btn}
                    onClick={() => {
                        addVotes('bullish')
                    }}
                    h={44}
                    w={106}
                    loading={voteLoading}
                >
                    {""}
                </Button>
                <div className={styles.percent_area}>
                    <div className={styles.percent}>
                        <div className={styles.percent_num}>{new Decimal(votes.bullishPercent).toFixed(2)}%</div>
                        <div className={styles.percent_num}>{new Decimal(votes.trashPercent).toFixed(2)}%</div>
                    </div>
                    <div className={styles.progress}>
                        <div style={{
                            width: `${votes.bullishPercent}%`
                        }} className={styles.progress_left}>
                            <img className={styles.progress_icon} src="/images/evaluate/icon.svg" alt=""/>
                        </div>
                        <div className={styles.progress_right}></div>
                    </div>
                    <div className={styles.tips}>
                        Remaining voting attempts 10
                    </div>
                </div>
                <Button
                    variant="transparent"
                    className={styles.trash_btn}
                    onClick={() => {
                        addVotes('trash')
                    }}
                    h={44}
                    w={106}
                    loading={voteLoading}
                >
                    {""}
                </Button>


            </div>
            <div className={styles.orders}>
                <div className={styles.orders_title}>
                    <div className={styles.orders_title_content}>User</div>
                    <div className={styles.orders_title_content}>Side</div>
                    <div className={styles.orders_title_content}>Amount</div>
                    <div className={styles.orders_title_content}>Price(USDT)</div>
                    <div className={styles.orders_title_content}>Message</div>
                </div>
                <div className={styles.orders_area}>
                    {
                        orderLists && orderLists.map((order: any) => (
                            <div className={styles.order}>
                                <div className={styles.order_user}>
                                    <img className={styles.order_user_img} src="/images/evaluate/order.png" alt=""/>
                                    {ellipsisThree(order.base)}
                                </div>
                                {
                                    order.type == "sell" ?
                                        <div className={styles.sell}>
                                            Sell
                                        </div>
                                        :
                                        <div className={styles.buy}>
                                            Buy
                                        </div>
                                }
                                <div>
                                    {fixAmountStr(order.volume)}
                                </div>
                                <div>
                                    {formatNumber(order.converted_last.usd)}
                                </div>
                                <div>
                                    {/*好币看10U，All in入仓，快来跟！*/}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
