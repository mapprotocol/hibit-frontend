import Image from "next/image";
import styles from './index.module.css'
import { useState } from "react";

export default function Orders({ }) {


    return (
        <div className={styles.orders}>
            <div className={styles.evaluate}>
                <img className={styles.evaluate_img} src="/images/evaluate/evaluate.png" alt=""/>
            </div>
        </div>
    );
}
