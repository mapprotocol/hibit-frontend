import Image from "next/image";
import styles from './index.module.css'
import { useEffect, useState } from "react";
import { fetchTokenInfo, fetchTokenList, fetchWatchList } from "@/api";
import { useAccount, useNetwork } from "wagmi";
import axios from "axios";
import { formatNumber } from "@/utils";
import { Coin } from "@/type";
import { useRouter } from "next/router";




export default function LeftBar({ selectedCoin, setSelectedCoin, like, setLike }:
    {
        selectedCoin: Coin | undefined,
        setSelectedCoin: Function,
        like: boolean,
        setLike: Function
    }) {
    const { address } = useAccount();
    const { chain } = useNetwork();
    const [tokenList, setTokenList] = useState([])
    const [watchlist, setWatchlist] = useState([])
    const [list, setList] = useState([])
    const router = useRouter();


    useEffect(() => {
        fetchTokenListFunc()
        const timer = setInterval(() => {
            fetchTokenListFunc()
        }, 20000)

        const timer2 = setInterval(() => {
            fetchTokenInfoFuc()
        }, 5000)

        return () => {
            clearInterval(timer)
            clearInterval(timer2)
        };
    }, [chain?.id])

    // useEffect(() => {

    //     fetchTokenListFunc()
    // }, [address])

    const fetchTokenListFunc = () => {
        fetchTokenList(chain?.id || '1').then(res => {
            console.log(res, 'tokenlist')
            setTokenList(res.data)
            const queryParams = new URLSearchParams(window.location.search);
            if (queryParams.get('coingeckoId'))
                fetchTokenInfo(queryParams.get('coingeckoId') as string).then(res => {
                    setSelectedCoin(res.data)

                })
            else
                setSelectedCoin(res?.data?.[0] || undefined)
            fetchWatchListFunc()
        })
    }


    const fetchTokenInfoFuc = () => {
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get('coingeckoId'))
            fetchTokenInfo(queryParams.get('coingeckoId') as string).then(res => {
                setSelectedCoin(res.data)
            })
    }


    useEffect(() => {
        let like = false
        if (watchlist.length > 0)
            watchlist?.map((item: any) => {
                if (item.coingeckoId == selectedCoin?.coingeckoId) {
                    like = true
                }
            })

        setLike(like)
    }, [selectedCoin?.coingeckoId, watchlist])

    const fetchWatchListFunc = () => {
        if (address) {
            fetchWatchList(address).then(watchres => {
                setWatchlist(watchres.data.tokens)
                console.log(watchres.data, 'watchlist')
            })
        }
    }

    useEffect(() => {
        if (like) {
            if (watchlist.findIndex((item: any) => item.coingeckoId == selectedCoin?.coingeckoId) == -1) {
                //@ts-ignore
                setWatchlist([...watchlist, {

                    ...selectedCoin
                }])
            }
        } else {
            let index = watchlist.findIndex((item: any) => item.coingeckoId == selectedCoin?.coingeckoId)
            if (index !== -1) {
                //@ts-ignore
                setWatchlist(watchlist.filter((_, i) => i !== index))
            }

        }

    }, [like])

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
            {selectedCoin && tokenList && <div className={styles.coinslist}>
                {(active == 0 ? tokenList : watchlist).map((coin: any, index) => {
                    let item = coin
                    let type = 'rise'
                    if (Number(item?.priceChangePercent) > 20) {
                        type = 'rise'
                    } else if (Number(item?.priceChangePercent) < 0) {
                        type = 'drop'
                    } else {
                        type = 'mild'
                    }
                    return <div key={index}
                        onClick={() => { changeSelectToken(item) }}
                        className={styles.coinItem}
                        style={{
                            width: selectedCoin.coingeckoId == item.coingeckoId ? '103%' : '100%',
                            marginTop: selectedCoin.coingeckoId == item.coingeckoId ? '14px' : '10px',
                            marginBottom: selectedCoin.coingeckoId == item.coingeckoId ? '4px' : '0px',
                        }}>
                        {selectedCoin.coingeckoId == item.coingeckoId && <div className={styles.selectedImage}>
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
                            <div className={selectedCoin.coingeckoId == item.coingeckoId ? styles.selectedcoinName : styles.coinName}>{item.tokenName}
                                <Image
                                    className={styles.coinType}

                                    src={`/icons/menu-badge-${type}${selectedCoin.coingeckoId == item.coingeckoId ? '-selected' : ''}.svg`}
                                    height={40}
                                    width={40}
                                    alt="arrow" />
                            </div>

                        </div>
                        <div className={styles.coinRight}>
                            {selectedCoin.coingeckoId == item.coingeckoId ?
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
                            <div className={selectedCoin.coingeckoId == item.coingeckoId ? styles.selectedprice : styles.price}>
                                {"$" + formatNumber(item.price)}
                            </div>
                        </div>
                    </div>
                })}
            </div>}
        </div>
    );
}
