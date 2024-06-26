import Image from "next/image";
import styles from './index.module.css'
import lottie from 'lottie-web';
import { useEffect, useRef, useState } from "react";
import CylinderCanvas from "@/components/cylinder";
import { Coin, Comment } from "@/type";
import { fetchMyTokenTrade, fetchTokenComments, sendComment, trades } from "@/api";
import { useAccount } from "wagmi";
import { ellipsis } from "@/utils";

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
]


export default function Comments({ selectedCoin, setSelectedCoin }: { selectedCoin: Coin | undefined, setSelectedCoin?: Function }) {
    const { address, isConnected, isConnecting } = useAccount();
    const lottieContainerRef = useRef(null);
    const [commentList, setCommentList] = useState<Comment[]>([])
    useEffect(() => {
        // fetch('/lottie/buyitbig.json')
        //     .then(response => response.json())
        //     .then(animationData => {
        //         lottie.loadAnimation({
        //             container: lottieContainerRef.current!,
        //             renderer: 'svg',
        //             loop: true,
        //             autoplay: true,
        //             animationData: animationData,
        //             assetsPath: '/lottie/images/' // 指定资源图片的路径
        //         });
        //     })
        //     .catch(error => console.error('Error loading animation data:', error));
    }, []);
    const extractNumbers = (str:string) => {
        const regex = /\d+/g;
        const matches = str.match(regex); 
        return matches ? matches.map(Number) : [];
    }
    useEffect(() => {
        if (selectedCoin && address) {
            fetchTokenComments(selectedCoin?.id).then(res => {
                console.log(res, 'tokenComment')
                setCommentList(res.data)
            })
            fetchMyTokenTrade(address, selectedCoin?.id).then(res => {
                console.log(res, 'myTokenTrade')
            })
        }
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
            <div className={styles.shadow}></div>

            <div className={styles.left}>
                <div className={styles.pirce}>
                    <div ref={lottieContainerRef} style={{ width: 400, height: 400 }}></div>
                </div>
                {selectedCoin && <div className={styles.coinsInfo}>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"Market Cap"}</div>
                        <div className={styles.infoItemValue}>{"$" + Number(selectedCoin?.marketCap).toLocaleString()}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"24h Vol."}</div>
                        <div className={styles.infoItemValue}>{"$" + Number(selectedCoin?.volume24).toLocaleString()}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"Holders"}</div>
                        <div className={styles.infoItemValue}>{Number(selectedCoin?.holders).toLocaleString()}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"Total Supply"}</div>
                        <div className={styles.infoItemValue}>{Number(selectedCoin?.totalSupply).toLocaleString()}</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.infoItemTitle}>{"Contract"}</div>
                        <div className={styles.infoItemValue}>{ellipsis(selectedCoin?.tokenAddress)}</div>
                    </div>
                </div>}
                {selectedCoin && <div className={styles.myInfo}>
                    <div className={styles.myInfoItem}>

                        <div className={styles.myInfoTitle}>{"My Position"}</div>
                        <div className={styles.myInfoValue}>{"$0"}</div>

                    </div>
                    <div className={styles.myInfoItem}>

                        <div className={styles.myInfoTitle}>{"My Profit"}</div>
                        <div className={styles.myInfoValue} style={{
                            color: "#3BF873", display: 'flex', gap: '8px',
                            alignItems: 'center'
                        }}>{"$0"}

                            <div className={styles.profileRate}>{"+0%"}</div>
                        </div>

                    </div>

                </div>}
            </div>

            <div className={styles.right}>
                <div className={styles.commentContent}>
                    {[0, 1, 2, 3, 4].map(item =>
                        <div className={styles.commentLine}>
                            {
                                commentList.slice(0, 10).map((item: Comment) => {
                                    if (item.commentType == "default")
                                        return emoticons[extractNumbers(item.text)%6].content

                                        
                                })
                            }
                        </div>)}



                </div>
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
                    <input className={styles.inputText} type="text" />
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