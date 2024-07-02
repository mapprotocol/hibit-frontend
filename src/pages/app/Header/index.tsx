'use client';
import Image from "next/image";
import styles from './index.module.css'
import { useEffect, useRef, useState } from "react";

import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from "wagmi";
import { ellipsis, formatNumber } from "@/utils";
import { fetchNonce, loginRequest, searchToken, searchTokenTrending, updateWatchList } from "@/api";
import { signMessage } from "wagmi/actions";
import axios from "axios";
import { Coin } from "@/type";
import { Center, Flex, Loader } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { showSuccess } from "@/utils/notifications";




export default function Header({ selectedCoin, setSelectedCoin, like, setLike }:
    {
        selectedCoin: Coin | undefined,
        setSelectedCoin: Function,
        like: boolean,
        setLike: Function
    }) {
    const [showPanel, setShowPanel] = useState(false);
    const timeoutRef = useRef(null);
    const { openAccountModal } = useAccountModal();
    const { address, isConnected, isConnecting } = useAccount();
    const [hotTokens, setHotTokens] = useState<Coin[]>([]);
    const { openConnectModal } = useConnectModal();
    const [recent, setRecent] = useState<Coin[]>([])
    const [query, setQuery] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);
    const [loading, setLoading] = useState(false)
    const [searchList, setSearchList] = useState<Coin[]>([])

    const {copy, copied} = useClipboard();
    useEffect(() => {
        if (copied) {
            showSuccess("Copied!");
        }
    }, [copied])
    
    useEffect(() => {
        searchTokenTrending().then(res => {
            setHotTokens(res.data)
        })
        let list = localStorage.getItem('recent')
        if (list)
            setRecent(JSON.parse(list))
    }, [])

    const handleFocus = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowPanel(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowPanel(false);
        }, 200);
    };

    const handlePanelMouseDown = (event: any) => {
        event.preventDefault();
    };

    const conncet = () => {
        if (openConnectModal && !address) {
            openConnectModal();
        }
    }
    const addWatchListFunc = () => {
        setLike(!like)
        if (address && selectedCoin)
            updateWatchList(
                address,
                selectedCoin?.coingeckoId
            ).then(res => {
                if (res.msg !== "success") {
                    setLike(!like)
                }
            })
    }

    const changeSelectToken = (item: Coin) => {
        setSelectedCoin(item)
        setShowPanel(false);
        if (recent.length > 0) {
            if (recent.findIndex(coin => coin.coingeckoId === item.coingeckoId) === -1) {
                let newList = [item, ...recent].slice(0, 3)
                localStorage.setItem('recent', JSON.stringify(newList))
                setRecent(newList)
            }
        } else {
            localStorage.setItem('recent', JSON.stringify([item]))
            setRecent([item])
        }
    }


    const handleInputChange = (event: any) => {
        const newQuery = event.target.value;

        setLoading(true)
        setQuery(newQuery);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            performSearch(newQuery);
        }, 500);
        //@ts-ignore
        setTimeoutId(newTimeoutId);
    };

    const performSearch = (query: string) => {
        if (query == "") {
            setLoading(false)
            return
        }
        console.log(`搜索关键字: ${query}`);
        searchToken(query).then(res => {
            setLoading(false)

            if (res.data)
                setSearchList(res.data)
        })

    };

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);


    return (
        <div className={styles.header}>
            {selectedCoin && <div className={styles.selectedCoin}>
                <div className={styles.coinAvatar}>
                    <img
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                        src={selectedCoin.tokenLogoUrl}
                        alt="avatar" /></div>
                <div className={styles.coinName}>{selectedCoin.tokenName}</div>
                <div className={styles.price}>{"$" + formatNumber(selectedCoin.price)}</div>

                <div className={styles.change}
                    style={{ color: Number(selectedCoin.priceChangePercent) > 0 ? '#3BF873' : '#FF4B87' }}>
                    {<Image
                        style={{ objectFit: "contain" }}
                        src={`/icons/arrow-${Number(selectedCoin.priceChangePercent) > 0 ? "up" : "down"}.svg`}
                        height={10}
                        width={10}
                        alt="arrow" />}
                    {Math.abs(Number(selectedCoin.priceChangePercent)).toFixed(1) + "%"}
                </div>
            </div>}
            <div className={styles.headerRight}>
                <div className={styles.search}>
                    <div className={styles.searchInput}>
                        <Image
                            style={{ objectFit: "contain" }}
                            src={`/icons/search.svg`}
                            height={26}
                            width={26}
                            alt="arrow" />
                        <input
                            className={styles.input}
                            type="text"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            placeholder={"Search tokens"} />
                    </div>

                    {showPanel && (
                        <div className={styles.searchPanel} onMouseDown={handlePanelMouseDown}>

                            {loading && <Center w={"100%"} my={14} >
                                <Loader size={25}></Loader>
                            </Center>}

                            {searchList.length > 0 &&
                                <>
                                    <div className={styles.searchTitle}>
                                        {"Search Results"}
                                    </div>
                                    <div className={styles.hotTokens}>
                                        {searchList.map(item =>
                                            <CoinItem item={item} changeSelectToken={changeSelectToken} />
                                        )}

                                    </div>
                                </>}
                            {recent.length > 0 &&
                                <>
                                    <div className={styles.searchTitle}>
                                        {"Recent"}
                                    </div>
                                    <div className={styles.hotTokens}>
                                        {recent.map(item =>
                                            <CoinItem item={item} changeSelectToken={changeSelectToken} />
                                        )}

                                    </div>
                                </>}

                            {hotTokens.length > 0 && <><div className={styles.searchTitle}>
                                {"Hot Tokens"}
                            </div>
                                <div className={styles.hotTokens}>
                                    {hotTokens.map(item =>
                                        <CoinItem item={item} changeSelectToken={changeSelectToken} />
                                    )}

                                </div></>}
                        </div>
                    )}
                </div>
                {(isConnected && address) ?
                    <div className={styles.connect}>
                        {ellipsis(address)}
                    </div> : <div className={styles.connect} onClick={conncet}>
                        {"Connect Wallet"}

                    </div>}
                <div className={styles.share}

                    onClick={addWatchListFunc}>
                    {
                        <Image
                            style={{ objectFit: "contain" }}
                            src={`/icons/heart${like ? "-green" : ""}.svg`}
                            height={26}
                            width={26}
                            alt="arrow" />
                    }
                </div>
                <div className={styles.like}
                 onClick={()=>{

                    copy(location.href)
                 }}>
                    <Image
                        style={{ objectFit: "contain" }}
                        src={`/icons/share.svg`}
                        height={26}
                        width={26}
                        alt="arrow" />
                </div>
            </div>
        </div >
    );
}

const CoinItem = ({ item, changeSelectToken }: { item: Coin, changeSelectToken: Function }) => {

    return <> <div className={styles.coinItem}
        onClick={() => { changeSelectToken(item) }}
        key={item.coingeckoId}>
        <div className={styles.topGainersItemLeft}>
            <div className={styles.coinAvatar}>
                <img
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    src={item.tokenLogoUrl}
                    alt="avatar" /></div>
            <div className={styles.hotCoinName}>
                {item.tokenName}
                <div className={styles.address}>
                    {ellipsis(item.tokenAddress)}</div>
            </div>

        </div>
        <div className={styles.topGainersItemTime}>

            <div className={styles.changeLeft}
                style={{ color: Number(item.priceChangePercent) > 0 ? '#3BF873' : '#FF4B87' }}>
                <Image
                    style={{ objectFit: "contain" }}
                    src={`/icons/arrow-${Number(item.priceChangePercent) > 0 ? "up" : "down"}.svg`}
                    height={10}
                    width={10}
                    alt="arrow" />
                {Math.abs(Number(item.priceChangePercent)).toFixed(1) + "%"}


            </div>
            <div className={styles.priceItem}>
                {"$" + formatNumber(item.price)}
            </div>
        </div>
    </div></>
}