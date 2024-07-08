import Image from "next/image";
import styles from './index.module.css'
import lottie from 'lottie-web';
import { use, useEffect, useRef, useState } from "react";
import CylinderCanvas from "@/components/cylinder";
import { Coin, Comment } from "@/type";
import { fetchMyTokenTrade, fetchTokenComments, sendComment, trades } from "@/api";
import { useAccount } from "wagmi";
import { countCharacters, ellipsis, formatNumber } from "@/utils";
import { notifications } from "@mantine/notifications";
import CHAINS from "@/configs/chains";
import { useClipboard } from "@mantine/hooks";

const emoticons = [
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

let anim: any = null
export default function Comments({ selectedCoin, setSelectedCoin }: { selectedCoin: Coin | undefined, setSelectedCoin?: Function }) {
    const { address, isConnected, isConnecting } = useAccount();
    const lottieContainerRef = useRef(null);
    const [commentList, setCommentList] = useState<Comment[]>([])
    const [allowSend, setAllowSend] = useState(0)
    const [textValue, setTextValue] = useState("")
    const { copy, copied } = useClipboard();

    useEffect(() => {

        return () => {
            if (anim) {
                anim.destroy();
            }
        };
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
            fetch(`/lottie/${Number(selectedCoin.priceChangePercent) > 0 ? 'k-up' : 'k-down'}/${Number(selectedCoin.priceChangePercent) > 0 ? 'klinehighestup' : 'Klinedown'}.json`)
                .then(response => response.json())
                .then(animationData => {
                    if (anim) {
                        anim.destroy();
                    }
                    anim = lottie.loadAnimation({
                        container: lottieContainerRef.current!,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,

                        animationData: animationData,
                        assetsPath: `/lottie/${Number(selectedCoin.priceChangePercent) > 0 ? 'k-up' : 'k-down'}/images/`,

                    });
                    anim.setSpeed(0.5)
                    setTimeout(()=>{

                        anim?.stop()

                    },400)
                })
                .catch(error => console.error('Error loading animation data:', error));
        }
    }, [selectedCoin?.coingeckoId])

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

        if (Number(textValue) === 0) {
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
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [dragged, setDragged] = useState(false); // 添加一个状态来跟踪是否有拖动发生
    const [cardData, setCardData] = useState<any>([])
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        setStartX(e.pageX - (containerRef.current?.offsetLeft ?? 0));
        setScrollLeft(containerRef.current?.scrollLeft ?? 0);
        setDragged(false); // 在开始拖动时，设置为false
    };
    const onMouseUp = () => {
        setIsDragging(false);
        // 如果有拖动发生，则阻止'click'事件
        if (dragged) {
            window.addEventListener(
                'click',
                (e) => {
                    e.stopPropagation();
                },
                { capture: true, once: true }
            );
        }
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (containerRef.current?.offsetLeft ?? 0);
        const walk = (x - startX) * 1; // 滑动速度
        if (containerRef.current) {
            containerRef.current.scrollLeft = scrollLeft - walk;
        }
        if (Math.abs(x - startX) > 10) { // 如果移动超过10像素，则认为是拖动
            setDragged(true);
        }
    };
    const onMouseLeave = () => {
        setIsDragging(false);
    };
    return (
        <div className={styles.comments}>
            {selectedCoin && <>  <div className={styles.shadow}>

            </div>

                <div className={styles.left}>
                    <div className={styles.pirce}>
                        <div ref={lottieContainerRef} className={styles.kLine}></div>
                        {/* <Image
                    style={{ position: 'absolute', top: '70px', left: '20px' }}
                    src={`/images/klinebg.png`}
                    height={280}
                    width={280}
                    alt="send" /> */}
                        <div className={styles.highPrice}>
                            <div className={styles.priceTitle}>Highest (24h)</div>
                            <div className={styles.priceLine}>{"$ " + formatNumber(selectedCoin.highprice)} </div>
                        </div>
                        <div className={styles.currentPrice} style={{
                            backgroundColor: Number(selectedCoin.priceChangePercent) > 0 ? '#48F17A' : "FF4B87"
                        }}>

                            <div className={styles.currentText} >{"$ " + formatNumber(selectedCoin.price)} </div>
                        </div>

                        {selectedCoin.lowprice && <div className={styles.lowProce}>
                            <div className={styles.priceTitle}>Lowest (24h)</div>

                            <div className={styles.priceLine}>{"$ " + formatNumber(selectedCoin.lowprice)} </div>
                        </div>}

                    </div>
                    <div className={styles.coinsInfo}>
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

                            <div className={styles.infoItemValue}  >
                                <img
                                    style={{ height: 20, width: 20, borderRadius: '50%' }}
                                    src={CHAINS[selectedCoin.chainId].chainImage}
                                    alt="avatar" />
                                <div style={{ opacity: '0.6', }}>
                                    {CHAINS[selectedCoin.chainId].name}
                                </div>
                                <div>
                                    {ellipsis(selectedCoin?.tokenAddress)}
                                </div>
                                <div>
                                    <img
                                        onClick={() => {
                                            copy(selectedCoin?.tokenAddress)

                                        }}
                                        style={{ cursor: 'pointer' }}
                                        src={`/icons/copy.svg`}
                                        height={20}

                                        width={20}
                                        alt="send" />
                                </div>
                            </div>
                        </div>
                    </div>
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
                </div></>
            }
            <div className={styles.right}>
                <div className={styles.commentContent}>
                    {[0, 1, 2, 3, 4, 5].map((item) =>
                        <div style={{ width: '100%', height: '60px' }}>
                            <div className={styles["commentLine" + item % 3] + " " + styles.commentLine}>
                                {
                                    [...Array(2)].flatMap(() =>
                                        commentList.slice(item * 16, (item + 1) * 16).map((itemComment: Comment) => {
                                            if (itemComment.commentType == "default")
                                                return emoticons[extractNumbers(itemComment.text)[0] % 16].content
                                            else if (itemComment.commentType == "mock")
                                                return <div className={styles.messageItem}>
                                                    {itemComment.text}
                                                </div>
                                            else if (itemComment.commentType == "text")
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

                    </div>
                </div>

                <div className={styles.rightBottom}>
                    <div className={styles.rightLine}></div>
                    <div className={styles.emoticons}>
                        <div className={styles.emoticonsscroll} 
                        ref={containerRef}

                            style={{
                                cursor: isDragging ? 'grabbing' : 'grab',

                            }}
                            onMouseDown={onMouseDown}
                            onMouseLeave={onMouseLeave}
                            onMouseUp={onMouseUp}
                            onMouseMove={onMouseMove}>
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
        </div >
    );
}