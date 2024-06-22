import {Wallet} from "@rainbow-me/rainbowkit";
import BefiIcon from "../../../public/images/icon-befi.webp";
import BefiConnector from "@/utils/connectors/befi-connector";
import UDIcon from "../../../public/images/icon-ud.webp";
export const befiWallet = (): Wallet => ({
    id: 'befi',
    name: "Befi Wallet",
    iconUrl: BefiIcon.src,
    iconBackground: "black",
    createConnector: () => {
        const connector = new BefiConnector();
        return {
            connector,
        }
    }
})

