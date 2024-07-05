import styles from './scss/wallet.module.scss'
import {Box, Button, Center, Loader, Space} from "@mantine/core";
import {useClipboard} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {showSuccess} from "@/utils/notifications";
import {useAccount, useDisconnect, useChainId, useSwitchNetwork} from "wagmi";
import {fetchOrderList, fetchUserInfo, fetchUserPosition} from "@/api";
import {ellipsisThree} from "@/utils/addresses";
import {fixAmountStr} from "@/utils/numbers";
import Decimal from "decimal.js";
import moment from 'moment';
import useFromWallet from "@/hooks/useFromWallet";
import useCurrentWallet from "@/hooks/useCurrentWallet";
import CHAINS from "@/configs/chains";
import {toNumber} from "lodash";

const MyWallet = () => {

    const {address} = useAccount();
    const {disconnect} = useDisconnect();
    const [tokens, setTokens] = useState<any[]>([]);
    const [userInfo, setUserInfo] = useState<any>({});
    const [honors, setHonors] = useState<any>({});
    const chainId = useChainId();
    const currentWallet = useCurrentWallet();
    const {switchNetworkAsync} = useSwitchNetwork();
    const [totalAmount, setTotalAmount] = useState<string>('0');
    const [tokensLoading, setTokensLoading] = useState<boolean>(false);
    useEffect(() => {
        getInfos()
    }, [chainId]);

    const getInfos = async () => {
        if (address) {
            fetchUserInfo(address).then(res => {
                console.log(res, 'userInfo')
                if (res && res.data && res.data.user) {
                    setUserInfo(res.data.user)
                }
            })

            //钱包需要切换到base链
            if (chainId != 8453 && switchNetworkAsync) {
                try {
                    await switchNetworkAsync(Number(8453));
                } catch (err) {

                }
                return
            }
            getTokens()
        }
    }

    const getTokens = async () => {
        setTokensLoading(true)
        if (address) {
            let myTokensResult = await fetchUserPosition(address)
            if (!myTokensResult || !myTokensResult.data) {
                return
            }
            let myTokens = myTokensResult.data
            //tokenName  tokenLogoUrl   tokenAddress  tokenDecimal
            if (myTokens && myTokens.length > 0 && chainId) {
                //插入主币
                let defaultToken = JSON.parse(CHAINS[chainId.toString()].nativeToken)
                if (defaultToken) {
                    // myTokens.unshift({
                    //     tokenName:defaultToken.name,
                    //     tokenLogoUrl:defaultToken.logoURI,
                    //     tokenAddress:defaultToken.address,
                    //     tokenDecimal:defaultToken.decimals,
                    // })
                }
            }
            console.log(`mtTokens`, myTokens)

            if (!!currentWallet) {
                console.log(`currentWallet`, currentWallet, chainId)
                const balances = await currentWallet.getBalances(
                    myTokens.map((item: any) => {
                        return {
                            address: item.tokenAddress,
                            decimals: item.tokenDecimal,
                        }
                    }),
                    Number(chainId),
                )

                myTokens = myTokens.map((item: any, index: number) => {
                    return {
                        ...item,
                        balance: Number(balances[index]).toFixed(),
                    }
                })

                console.log(`myTokens`, myTokens, balances)

                let totalAmountResult = '0'

                let myTokensResult = []

                // for (let i = 0; i < myTokens.length; i++) {
                //     let myToken = myTokens[i]
                //     if (Number(balances[i]) > 0) {
                //         myToken.balance = balances[i]
                //         let amount = new Decimal(myToken.balance).mul(myToken.price).toFixed(4)
                //         myToken.amount = amount
                //         totalAmountResult = new Decimal(totalAmountResult).add(amount).toFixed(4)
                //         myTokensResult.push(myToken)
                //     }
                // }

                for (let myToken of myTokens) {
                    if (myToken.balance > 0) {
                        let amount = new Decimal(myToken.balance).mul(myToken.price).toFixed(4)
                        myToken.amount = amount
                        totalAmountResult = new Decimal(totalAmountResult).add(amount).toFixed(4)
                        myTokensResult.push(myToken)
                    }
                }
                setTotalAmount(totalAmountResult)
                setTokens(myTokensResult)
                setTokensLoading(false)
            }
        }
    }

    return <div className={styles.my_wallet}>
        <div className={styles.top}>
            <div className={styles.user_info}>
                <img className={styles.user_info_img} src="/images/wallet/metamask.svg" alt=""/>
                <div className={styles.user_info_desc}>
                    <div className={styles.user_username}>{userInfo.username}
                        <img className={styles.user_username_edit} src="/images/wallet/edit.svg" alt=""/></div>
                    <div className={styles.user_address}>{ellipsisThree(userInfo.walletAddress)}</div>
                </div>
            </div>
            <div onClick={() => {
                disconnect()
            }} className={styles.disconnect_btn}>Disconnect
            </div>
        </div>
        <div className={styles.balance_area}>
            <div className={styles.balance}>${totalAmount}</div>

            {/*<div className={styles.reward}>*/}
            {/*    <img className={styles.gift_icon} src="/images/wallet/gift.svg" alt=""/>*/}
            {/*    <span className={styles.gift_title}>My Rewards</span>*/}
            {/*    <span className={styles.gift_amount}>$122.00</span>*/}
            {/*</div>*/}

        </div>
        <div className={styles.balance_title}>Wallet Balance</div>
        <div className={styles.insigne_area}>
            <div className={styles.insigne_A}> Elite</div>
            <div className={styles.insigne_B}>
                <img className={styles.insigne_ico} src="/images/swap/doge.png" alt=""/>
                Frontrunner
            </div>
        </div>
        <Space h={20}></Space>
        <div className={styles.wallet_line}></div>


        {/*<div className={styles.invitation_area}>*/}
        {/*    <div className={styles.invitation_left}>*/}
        {/*        <img className={styles.invitation_icon} src="/images/wallet/invite.svg" alt=""/>*/}
        {/*        My Invitation Link*/}
        {/*        <img className={styles.invitation_help} src="/images/wallet/help.svg" alt=""/>*/}
        {/*        <div className={styles.invitation_num}>*/}
        {/*            3<span className={styles.invitation_num_gray}>/3</span>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className={styles.invitation_link}>*/}
        {/*        www.bibobibo.xyz/quwwss*/}
        {/*        <img className={styles.invitation_copy_icon} src="/images/wallet/copy.svg" alt=""/>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<div className={styles.invitation_area}>*/}
        {/*    <div className={styles.invitation_left}>*/}
        {/*        <img className={styles.invitation_icon} src="/images/wallet/point.svg" alt=""/>*/}
        {/*        My Points*/}
        {/*        <img className={styles.invitation_help} src="/images/wallet/help.svg" alt=""/>*/}
        {/*        <div className={styles.invitation_num}>*/}
        {/*            15*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<Space h={20}></Space>*/}
        {/*<div className={styles.wallet_line}></div>*/}


        <div className={styles.property_area}>
            <div className={styles.property_title}>My Portfolio</div>
            <div className={styles.propertis}>
                {
                    tokensLoading ?
                        <Box>
                            <Center w={"100%"} h={"50px"}>
                                <Loader></Loader>
                            </Center>
                        </Box> :

                        tokens.map((item, index) => (
                            <div key={item.coingeckoId} className={styles.property}>
                                <div className={styles.property_left}>
                                    <img className={styles.token_img} src={item.tokenLogoUrl} alt=""/>
                                    {item.tokenName}
                                </div>
                                <div className={styles.property_right}>
                                    <div className={styles.balance}>{fixAmountStr(item.balance)}</div>
                                    <div className={styles.amount}>${item.amount}</div>
                                </div>
                            </div>
                        ))}
            </div>
        </div>

    </div>
}
export default MyWallet;
