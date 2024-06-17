import Image from "next/image";
import styles from './index.module.css'
import { useEffect, useState } from "react";
import { fetchWatchList } from "@/api";
import { useAccount } from "wagmi";
import axios from "axios";


const coins = [
    {
        bg: 'https://s3-alpha-sig.figma.com/img/2a5a/72d0/22a2e0d21fab55de9af04226ec36c557?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T77SWhCIj9i-aV5lap4Q2OO6voD3m~5F66f~aOWkfZk1UsIoq-d8P7mT004MiS0KOoUWM5Dtb-X0yE8aKUmIqqYWanssI4OfQ0SKyQ-kkxTK7lX8YvRALg0nNpD8iRXz~T5Ghry2o8PpxiPLbr6HDN4cGsRXZNbN4djScfEvnQyLjVgoZSx6ZjbOxwQIIa-BBo~4lQxDAkPzgti4Ck8MEFVeLNar388NVK64ETZfcvYYgOF7EMjf6XaidGaB5XlgfXGaeSJfmYUNXCfDXVKdK6G9pvJh1BVhb7~ysv2QiMxKhB1db2VKFlFex8rSWzONrjw8ylgG8-N6RYLRXQODJw__',
        name: 'BRETT',
        change: '3,210%',
        time: 'Apr 12',
        pirce: '0.584427'
    },
    {
        bg: 'https://s3-alpha-sig.figma.com/img/d299/0674/461778852b067d53dfbef06684b53acc?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cRJRb6gk~1P7wFQgUAF~4aaZYLP8Phc0b1oQmOr~BCjtlAqbLyHQhJRobLa~urqhtVqqMNmVOlxwkURFtb7j-QQjM75mSdm8njo9KCLzvdZwIF5Ck5HI4J~h-Q6nByy5fVc8zmW0~hESs1xh48fasn6wgjYAGH7apTnWCab8R4wYn0H6~6cuZaKrej4-EdD9aESmVR~i33jD--0or2gLlHa9IBKE-uD~nsTTFvsMK4xkIQQ9ry6peLMfzlJ88o6dHSKxd6WsAQkuaZLtikd5dwAssAR8uwv~HkUVASXw8uQX5L2~DjE6rFPtpbp16dPm~zL0Q2RaIH-5CLuWYOTW0Q__',
        name: 'PEACH',
        change: '332%',
        time: 'Apr 12',
        pirce: '0.584427'

    },
    {
        bg: 'https://s3-alpha-sig.figma.com/img/0074/b231/1e7702afa54132a33ca4bd39397f4ac8?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ijWPmXSD7V4SwEETFrZL7nECfN1X6rtukHO6x6Ug~LhYh1ckbHqkn1bkQosCTleeoLEZMuWGXKVRbox0aJ2D6HuxrPHFl-uaNQUkJrUjNI5NMxxkv0PkZPHM2dY4s-L3gDjEA7IVsxpZONh9mocjzQ4Br~nFKmrfIWgiL-Vv~x9t9w3d67AsHnPhqwcM0xdqhSyT4q7gH5GiO6v9tco-av-HND56Np4aBIIlbBh408e5X7ZHNupfyJO63Vopjv5NB7e3Qk3qaUCkHEcpEvQZ~7ROjJ8dg5uhKcYdpER8jQPxKIrzNLV8ghjif0vTdjlDdr8Q6iyNi3CbGpQjXlJ9-w__',
        name: 'FET',
        change: '28.8%',
        time: 'Apr 12',
        pirce: '0.584427'

    },
    {
        bg: 'https://s3-alpha-sig.figma.com/img/2a5a/72d0/22a2e0d21fab55de9af04226ec36c557?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T77SWhCIj9i-aV5lap4Q2OO6voD3m~5F66f~aOWkfZk1UsIoq-d8P7mT004MiS0KOoUWM5Dtb-X0yE8aKUmIqqYWanssI4OfQ0SKyQ-kkxTK7lX8YvRALg0nNpD8iRXz~T5Ghry2o8PpxiPLbr6HDN4cGsRXZNbN4djScfEvnQyLjVgoZSx6ZjbOxwQIIa-BBo~4lQxDAkPzgti4Ck8MEFVeLNar388NVK64ETZfcvYYgOF7EMjf6XaidGaB5XlgfXGaeSJfmYUNXCfDXVKdK6G9pvJh1BVhb7~ysv2QiMxKhB1db2VKFlFex8rSWzONrjw8ylgG8-N6RYLRXQODJw__',
        name: 'BRETT',
        change: '28.8%',
        time: 'Apr 12',
        pirce: '0.584427'

    },
    {
        bg: 'https://s3-alpha-sig.figma.com/img/addc/f5c4/059e8704f85efe5c2e6bee578cc222ce?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HHnHnlxx5WF-cTLepZKKKmTG5xjouyOeMSEknTJOaT34wGQTP5AOslPO5OYFFNc74WOeACn6Uf2LNd8IjasGLv2VEIDmqxx3JjYWWFAVyF1ZfR7rKXDnipDxIRYTCGsS6~iYL3h~1RUF0HMlkPPzX1L-LEhlT-0ZwIZuwn3Ej33FQ20HzJCRspoX3ejhDfG-2g8GQOaRnlM9kDztSYFVeJMFkRiDoaGwwXZ2MfARff6iJi9DIlb7qX4U8kSboUeozpJ9~JN6yjfMDSCR-fru9OYXjrrI3JtRp-eWpfo8PSipby596ddcBFZ6d~y2Y7ZU8T8FUtUhzNwvmihrxXERmg__',
        name: 'DEGEN',
        change: '28.8%',
        time: 'Apr 12',
        pirce: '0.584427'

    },
    {
        bg: '/images/coin2.png',
        name: 'PEPE',
        change: '28.8%',
        time: 'Apr 12',
        pirce: '0.584427'

    },
]

export default function LeftBar({ selectedCoin }: { selectedCoin: number }) {
    const { address, isConnected, isConnecting } = useAccount();

    useEffect(()=>{
        console.log(axios.defaults.headers)
        if(address)
        fetchWatchList(address).then(res=>{
            console.log(res)
        })
    },[])
    const [active, setActive] = useState(0)
    return (
        <div className={styles.leftBar}>
            <div className={styles.logo}>
                <Image
                    height={52}
                    width={110}
                    src={`/icons/logo.svg`}
                    alt="logo" />
            </div>
            <div className={styles.leftTabs}>
                <div className={styles.leftTab}
                    style={{ opacity: active == 0 ? 1 : 0.8 }}
                    onClick={() => setActive(0)}
                >
                    {'Hot Coins'}
                    {active == 0 && <div className={styles.bottomBorder}></div>}
                </div>
                <div
                    className={styles.leftTab}
                    style={{ opacity: active == 1 ? 1 : 0.8 }}
                    onClick={() => setActive(1)}
                >
                    {'Watchlist'}
                    {active == 1 && <div className={styles.bottomBorder}></div>}
                </div>
            </div>
            <div className={styles.coinslist}>
                {coins.concat(coins).map((item, index) =>
                    <div key={index} className={styles.coinItem}>
                        <div className={styles.coinItemLeft}>
                            <div className={styles.coinAvatar}>
                                <img
                                    style={{ objectFit: "contain" }}
                                    src={item.bg}
                                    alt="avatar" /></div>
                            <div className={styles.coinName}>{item.name}</div>
                        </div>
                        <div className={styles.coinRight}>
                            <div className={styles.change}>
                                <Image
                                    style={{ objectFit: "contain" }}
                                    src={`/icons/arrow-up.svg`}
                                    height={10}
                                    width={10}
                                    alt="arrow" />{item.change}
                            </div>
                            <div className={styles.price}>
                                {"$" + item.pirce}
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    );
}