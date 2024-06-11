import Image from "next/image";
import styles from './index.module.css'
import { useState } from "react";

const emoticons = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

export default function Comments({ }) {


    return (
        <div className={styles.comments}>
            <div className={styles.shadow}></div>

            <div className={styles.left}>
                <div className={styles.pirce}></div>
                <div className={styles.coinsInfo}>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"Market Cap"}</div>
                        <div className={styles.infoItemValue}>{"$29,334,213,674"}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"24h Vol."}</div>
                        <div className={styles.infoItemValue}>{"$3,105,020,467"}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"Holders"}</div>
                        <div className={styles.infoItemValue}>{"24,123"}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"Circulating Supply"}</div>
                        <div className={styles.infoItemValue}>{"143,703,876,384 DOGE"}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"Contract"}</div>
                        <div className={styles.infoItemValue}>{"0xfCd...4c43"}</div>
                    </div>
                </div>
                <div className={styles.myInfo}>
                    <div className={styles.myInfoItem}>

                        <div className={styles.myInfoTitle}>{"My Position"}</div>
                        <div className={styles.myInfoValue}>{"$2,031.00"}</div>

                    </div>
                    <div className={styles.myInfoItem}>

                        <div className={styles.myInfoTitle}>{"My Profit"}</div>
                        <div className={styles.myInfoValue} style={{
                            color: "#3BF873", display: 'flex', gap: '8px',
                            alignItems: 'center'
                        }}>{"$1,302.00"}

                            <div className={styles.profileRate}>{"+300%"}</div>
                        </div>

                    </div>

                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.rightLine}></div>
                <div className={styles.emoticons}>
                    <div className={styles.emoticonsscroll}>
                        {emoticons.map(item =>
                            <div className={styles.messageItem}>
                                <>  <Image
                                    height={24}
                                    width={24}
                                    src={`/icons/hat.svg`}
                                    alt="hat" />
                                    <Image
                                        height={40}
                                        width={40}
                                        src={`/icons/moon.svg`}
                                        alt="moon" />To da moon</>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.input}>
                    <div></div>
                    <Image
                        style={{ marginTop: '4px' }}
                        src={`/icons/send.svg`}
                        height={38}
                        width={38}
                        alt="send" />
                </div>
            </div>
        </div>
    );
}