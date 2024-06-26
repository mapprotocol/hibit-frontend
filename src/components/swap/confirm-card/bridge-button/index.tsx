import useFromWallet from "@/hooks/useFromWallet";
import {WalletName} from "@/lib/types";
import EvmBridgeButton from "@/components/swap/confirm-card/bridge-button/evm-bridge-button";
import NearBridgeButton from "@/components/swap/confirm-card/bridge-button/near-bridge-button";
import TronBridgeButton from "@/components/swap/confirm-card/bridge-button/tron-bridge-button";
import SolanaBridgeButton from "@/components/swap/confirm-card/bridge-button/solana-bridge-button";

const BridgeButton = () => {
    const fromWallet =  useFromWallet();
    switch (fromWallet?.providerName) {
        case WalletName.EVM:
            return <EvmBridgeButton></EvmBridgeButton>
        case WalletName.NEAR:
            return <NearBridgeButton></NearBridgeButton>
        case WalletName.TRON:
            return <TronBridgeButton></TronBridgeButton>
        case WalletName.SOLANA:
            return <SolanaBridgeButton></SolanaBridgeButton>
        default:
            return <></>
    }
}

export default BridgeButton;
