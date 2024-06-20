import Image from "next/image";
import styles from './index.module.css'
import { useEffect, useState } from "react";
import { fetchTokenList, fetchWatchList } from "@/api";
import { useAccount } from "wagmi";
import axios from "axios";
import { formatNumber } from "@/utils";
import { Coin } from "@/type";




export default function LeftBar({ selectedCoin, setSelectedCoin }: { selectedCoin: Coin | undefined, setSelectedCoin: Function }) {
    const { address } = useAccount();
    const [tokenList, setTokenList] = useState([])


    useEffect(() => {
        if (address) {
            fetchTokenList().then(res => {
                console.log(res, 'tokenlist')
                setTokenList(res.data)
                setSelectedCoin(res.data[0])
                fetchWatchList(address).then(res => {
                    console.log(res)
                })
            })
        }
    }, [address])

    const [active, setActive] = useState(0)

    const changeSelectToken = (item: Coin) => {
        setSelectedCoin(item)
    }
    return (
        <div className={styles.leftBar}>
            <div className={styles.logo}>
                <Image
                    height={52}
                    width={110}
                    src={`/icons/logo.svg`}
                    alt="logo" />
            </div>
            <div className={styles.leftTabs}>
                <div className={styles.leftTab}
                    style={{ opacity: active == 0 ? 1 : 0.8 }}
                    onClick={() => setActive(0)}
                >
                    {'Hot Coins'}
                    {active == 0 && <div className={styles.bottomBorder}></div>}
                </div>
                <div
                    className={styles.leftTab}
                    style={{ opacity: active == 1 ? 1 : 0.8 }}
                    onClick={() => setActive(1)}
                >
                    {'Watchlist'}
                    {active == 1 && <div className={styles.bottomBorder}></div>}
                </div>
            </div>
            {selectedCoin && <div className={styles.coinslist}>
                {tokenList.map((item: Coin, index) => {
                    let type = 'rise'
                    if (Number(item.priceChangePercent) > 20) {
                        type = 'rise'
                    } else if (Number(item.priceChangePercent) < 0) {
                        type = 'drop'
                    } else {
                        type = 'mild'
                    }
                    return <div key={index}
                        onClick={() => { changeSelectToken(item) }}
                        className={styles.coinItem}
                        style={{
                            width: selectedCoin.id == item.id ? '103%' : '100%',
                            marginTop: selectedCoin.id == item.id ? '14px' : '10px',
                            marginBottom: selectedCoin.id == item.id ? '4px' : '0px',
                        }}>
                        {selectedCoin.id == item.id && <div className={styles.selectedImage}>
                            <Image
                                style={{ objectFit: "contain" }}
                                src={`/images/menu-selected-${Number(item.priceChangePercent) > 0 ? "rise" : "drop"}.png`}
                                fill
                                alt="arrow" />
                        </div>}
                        <div className={styles.coinItemLeft}>
                            <div className={styles.coinAvatar}
                            >
                                <img
                                    style={{ objectFit: "contain" }}
                                    src={item.tokenLogoUrl}
                                    alt="avatar" /></div>
                            <div className={selectedCoin.id == item.id ? styles.selectedcoinName : styles.coinName}>{item.tokenName}
                                <Image
                                className={styles.coinType}
                                    
                                    src={`/icons/menu-badge-${type}${selectedCoin.id == item.id ? '-selected' : ''}.svg`}
                                    height={ 40}
                                    width={ 40}
                                    alt="arrow" />
                                    </div>

                        </div>
                        <div className={styles.coinRight}>
                            {selectedCoin.id == item.id ?
                                <div className={styles.selectedchange}
                                >
                                    {
                                        <Image
                                            style={{ objectFit: "contain" }}
                                            src={`/icons/arrow-${Number(item.priceChangePercent) > 0 ? "up" : "down"}-black.svg`}
                                            height={10}
                                            width={10}
                                            alt="arrow" />
                                    }
                                    {Math.abs(Number(item.priceChangePercent)).toFixed(1) + "%"}
                                </div>
                                : <div className={styles.change}
                                    style={{ color: Number(item.priceChangePercent) > 0 ? '#3BF873' : '#FF4B87' }}>
                                    {
                                        <Image
                                            style={{ objectFit: "contain" }}
                                            src={`/icons/arrow-${Number(item.priceChangePercent) > 0 ? "up" : "down"}.svg`}
                                            height={10}
                                            width={10}
                                            alt="arrow" />
                                    }

                                    {Math.abs(Number(item.priceChangePercent)).toFixed(1) + "%"}
                                </div>}
                            <div className={selectedCoin.id == item.id ? styles.selectedprice : styles.price}>
                                {"$" + formatNumber(item.price)}
                            </div>
                        </div>
                    </div>
                })}ƒ
            </div>}
        </div>
    );
}