import Image from "next/image";
import styles from './index.module.css'
import lottie from 'lottie-web';
import { useEffect, useRef, useState } from "react";
import CylinderCanvas from "@/components/cylinder";
import { Coin } from "@/type";
import { fetchTokenComments, sendComment } from "@/api";
import { useAccount } from "wagmi";

const emoticons = [
    {
        id: 0,
        content:
            <div className={styles.messageItemText}>
                <Image
                    height={40}
                    width={40}
                    className={styles.messageImageBig}
                    src={`/icons/message/rocket.svg`}
                    alt="hat" />
                Rocket High
            </div>
    },
    {
        id: 1,
        content:
            <div className={styles.messageItemText}>
                <Image
                    height={40}
                    width={40}
                    className={styles.messageImageBig}
                    src={`/icons/message/etf.svg`}
                    alt="hat" />
                ETF
            </div>
    },
    {
        id: 2,
        content:
            <div className={styles.messageItemText}>
                <Image
                    height={40}
                    width={40}
                    className={styles.messageImageBig}
                    src={`/icons/message/todamoon.svg`}
                    alt="hat" />
                To da moon
            </div>
    },
    {
        id: 3,
        content:
            <div className={styles.messageItemText}>
                <Image
                    height={40}
                    width={40}
                    className={styles.messageImageBig}
                    src={`/icons/message/LFG.svg`}
                    alt="hat" />
                LFG
            </div>
    },
    {
        id: 4,
        content:
            <div className={styles.messageItemImage}>
                <Image
                    height={40}
                    width={40}

                    src={`/icons/message/heart.svg`}
                    alt="hat" />
            </div>
    },
    {
        id: 5,
        content:
            <div className={styles.messageItemImage}>
                <Image
                    height={40}
                    width={40}
                    src={`/icons/message/heart.svg`}
                    alt="hat" />
            </div>
    },
    {
        id: 6,
        content:
            <div className={styles.messageItemImage}>
                <Image
                    height={40}
                    width={40}
                    src={`/icons/message/heart.svg`}
                    alt="hat" />
            </div>
    },
]
export default function Comments({ selectedCoin, setSelectedCoin }: { selectedCoin: Coin | undefined, setSelectedCoin?: Function }) {
    const { address, isConnected, isConnecting } = useAccount();
    const lottieContainerRef = useRef(null);

    const initialPrice = 100; // Initial price
    useEffect(() => {
     fetch('/lottie/buyitbig.json')
          .then(response => response.json())
          .then(animationData => {
            lottie.loadAnimation({
              container: lottieContainerRef.current!,
              renderer: 'svg',
              loop: true,
              autoplay: true,
              animationData: animationData,
              assetsPath: '/lottie/images/' // 指定资源图片的路径
            });
          })
          .catch(error => console.error('Error loading animation data:', error));
      }, []);

    useEffect(() => {
        if (selectedCoin)
            fetchTokenComments(selectedCoin?.id).then(res => {
                console.log(res, 'tokenComment')
            })
    }, [selectedCoin])

    const sendEmoji = (id: number) => {
        if (address && selectedCoin)
            sendComment({
                walletAddress: address,
                tokenId: selectedCoin.id,
                commentType: 'default',
                text: id.toString()
            }).then((res) => {
                console.log(res, 'sendEmoji')
            })
    }
    return (
        <div className={styles.comments}>
            {/* <div className={styles.shadow}></div> */}

            <div className={styles.left}>
                <div className={styles.pirce}>
                <div ref={lottieContainerRef} style={{ width: 400, height: 400 }}></div>
                </div>
                {selectedCoin && <div className={styles.coinsInfo}>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"Market Cap"}</div>
                        <div className={styles.infoItemValue}>{"$" + Number(selectedCoin.marketCap).toLocaleString()}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"24h Vol."}</div>
                        <div className={styles.infoItemValue}>{"$" + Number(selectedCoin.volume24).toLocaleString()}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"Holders"}</div>
                        <div className={styles.infoItemValue}>{Number(selectedCoin.holders).toLocaleString()}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"Circulating Supply"}</div>
                        <div className={styles.infoItemValue}>{"143,703,876,384 DOGE"}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"Contract"}</div>
                        <div className={styles.infoItemValue}>{"0xfCd...4c43"}</div>
                    </div>
                </div>}
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
                        {emoticons.map((item, index) =>
                            <div key={item.id} onClick={() => { sendEmoji(item.id) }}>{item.content}
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