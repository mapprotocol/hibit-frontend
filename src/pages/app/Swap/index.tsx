import Image from "next/image";
import styles from './index.module.css'
import { useState } from "react";

export default function Swap({ }) {


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
                    <div className={styles.number}>500</div>
                    <div className={styles.token}>
                        <img className={styles.token_img} src="/images/swap/usdt.png" alt=""/>
                        <div className={styles.token_symbol}>
                            USDT
                        </div>
                    </div>
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
                <div className={ styles.confirm}>
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
                        <img className={styles.conform_btn_img}  src="/images/swap/confirm.png" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}
