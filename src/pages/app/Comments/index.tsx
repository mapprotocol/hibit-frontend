import Image from "next/image";
import styles from './index.module.css'
import lottie from 'lottie-web';
import { use, useEffect, useRef, useState } from "react";
import CylinderCanvas from "@/components/cylinder";
import { Coin, Comment } from "@/type";
import { fetchMyTokenTrade, fetchTokenComments, sendComment, trades } from "@/api";
import { useAccount } from "wagmi";
import { countCharacters, ellipsis } from "@/utils";
import { notifications } from "@mantine/notifications";

const emoticons = [
    {
        id: 0,
        content:
            <div className={styles.messageItemText}>
                <div className={styles.messageImageBig}>

                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        className={styles.messageImageBig}
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
]


export default function Comments({ selectedCoin, setSelectedCoin }: { selectedCoin: Coin | undefined, setSelectedCoin?: Function }) {
    const { address, isConnected, isConnecting } = useAccount();
    const lottieContainerRef = useRef(null);
    const [commentList, setCommentList] = useState<Comment[]>([])
    const [allowSend, setAllowSend] = useState(0)
    const [textValue, setTextValue] = useState("")
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
        //             assetsPath: '/lottie/images/' 
        //         });
        //     })
        //     .catch(error => console.error('Error loading animation data:', error));

    }, []);
    const extractNumbers = (str: string) => {
        const regex = /\d+/g;
        const matches = str.match(regex);
        return matches ? matches.map(Number) : [];
    }
    useEffect(() => {
        if (selectedCoin) {
            fetchTokenComments(selectedCoin?.coingeckoId).then(res => {
                console.log(res, 'tokenComment')
                setCommentList(res.data)

            })
            if (address)
                fetchMyTokenTrade(address, selectedCoin?.coingeckoId).then(res => {
                    console.log(res, 'myTokenTrade')
                })
        }
    }, [selectedCoin])

    useEffect(() => {
        let timer: any;
        if (allowSend > 0) {
            timer = setInterval(() => {
                setAllowSend(prevAllowSend => {
                    if (prevAllowSend > 1) {
                        return prevAllowSend - 1;
                    } else {
                        clearInterval(timer);
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [allowSend]);

    const sendEmoji = (id: number) => {
        if (allowSend > 0) {
            notifications.show({
                title: 'Sending messages frequently',
                message: `You need to wait ${allowSend}s before sending`,
                color: 'red'
            })
        }
        else {
            setAllowSend(60)
            //@ts-ignore

            setCommentList([{
                commentType: 'default', text: id.toString(), "user.walletAddress": address as string
            }
                , ...commentList])
            if (address && selectedCoin)
                sendComment({
                    walletAddress: address,
                    tokenId: selectedCoin.coingeckoId,
                    commentType: 'default',
                    text: id.toString()
                }).then((res) => {
                    console.log(res, 'sendEmoji')
                })
        }

    }


    const sendText = () => {

        if(Number(textValue) === 0){
            notifications.show({
                title: 'Failed to send',
                message: `Message cannot be empty`,
                color: 'red'
            })
            return;

        }
        const { len, spaceCount } = countCharacters(textValue);

        if (len > 20 || textValue.length > 40) { 
            notifications.show({
                title: 'Failed to send',
                message: `Message is too long`,
                color: 'red'
            })
            return;
        }

        if (allowSend > 0) {
            notifications.show({
                title: 'Sending messages frequently',
                message: `You need to wait ${allowSend}s before sending`,
                color: 'red'
            })
        }
        else {
            setAllowSend(60)
            setTextValue("")
            //@ts-ignoreƒ
            setCommentList([{
                commentType: 'text', text: textValue.toString(), "user.walletAddress": address as string
            }
                , ...commentList])
            if (address && selectedCoin)
                sendComment({
                    walletAddress: address,
                    tokenId: selectedCoin.coingeckoId,
                    commentType: 'text',
                    text: textValue.toString()
                }).then((res) => {
                    console.log(res, 'sendText')
                })
        }

    }
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            sendText();
        }
    };

    return (
        <div className={styles.comments}>
            <div className={styles.shadow}></div>

            <div className={styles.left}>
                <div className={styles.pirce}>

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
                    {[0, 1, 2, 3, 4, 5].map((item) =>
                        <div style={{ width: '100%', height: '60px' }}>
                            <div className={styles["commentLine" + item % 3] + " " + styles.commentLine}>
                                {
                                    [...Array(2)].flatMap(() =>
                                        commentList.slice(item * 16, (item + 1) * 16).map((itemComment: Comment) => {
                                            if (itemComment.commentType == "default")
                                                return emoticons[extractNumbers(itemComment.text)[0] % 6].content
                                            if (itemComment.commentType == "mock")
                                                return <div className={styles.messageItem}>
                                                    {itemComment.text}
                                                </div>

                                        })
                                    )
                                }
                            </div>
                        </div>
                    )}
                    <div className={styles.commentShadow}>
                        <div ref={lottieContainerRef} style={{ width: 800, height: 800 }}></div>
                    </div>
                </div>

                <div className={styles.rightBottom}>
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
                        <input className={styles.inputText}
                            value={textValue}
                            onKeyDown={handleKeyDown}
                            onChange={(event) => { setTextValue(event.target.value) }}
                            type="text" />
                        <Image
                            onClick={sendText}
                            style={{ marginTop: '4px', cursor: 'pointer' }}
                            src={`/icons/send.svg`}
                            height={38}
                            width={38}
                            alt="send" />
                    </div>
                </div>
            </div>
        </div>
    );
}