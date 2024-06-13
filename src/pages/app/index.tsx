import Image from "next/image";
import styles from './index.module.css'
import LeftBar from "./LeftBar";
import { useState } from "react";
import Comments from "./Comments";
import Swap from "./Swap";
import Header from "./Header";
import Orders from "@/pages/app/Orders";

export default function Hibit() {
    const [selectedCoin, setSelectedCoin] = useState(1)
    return (
        <div className={styles.hibit}>
            <LeftBar selectedCoin={selectedCoin} />
            <div className={styles.rightContent}>
                <Header />
                <div className={styles.content}>
                    <Comments />
                    <div className={styles.buy_area}>
                        <Swap />
                        <Orders />
                    </div>
                </div>
            </div>
        </div>
    );
}
