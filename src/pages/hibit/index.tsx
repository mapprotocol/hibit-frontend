import Image from "next/image";
import styles from './index.module.css'
import LeftBar from "./LeftBar";
import { useState } from "react";
import Comments from "./Comments";
import Swap from "./Swap";

export default function Hibit() {
    const [selectedCoin, setSelectedCoin] = useState(1)
    return (
        <div className={styles.hibit}>
            <LeftBar selectedCoin={selectedCoin} />
            <div className={styles.rightContent}>
                <div className={styles.header}>
                    <div className={styles.selectedCoin}>
                        <div className={styles.coinAvatar}>
                            <img
                                style={{ objectFit: "contain" }}
                                src={"https://s3-alpha-sig.figma.com/img/2a5a/72d0/22a2e0d21fab55de9af04226ec36c557?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T77SWhCIj9i-aV5lap4Q2OO6voD3m~5F66f~aOWkfZk1UsIoq-d8P7mT004MiS0KOoUWM5Dtb-X0yE8aKUmIqqYWanssI4OfQ0SKyQ-kkxTK7lX8YvRALg0nNpD8iRXz~T5Ghry2o8PpxiPLbr6HDN4cGsRXZNbN4djScfEvnQyLjVgoZSx6ZjbOxwQIIa-BBo~4lQxDAkPzgti4Ck8MEFVeLNar388NVK64ETZfcvYYgOF7EMjf6XaidGaB5XlgfXGaeSJfmYUNXCfDXVKdK6G9pvJh1BVhb7~ysv2QiMxKhB1db2VKFlFex8rSWzONrjw8ylgG8-N6RYLRXQODJw__"}
                                alt="avatar" /></div>
                        <div className={styles.coinName}>{"DOGE"}</div>
                        <div className={styles.price}>{"$0.000217"}</div>

                        <div className={styles.change}>
                            <Image
                                style={{ objectFit: "contain" }}
                                src={`/icons/arrow-up.svg`}
                                height={10}
                                width={10}
                                alt="arrow" />{"28.8%"}
                        </div>
                    </div>
                    <div className={styles.headerRight}>
                        <div >
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    <Comments />
                    <Swap />
                </div>
            </div>
        </div>
    );
}