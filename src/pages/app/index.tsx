import Image from "next/image";
import styles from './index.module.css'
import LeftBar from "./LeftBar";
import { useEffect, useRef, useState } from "react";
import Comments from "./Comments";
import Swap from "./Swap";
import Orders from "@/pages/app/Orders";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";
import axios from "axios";
import { api, fetchNonce, loginRequest } from "@/api";
import { useRouter } from "next/router";

import { signMessage } from "wagmi/actions";
import { Coin } from "@/type";
import SwapSearchContainer from "@/components/swap/swap-search-container";
import Head from "next/head";

const Header = dynamic(() => import("./Header"), {
    ssr: false
});

let requesting = false
export default function Hibit() {
    const [selectedCoin, setSelectedCoin] = useState<Coin>()
    const [like, setLike] = useState<boolean>(false)
    const { address, isConnected, isConnecting } = useAccount();

    const router = useRouter();

    useEffect(() => {
        if (selectedCoin?.coingeckoId)
            router.push({
                pathname: router.pathname,
                query: {
                    coingeckoId: `${selectedCoin?.coingeckoId}`
                }
            })
    }, [selectedCoin?.coingeckoId])


    useEffect(() => {
        const addressList = getLocalJWT();
        console.log(address, addressList, 1111)
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
                        console.log("403 requeset")
                        requestJWT();
                    }
                    if (error.response && error.response.status === 401) {

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
        if (requesting)
            return;
        try {

            if (address) {
                requesting = true
                const res = await fetchNonce(address);
                const signedMessage = await signMessage({ message: res.data });
                const loginRes = await loginRequest(res.data, signedMessage, address);
                const addressList = getLocalJWT();
                addressList[address] = loginRes.data.token;
                setLocalJWT(addressList);
                api.interceptors.request.use(config => {
                    requesting = false

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
    const childBMethodRef = useRef(null);

    // Function to trigger the method in ChildB
    const sendComment = (param: any) => {
        if (childBMethodRef.current) {
            //@ts-ignore
            childBMethodRef?.current(param);
        }
    };
    return (<>
        <Head>

            <title>{"bibobibo"}</title>
            <meta name="description" content={""} />
            <link rel="icon" href="/images/logo.jpg" />
            <meta property="og:image" content="/icons/logo.svg" />
        </Head>
        <div className={styles.hibit}>
            <LeftBar selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} like={like} setLike={setLike} />
            <div className={styles.rightContent}>
                <Header selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} like={like} setLike={setLike} />
                <div id={'content'} className={styles.content}>
                    <Comments methodReference={childBMethodRef} selectedCoin={selectedCoin} />
                    <div className={styles.buy_area}>
                        <SwapSearchContainer>
                            <Swap sendComment={sendComment} selectedCoin={selectedCoin} />
                        </SwapSearchContainer>
                        <Orders selectedCoin={selectedCoin} />
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
