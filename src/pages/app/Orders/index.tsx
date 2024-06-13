import Image from "next/image";
import styles from './index.module.css'
import { useState } from "react";

export default function Orders({ }) {


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
                <div className={styles.order}>
                    <div className={styles.order_user}>
                        <img className={styles.order_user_img} src="/images/evaluate/order.png" alt=""/>
                        0x5f..05FC
                    </div>
                    <div className={styles.buy}>
                        Buy
                    </div>
                    <div>
                        20,000
                    </div>
                    <div>
                        26,385
                    </div>
                    <div>
                        好币看10U，All in入仓，快来跟！
                    </div>

                </div>
                <div className={styles.order}>
                    <div className={styles.order_user}>
                        <img className={styles.order_user_img} src="/images/evaluate/order.png" alt=""/>
                        0x5f..05FC
                    </div>
                    <div className={styles.sell}>
                        Buy
                    </div>
                    <div>
                        20,000
                    </div>
                    <div>
                        26,385
                    </div>
                    <div>
                        好币看10U，All in入仓，快来跟！
                    </div>

                </div>
                <div className={styles.order}>
                    <div className={styles.order_user}>
                        <img className={styles.order_user_img} src="/images/evaluate/order.png" alt=""/>
                        0x5f..05FC
                    </div>
                    <div className={styles.buy}>
                        Buy
                    </div>
                    <div>
                        20,000
                    </div>
                    <div>
                        26,385
                    </div>
                    <div>
                        好币看10U，All in入仓，快来跟！
                    </div>

                </div>
                <div className={styles.order}>
                    <div className={styles.order_user}>
                        <img className={styles.order_user_img} src="/images/evaluate/order.png" alt=""/>
                        0x5f..05FC
                    </div>
                    <div className={styles.buy}>
                        Buy
                    </div>
                    <div>
                        20,000
                    </div>
                    <div>
                        26,385
                    </div>
                    <div>
                        好币看10U，All in入仓，快来跟！
                    </div>

                </div>
                <div className={styles.order}>
                    <div className={styles.order_user}>
                        <img className={styles.order_user_img} src="/images/evaluate/order.png" alt=""/>
                        0x5f..05FC
                    </div>
                    <div className={styles.buy}>
                        Buy
                    </div>
                    <div>
                        20,000
                    </div>
                    <div>
                        26,385
                    </div>
                    <div>
                        好币看10U，All in入仓，快来跟！
                    </div>

                </div>
            </div>
        </div>
    );
}
