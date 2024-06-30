import Image from "next/image";
import styles from './index.module.css'
import {useEffect, useState} from "react";
import {Coin} from "@/type";
import {fetchOrderList} from "@/api";
import {ellipsisThree} from "@/utils/addresses";
import {fixAmountStr} from "@/utils/numbers";


export default function Orders({selectedCoin}: { selectedCoin: Coin | undefined }) {
        const [orderLists,setOrderLists] = useState<[]>([]);

    useEffect(() => {
        fetchOrderList("sandwich-cat").then(res => {
            console.log(res, 'orderList')
            setOrderLists(res.data.tickers)
        })
    }, [selectedCoin])

    return (
        <div className={styles.order_area}>
            <div className={styles.evaluate}>
                <img className={styles.evaluate_img} src="/images/evaluate/evaluate.png" alt=""/>
            </div>
            <div className={styles.orders}>
                <div className={styles.orders_title}>
                    <div className={styles.orders_title_content}>User</div>
                    <div className={styles.orders_title_content}>Side</div>
                    <div className={styles.orders_title_content}>Amount</div>
                    <div className={styles.orders_title_content}>Price(USDT)</div>
                    <div className={styles.orders_title_content}>Message</div>
                </div>

                {
                    orderLists.map((order:any) => (
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
                                { fixAmountStr( order.volume)}
                            </div>
                            <div>
                                {order.converted_last.usd}
                            </div>
                            <div>
                                {/*好币看10U，All in入仓，快来跟！*/}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
