import Image from "next/image";
import styles from './index.module.css'
import { useState } from "react";
import { Comment } from "@/type";

export default function TradeComment({ comment }: { comment: Comment }) {


    return (
        <div className={styles.comment}>
            <div className={styles.tradeComment}>
                <div className={styles.messageImageBig}>
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={`/icons/message/${comment.tradeType == 'buy' ? 'buy' : 'sell'}.svg`}
                        alt="hat" />
                </div>
                <span className={comment.tradeType == 'buy' ? styles.buyText : styles.sellText}
                >
                    {comment.text}
                </span>
                <div className={styles.commentRight}>
                    <div className={styles.tradeAmount}
                        style={{ backgroundColor: comment.tradeType == 'buy' ? '#3BF873' : '#FF4B87' }}>
                        {(comment.tradeType == 'buy' ? 'Buy' : 'Sell') + "$" + (Number(comment?.tradeAmount).toFixed(2) || '1000')}
                    </div>
                    <div className={styles.image1}>
                        <Image
                            fill
                            style={{ objectFit: "contain" }}
                            src={`/icons/message/${comment.tradeType == 'buy' ? 'buy' : 'sell'}-1.svg`}
                            alt="hat" />
                    </div>
                    <div className={styles.image2}>
                        <Image
                            fill
                            style={{ objectFit: "contain" }}
                            src={`/icons/message/${comment.tradeType == 'buy' ? 'buy' : 'sell'}-2.svg`}
                            alt="hat" />
                    </div>
                    <div className={styles.image3}>
                        <Image
                            fill
                            style={{ objectFit: "contain" }}
                            src={`/icons/message/${comment.tradeType == 'buy' ? 'buy' : 'sell'}-3.svg`}
                            alt="hat" />
                    </div>

                </div>
            </div>

            <div className={styles.avatar} style={{
                backgroundColor: comment.tradeType == 'buy' ? '#0078FF' : '#A050F6'
            }}>
                <div className={styles.avatarImage} style={{
                    borderColor: comment.tradeType == 'buy' ? '#3BF873' : '#FF4B87'
                }}>
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={`/images/evaluate/order.png`}
                        alt="hat" />
                </div>
            </div>
            <div className={styles.starImage}>
                <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={`/icons/message/star.svg`}
                    alt="hat" />
            </div>
            <div className={styles.rightContent}>


            </div>
        </div>
    );
}