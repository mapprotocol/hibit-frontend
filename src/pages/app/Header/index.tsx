import Image from "next/image";
import styles from './index.module.css'
import { useRef, useState } from "react";



export default function Header({ }) {
    const [showPanel, setShowPanel] = useState(false);
    const timeoutRef = useRef(null);

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

    const handlePanelMouseDown = (event) => {
        event.preventDefault();
    };
    return (
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
                            placeholder={"Search tokens"} />
                    </div>

                    {showPanel && (
                        <div className={styles.searchPanel} onMouseDown={handlePanelMouseDown}>

                        </div>
                    )}
                </div>

                <div className={styles.share}>

                </div>
                <div className={styles.like}>

                </div>
            </div>
        </div>
    );
}