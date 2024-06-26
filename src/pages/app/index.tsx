import Image from "next/image";
import styles from './index.module.css'
import LeftBar from "./LeftBar";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import Swap from "./Swap";
import Orders from "@/pages/app/Orders";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";
import axios from "axios";
import { api, fetchNonce, loginRequest } from "@/api";
import { signMessage } from "wagmi/actions";
import { Coin } from "@/type";

const Header = dynamic(() => import("./Header"), {
    ssr: false
});
export default function Hibit() {
    const [selectedCoin, setSelectedCoin] = useState<Coin>()
    const [like, setLike] = useState<boolean>(false)

    const { address, isConnected, isConnecting } = useAccount();

    useEffect(() => {
        const addressList = getLocalJWT();
        console.log(addressList)
        if (address && typeof addressList[address] == "string") {
            api.interceptors.request.use(config => {
                config.headers['Authorization'] = `${addressList[address]}`;
                return config;
            }, error => {
                return Promise.reject(error);
            });

            api.interceptors.response.use(
                response => {
                    return response;
                },
                error => {
                    if (error.response && error.response.status === 403) {
                        requestJWT();
                    }
                    return Promise.reject(error);
                }
            );
        } else {
            requestJWT();
        }

    }, [address])


    const getLocalJWT = (): Record<string, string> => {
        const addressList = localStorage.getItem('jwtTokens');
        return addressList ? JSON.parse(addressList) : {};
    };
    const setLocalJWT = (tokens: Record<string, string>): void => {
        localStorage.setItem('jwtTokens', JSON.stringify(tokens));
    };

    const requestJWT = async () => {
        try {
            if (address) {
                const res = await fetchNonce(address);
                const signedMessage = await signMessage({ message: res.data });
                const loginRes = await loginRequest(res.data, signedMessage, address);
                const addressList = getLocalJWT();
                addressList[address] = loginRes.data.token;
                setLocalJWT(addressList);
                api.interceptors.request.use(config => {
                    config.headers['Authorization'] = `${loginRes.data.token}`;
                    return config;
                }, error => {
                    return Promise.reject(error);
                });
            }
        } catch (error) {
            console.error('Error in requestJWT:', error);
        }
    }
    return (
        <div className={styles.hibit}>
            <LeftBar selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} like={like} setLike={setLike}/>
            <div className={styles.rightContent}>
                <Header selectedCoin={selectedCoin} like={like} setLike={setLike}/>
                <div className={styles.content}>
                    <Comments selectedCoin={selectedCoin} />
                    <div className={styles.buy_area}>
                        <Swap />
                        <Orders />
                    </div>
                </div>
            </div>
        </div>
    );
}
