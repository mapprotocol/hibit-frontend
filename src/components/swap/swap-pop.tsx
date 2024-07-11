import {NewOrderObj} from "@/utils/api/types";
import styles from './scss/pop.module.scss'
import {Button} from "@mantine/core";
import {useClipboard} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {showSuccess} from "@/utils/notifications";
import {useAccount} from "wagmi";
import {fetchOrderList, fetchUserInfo} from "@/api";
import {ellipsisThree} from "@/utils/addresses";
import {fixAmountStr} from "@/utils/numbers";
import Decimal from "decimal.js";
import moment from 'moment';
import suppercell from "@/fonts/supercell";

const SwapPop = (props: { onClose: (val: boolean) => void, newOrder: NewOrderObj | null, textValue: string }) => {
    const {onClose, newOrder, textValue} = props;
    const {copy, copied} = useClipboard();
    const {address, isConnected, isConnecting} = useAccount();
    const [userInfo, setUserInfo] = useState<any>({});


    useEffect(() => {
        if (copied) {
            showSuccess("Copied!");
        }
    }, [copied])

    useEffect(() => {
        if (address) {
            fetchUserInfo(address).then(res => {
                console.log(res, 'userInfo')
                if (res && res.data && res.data.user) {
                    setUserInfo(res.data.user)
                }
            })
        }
    }, [address])


    return <div className={styles.modal}>
        <div className={`${styles.modal_content} ${newOrder?.tradeType == 'sell' ? styles.modal_content_sell : null}`}>
            <div className={styles.top_area}>
                <div className={styles.user}>
                    <div className={styles.user_img_area}>
                        <img className={styles.user_img} src="/images/evaluate/order.png" alt=""/>
                    </div>
                    <div className={styles.user_detail}>
                        <div className={styles.user_name}>{userInfo.username}</div>
                        <div className={styles.user_address}>{ellipsisThree(address as `0x${string}`)}</div>
                    </div>
                </div>
                <div className={styles.swap_detail}>
                    <div className={styles.swap_detail_line}>
                        <div className={styles.swap_detail_line_left}>
                            <img className={styles.swap_point} src="/images/swap/point.svg" alt=""/>
                            {newOrder?.tradeType == 'sell' ? 'Sell Amount':"Buy Amount"}
                        </div>
                        <div
                            className={styles.swap_detail_line_right}>{fixAmountStr(newOrder?.tradeAmount)} {newOrder?.symbol}</div>
                    </div>
                    <div className={styles.swap_detail_line}>
                        <div className={styles.swap_detail_line_left}>
                            <img className={styles.swap_point} src="/images/swap/point.svg" alt=""/>
                            Limit Price
                        </div>
                        <div className={styles.swap_detail_line_right}>{newOrder?.tradePrice} USDT</div>
                    </div>
                    <div className={styles.swap_detail_line}>
                        <div className={styles.swap_detail_line_left}>
                            <img className={styles.swap_point} src="/images/swap/point.svg" alt=""/>
                            Value
                        </div>
                        <div
                            className={styles.swap_detail_line_right}>${new Decimal(newOrder?.tradePrice ? newOrder?.tradePrice : 0).mul(newOrder?.tradeAmount ? newOrder?.tradeAmount : 0).toFixed(4)}</div>
                    </div>
                </div>
            </div>
            <div className={styles.swap_type_area}>
                <div className={styles.swap_type}>
                    {
                        newOrder?.tradeType == 'sell' ?
                            <img className={styles.swap_type_img} src="/images/swap/pop_sell.png" alt=""/>
                            : <img className={styles.swap_type_img} src="/images/swap/pop_buy.png" alt=""/>
                    }

                </div>
                <div className={styles.swap_time}>{moment().format("HH:mm MMM DD YYYY")}</div>
            </div>
            <div className={styles.token_area}>
                <div className={styles.token_detail}>
                    <div className={styles.token_img_div}>
                        <img className={styles.token_img}
                             src={newOrder?.image} alt=""/>
                    </div>
                    <div className={styles.token_name}>
                        <div className={styles.token_name_title}>
                            {newOrder?.symbol.toUpperCase()}
                        </div>
                        <div className={styles.token_name_bg}></div>
                    </div>
                </div>
                <div className={ ` ${styles.pop_text} ${suppercell.className}`}>
                    {textValue}
                </div>
            </div>
            <div className={styles.share_area}>
                <div className={styles.share_area_content}>
                    {
                        newOrder?.tradeType == 'sell' ?
                            <img className={styles.share_img} src="/images/swap/pop_bottom_sell.png" alt=""/>
                            : <img className={styles.share_img} src="/images/swap/pop_bottom.png" alt=""/>
                    }

                </div>
            </div>
            <div className={styles.share_btn}>
                <Button
                    variant="transparent"
                    className={styles.share_btn_bg}
                    onClick={() => {
                        copy(location.href)
                    }}
                    h={40}
                    w={110}
                >
                    {""}
                </Button>
            </div>
            <div
                onClick={() => {
                    onClose(false)
                }}
                className={styles.modal_close}>
                <img src="/images/swap/pop_close.svg" alt=""/>
            </div>

        </div>
    </div>
}
export default SwapPop;
