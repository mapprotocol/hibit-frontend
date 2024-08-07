import {useTranslation} from "next-i18next";
import {useAccount, useNetwork, useSwitchNetwork} from "wagmi";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useMemo} from "react";
import {Button} from "@mantine/core";
import useWallets from "@/lib/wallets/useWallets";
import {WalletName} from "@/lib/types";
import useFromWallet from "@/hooks/useFromWallet";
import {getWalletNameForChainId} from "@/lib/configs";
import {setShowConfirmCard} from "@/store/global/global-slice";
import styles from './scss/swap.module.scss'
import { hansonFont } from "@/fonts";
import hanson from "@/fonts/hanson";

const EvmConfirmButton = ({
                              disabled,
                              onSubmit
                          }: {
    disabled: boolean;
    onSubmit: () => void;
}) => {
    const {connectWallet} = useWallets();
    const { t } = useTranslation("common");
    const from = useAppSelector((state) => state.routes.from);
    const { chain } = useNetwork();
    const { switchNetworkAsync } = useSwitchNetwork();
    const { address, isConnected, isConnecting } = useAccount();
    const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
    const to = useAppSelector((state) => state.routes.to);

    const isEvmNetworkCorrect = useMemo(() => {
        return chain?.id === Number(from?.chain?.chainId);
    }, [from?.chain?.chainId, chain?.id]);

    const handleSwitchNetwork = () => {
        if (from?.chain && switchNetworkAsync) {
            switchNetworkAsync(Number(from.chain.chainId));
        }
    };

    if (isConnected) {
        if (isEvmNetworkCorrect) {
            return (
                <Button
                    variant="transparent"
                    className={` ${hanson.className} ${styles.confirm_btn}`}
                    onClick={onSubmit}
                    disabled={disabled || !selectedRoute || selectedRoute === "empty"
                        || (selectedRoute?.dstChain?.chainId == '56' && to?.token?.id == 12264)}
                    h={44}
                >
                    {"Confirm"}
                </Button>
            );
        } else {
            return (
                //Switch Network
                <Button
                    variant="transparent"
                    className={` ${hanson.className} ${styles.switch_network_btn}`}
                    disabled={disabled}
                    onClick={handleSwitchNetwork}
                    h={49}
                    w={235}
                >
                    {"Switch Network"}
                </Button>
            );
        }
    } else {
        return (
            //Connect Network
            <Button
                variant="transparent"
                className={` ${hanson.className} ${styles.connect_btn}`}
                // loading={isConnecting}
                onClick={() => {
                    connectWallet(WalletName.EVM);
                }}
                h={49}
                w={235}
            >
                {"Connect Network"}
            </Button>
        );
    }
}

const ConfirmButton = ({
                           disabled,
                       }: {
    disabled: boolean;
}) => {
    const { t } = useTranslation("common");
    const dispatch = useAppDispatch();
    const {connectWallet} = useWallets();
    const from = useAppSelector((state) => state.routes.from);
    const to = useAppSelector((state) => state.routes.to);

    const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);

    const fromWallet = useFromWallet();
    const fromWalletName = useMemo(() => {
        return getWalletNameForChainId(from?.chain?.chainId);
    }, [from])

    const onSubmit = () => {
        dispatch(setShowConfirmCard(true));
    }

    if (fromWallet?.providerName === "evm") {
        return <EvmConfirmButton disabled={disabled} onSubmit={onSubmit} />;
    }

    if (!!fromWallet) {
        return (
            //Confirm
            <Button
                variant="transparent"
                className={` ${hanson.className} ${styles.confirm_btn}`}
                disabled={disabled || !selectedRoute || selectedRoute === "empty" || (selectedRoute?.dstChain?.chainId == '56' && to?.token?.id == 12264)}
                onClick={onSubmit} h={44}   >
                {"Confirm"}
            </Button>
        )
    }
    return (
        // "Connect Network"
        <Button
            variant="transparent"
            className={` ${hanson.className} ${styles.connect_btn}`}
            onClick={async () => {
                connectWallet(fromWalletName);
            }}
            h={49}
            w={235}
        >{
           "Connect Network"
        }
        </Button>
    )
};

export default ConfirmButton;
