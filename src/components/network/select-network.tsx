import styles from './scss/index.module.scss'
import {useAccount, useDisconnect, useChainId, useSwitchNetwork} from "wagmi";
import {useEffect, useState} from "react";
import CHAINS from "@/configs/chains";

const SelectNetwork = (props: { onClose: (val: boolean) => void}) => {
    const chainId = useChainId();
    const {onClose} = props;
    const [networks, setNetworks] = useState<any[]>([]);

    const {switchNetworkAsync} = useSwitchNetwork();

    useEffect(() => {
        setNetworks(Object.values(CHAINS))
    }, []);



    const changeNetwork = async (chainId:string) => {
        onClose(false)
        if(switchNetworkAsync){
            switchNetworkAsync(Number(chainId))
        }
    }



    return <div className={styles.networks}>
        {
            networks.map((item, index) => (
                <div onClick={()=>{
                    changeNetwork(item.chainId)
                }} key={item.chainId} className={styles.network}>
                    <div className={styles.chain}>
                        <img className={styles.chain_img} src={item.chainImage} alt=""/>
                        <span>{item.name}</span>
                    </div>
                    {
                        item.chainId == chainId &&
                        <img className={styles.selected} src="/images/swap/selected_icon.svg" alt=""/>
                    }

                </div>
            ))
        }

    </div>
}
export default SelectNetwork;
