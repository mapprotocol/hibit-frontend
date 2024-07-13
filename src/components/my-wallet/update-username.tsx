import styles from './scss/updateUsername.module.scss'
import {useAccount} from "wagmi";
import hanson from "@/fonts/hanson";
import {notifications} from "@mantine/notifications";
import {countCharacters} from "@/utils";
import {useState} from "react";
import {fetchUserPosition, sendUpdateUsername} from "@/api";
import {showSuccess} from "@/utils/notifications";

const UpdataUsername = (props: { onClose: (val: boolean) => void,refreshUserInfo:()=>void}) => {
    const {onClose,refreshUserInfo} = props;
    const {address} = useAccount();
    const [textValue, setTextValue] = useState<string>('');

    const changeUsername = async () => {

        if (Number(textValue) === 0) {
            notifications.show({
                title: 'Failed to send',
                message: `Name cannot be empty`,
                color: 'red'
            })
            return;

        }
        const {len, spaceCount} = countCharacters(textValue);

        if (len > 10 || textValue.length > 10) {
            notifications.show({
                title: 'Failed to send',
                message: `Name is too long`,
                color: 'red'
            })
            return;
        }

        let updateResult = await sendUpdateUsername({
            walletAddress: address as `0x${string}`,
            userName: textValue
        })

        if (updateResult.msg == 'success') {
            showSuccess('Update Success!')
        }

        refreshUserInfo()
        onClose(false)


    }

    return <div className={styles.update_username}>
        <div className={styles.top}>
            <div className={` ${hanson.className} ${styles.title}`}>Change Name</div>
            <div onClick={() => {
                onClose(false)
            }} className={styles.close}>
                <img className={styles.close_icon} src="/images/wallet/close.svg" alt=""/>
            </div>
        </div>
        <input className={styles.input} placeholder={'Enter your user name'}
               onChange={(event) => {
                   setTextValue(event.target.value)
               }}
               type="text"/>

        <div onClick={() => {
            changeUsername()
        }} className={styles.btn_confirm}>Update
        </div>
    </div>
}
export default UpdataUsername;
