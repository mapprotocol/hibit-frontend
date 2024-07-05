import {AppProps} from 'next/app';

import Layout from '@/pages/layout';

import "./globals.css";
import {MantineProvider} from "@mantine/core";

import theme from "@/theme";
import {Provider} from "react-redux";
import store from "@/store";
import {ModalsProvider} from "@mantine/modals";
import '@rainbow-me/rainbowkit/styles.css';

import {
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets,
    Locale,
} from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
    oneKeyWallet
} from '@rainbow-me/rainbowkit/wallets';
import {Chain, configureChains, createConfig, WagmiConfig} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';
import {
    arbitrum,
    base, linea,
    mainnet,
    optimism,
    polygon,
    sepolia,
    zora,
} from 'wagmi/chains';
import EvmProvider from '@/lib/providers/EvmProvider';
import TronProvider from "@/lib/providers/TronProvider";
import SolanaProvider from "@/lib/providers/SolanaProvider";
import NearProvider from "@/lib/providers/NearProvider";
import { Notifications } from '@mantine/notifications';
import NotificationsProvider from '@/components/notifications-provider';


const map: Chain = {
    id: 22776,
    name: 'MAP Protocol',
    network: 'MAP Protocol',
    nativeCurrency: {
        decimals: 18,
        name: 'MAPO',
        symbol: 'MAPO',
    },
    rpcUrls: {
        public: {http: ['https://rpc.maplabs.io']},
        default: {http: ['https://rpc.maplabs.io']},
    },
    blockExplorers: {
        default: {name: 'MAP Scan', url: 'https://maposcan.io/'},
    },
    contracts: {},
    testnet: false,
};
const merlin: Chain = {
    id: 4200,
    name: 'Merlin Chain',
    network: 'Merlin Chain',
    nativeCurrency: {
        decimals: 18,
        name: 'BTC',
        symbol: 'BTC',
    },
    rpcUrls: {
        public: {http: ['https://rpc.merlinchain.io']},
        default: {http: ['https://rpc.merlinchain.io']},
    },
    blockExplorers: {
        default: {name: 'Merlin Chain', url: 'https://scan.merlinchain.io/'},
    },
    contracts: {},
    testnet: false,
};

const map_testnet: Chain = {
    id: 212,
    name: 'MAP Makalu',
    network: 'MAP Testnet Makalu',

    nativeCurrency: {
        decimals: 18,
        name: 'MAP Makalu',
        symbol: 'MAP',
    },
    rpcUrls: {
        public: {http: ['https://testnet-rpc.maplabs.io']},
        default: {http: ['https://testnet-rpc.maplabs.io']},
    },
    blockExplorers: {
        default: {name: 'MAP Scan', url: 'https://testnet.maposcan.io/'},
    },

    testnet: false,
};


const {chains, publicClient, webSocketPublicClient} = configureChains(
    [
        mainnet,
        polygon,
        base,
        linea,
        map,

    ],
    [publicProvider()]
);

const projectId = '326af5fe4e9b1b9423b70ba2ea688b2e';

const {wallets} = getDefaultWallets({
    appName: 'hibit',
    projectId,
    chains,
});

const demoAppInfo = {
    appName: 'hibit',
};

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            argentWallet({projectId, chains}),
            trustWallet({projectId, chains}),
            ledgerWallet({projectId, chains}),
            oneKeyWallet({chains})
        ],
    },
]);

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});


const MyApp = ({Component, pageProps}: AppProps) => {

    return (
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
            <ModalsProvider>
                <Provider store={store}>
                    <EvmProvider>
                        <TronProvider>
                            <SolanaProvider>
                                <NearProvider>

                                    <WagmiConfig config={wagmiConfig}>
                                        <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
                                        <NotificationsProvider />

                                            <Layout>
                                                <Component {...pageProps} />
                                            </Layout>

                                        </RainbowKitProvider>
                                    </WagmiConfig>
                                </NearProvider>
                            </SolanaProvider>
                        </TronProvider>
                    </EvmProvider>
                </Provider>
            </ModalsProvider>
        </MantineProvider>
);

};
export default MyApp;
