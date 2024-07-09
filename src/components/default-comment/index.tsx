
import Image from "next/image";
import styles from './index.module.css'
export const emoticons = [
    
    {
        id: 0,
        content:
            <div className={styles.messageItemText}>
                <div className={styles.messageImageBig}>

                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={`/icons/message/rocket.svg`}
                        alt="hat" />
                </div>
                <span>Rocket High</span>
            </div>
    },
    {
        id: 1,
        content:
            <div className={styles.messageItemText}>
                <div className={styles.messageImageBig}>

                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={`/icons/message/etf.svg`}
                        alt="hat" />
                </div>

                <span>ETF</span>


            </div>
    },
    {
        id: 2,
        content:
            <div className={styles.messageItemText}>
                <div className={styles.messageImageBig}>
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={`/icons/message/todamoon.svg`}
                        alt="hat" />
                </div>

                To da moon
            </div>
    },
    {
        id: 3,
        content:
            <div className={styles.messageItemText}>
                <div className={styles.messageImageBig}>
                    <img

                        src={`/icons/message/LFG.svg`}
                        alt="hat" />
                </div>
                LFG
            </div>
    },
    {
        id: 4,
        content:
            <div className={styles.messageItemImage}>
                <Image
                    height={22}
                    width={22}

                    src={`/icons/message/heart.svg`}
                    alt="hat" />
            </div>
    },
    {
        id: 5,
        content:
            <div className={styles.messageItemImage}>

                <Image
                    height={22}
                    width={22}
                    src={`/icons/message/hot.svg`}
                    alt="hat" />
            </div>
    },
    {
        id: 6,
        content:
            <div className={styles.messageItemImage}>
                <Image
                    height={22}
                    width={22}
                    src={`/icons/message/tip.svg`}
                    alt="hat" />
            </div>
    },

    {
        id: 7,
        content:
            <div className={styles.messageItemText}>
                <div className={styles.messageImageBig}>

                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={`/icons/message/dyor-1.svg`}
                        alt="hat" />
                </div>
                <span>DYOR</span>
            </div>
    },
    {
        id: 8,
        content:
            <div className={styles.messageItemText}>
                <div className={styles.messageImageBig}>

                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={`/icons/message/dyor-2.svg`}
                        alt="hat" />
                </div>
                <span>DYOR</span>
            </div>
    },
    {
        id: 9,
        content:
            <div className={styles.messageItemText}>
                <div className={styles.messageImageBig} style={{ width: '56px' }}>

                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={`/icons/message/sellall-1.svg`}
                        alt="hat" />
                </div>
                <span>Sell all</span>
            </div>
    },
    {
        id: 10,
        content:
            <div className={styles.messageItemText}>
                <div className={styles.messageImageBig} style={{ width: '33px' }}>

                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={`/icons/message/sellall-2.svg`}
                        alt="hat" />
                </div>
                <span>Sell all</span>
            </div>
    },
    {
        id: 11,
        content:
            <div className={styles.messageItemText}>
                <div className={styles.messageImageBig} >

                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={`/icons/message/allin-1.svg`}
                        alt="hat" />
                </div>
                <span>All in</span>
            </div>
    },
    {
        id: 12,
        content:
            <div className={styles.messageItemText}>
                <div className={styles.messageImageBig} >

                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={`/icons/message/allin-2.svg`}
                        alt="hat" />
                </div>
                <span>All in</span>
            </div>
    },
    {
        id: 13,
        content:
            <div className={styles.messageItemText}>
                <div className={styles.messageImageBig} style={{ width: '44px' }}>

                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={`/icons/message/ath.svg`}
                        alt="hat" />
                </div>
                <span>ATH</span>
            </div>
    },
    {
        id: 14,
        content:
            <div className={styles.messageItemImage}>

                <Image
                    height={40}
                    width={40}
                    src={`/icons/message/new-1.svg`}
                    alt="hat" />
            </div>
    },
    {
        id: 15,
        content:
            <div className={styles.messageItemImage}>

                <Image
                    height={40}
                    width={40}
                    src={`/icons/message/new-2.svg`}
                    alt="hat" />
            </div>
    },
    {
        id: 16,
        content:
            <div className={styles.messageItemImage}>

                <Image
                    height={40}
                    width={40}
                    src={`/icons/message/new-3.svg`}
                    alt="hat" />
            </div>
    },
    {
        id: 17,
        content:
            <div className={styles.messageItemImage}>

                <Image
                    height={40}
                    width={40}
                    src={`/icons/message/new-4.svg`}
                    alt="hat" />
            </div>
    },
]
