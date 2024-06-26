'use client';
import Image from "next/image";
import styles from './index.module.css'
import { useEffect, useRef, useState } from "react";

import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from "wagmi";
import { ellipsis, formatNumber } from "@/utils";
import { fetchNonce, loginRequest, updateWatchList } from "@/api";
import { signMessage } from "wagmi/actions";
import axios from "axios";
import { Coin } from "@/type";




export default function Header({ selectedCoin, setSelectedCoin, like, setLike }:
    {
        selectedCoin: Coin | undefined,
        setSelectedCoin?: Function,
        like: boolean,
        setLike: Function
    }) {
    const [showPanel, setShowPanel] = useState(false);
    const timeoutRef = useRef(null);
    const { openAccountModal } = useAccountModal();
    const { address, isConnected, isConnecting } = useAccount();

    const { openConnectModal } = useConnectModal();



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
                selectedCoin?.id
            ).then(res => {
                if (res.msg !== "success"){
                    setLike(!like)
                }
            })
    }

    return (
        <div className={styles.header}>
            {selectedCoin && <div className={styles.selectedCoin}>
                <div className={styles.coinAvatar}>
                    <img
                        style={{ objectFit: "contain" }}
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
                {/* <div className={styles.search}>
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
                            placeholder={"Search tokens"} />
                    </div>

                    {showPanel && (
                        <div className={styles.searchPanel} onMouseDown={handlePanelMouseDown}>

                        </div>
                    )}
                </div> */}
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
                <div className={styles.like}>
                    <Image
                        style={{ objectFit: "contain" }}
                        src={`/icons/share.svg`}
                        height={26}
                        width={26}
                        alt="arrow" />
                </div>
            </div>
        </div>
    );
}