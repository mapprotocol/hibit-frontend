import styles from './scss/wallet.module.scss'
import {Box, Button, Center, Loader, Popover, Space} from "@mantine/core";
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
import UpdateUsername from "@/components/my-wallet/update-username";

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
    const [showNoDate,setShowNoDate] = useState<boolean>(false);
    const [opened, setOpened] = useState(false);
    const [mainAmount,setMainAmount] = useState<string>('0');

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
            // if (chainId != 8453 && switchNetworkAsync) {
            //     try {
            //         await switchNetworkAsync(Number(8453));
            //     } catch (err) {
            //
            //     }
            //     return
            // }
            getTokens()
        }
    }

    const getTokens = async () => {
        setTokensLoading(true)
        let mainTokenPrice = 0
        if (address && chainId) {
            let myTokensResult = await fetchUserPosition(address, chainId)
            if (!myTokensResult || !myTokensResult.data) {
                setShowNoDate(true)
                setTokensLoading(false)
                return
            }

            mainTokenPrice = myTokensResult.data.gas.price

            let defaultToken = JSON.parse(CHAINS[chainId.toString()].nativeToken)

            if (!!currentWallet) {
                const mainBalance = await currentWallet.getBalances([
                    {
                        address: defaultToken.address,
                        decimals: defaultToken.decimals,
                    }
                ]
                   ,
                    Number(chainId),
                )
                console.log(`mainBalance`,mainBalance)

                setMainAmount(new Decimal(mainBalance[0]).mul(mainTokenPrice).toFixed(4))
            }




            let myTokens = myTokensResult.data.tokens



            if (!myTokens || myTokens.length == 0) {
                setShowNoDate(true)
                setTokensLoading(false)
                return
            }
            //tokenName  tokenLogoUrl   tokenAddress  tokenDecimal
            if (myTokens && myTokens.length > 0 && chainId) {
                //插入主币

                if (defaultToken) {
                    // myTokens.unshift({
                    //     tokenName:defaultToken.name,
                    //     tokenLogoUrl:defaultToken.logoURI,
                    //     tokenAddress:defaultToken.address,
                    //     tokenDecimal:defaultToken.decimals,
                    // })
                }
            }
            console.log(`myTokens`, myTokens)

            try{

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
                if(myTokensResult.length == 0) {
                    setShowNoDate(true)
                }
                setTokensLoading(false)
            }

            }catch(err) {
                setShowNoDate(true)
                setTokensLoading(false)
            }
        }
    }


    return <div className={styles.my_wallet}>
        <div className={styles.top}>
            <div className={styles.user_info}>
                <img className={styles.user_info_img} src="/images/wallet/metamask.svg" alt=""/>
                <div className={styles.user_info_desc}>

                    <Popover opened={opened} onChange={setOpened} position="bottom-end" shadow="md">
                        <Popover.Target>
                    <div onClick={() => setOpened((o) => !o)} className={styles.user_username}>{userInfo.username}
                        <img className={styles.user_username_edit} src="/images/wallet/edit.svg" alt=""/></div>
                        </Popover.Target>
                        <Popover.Dropdown>
                        <UpdateUsername onClose={setOpened} refreshUserInfo={getInfos}></UpdateUsername>
                        </Popover.Dropdown>
                    </Popover>

                    <div className={styles.user_address}>{ellipsisThree(userInfo.walletAddress)}</div>
                </div>
            </div>
            <div onClick={() => {
                disconnect()
            }} className={styles.disconnect_btn}>Disconnect
            </div>
        </div>
        <div className={styles.balance_area}>
            <div className={styles.balance}>${mainAmount}</div>

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
                        ))
                }
                {
                    showNoDate? <div className={styles.show_no_date}>No Portfolio</div>:null
                }
            </div>
        </div>

    </div>
}
export default MyWallet;
