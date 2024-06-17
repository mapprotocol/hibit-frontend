import { AppProps } from 'next/app';

import Layout from '@/pages/layout';

import "./globals.css";

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
import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from 'wagmi/chains';


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
    public: { http: ['https://rpc.maplabs.io'] },
    default: { http: ['https://rpc.maplabs.io'] },
  },
  blockExplorers: {
    default: { name: 'MAP Scan', url: 'https://maposcan.io/' },
  },
  contracts: {

  },
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
    public: { http: ['https://testnet-rpc.maplabs.io'] },
    default: { http: ['https://testnet-rpc.maplabs.io'] },
  },
  blockExplorers: {
    default: { name: 'MAP Scan', url: 'https://testnet.maposcan.io/' },
  },

  testnet: false,
};


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    map,

  ],
  [publicProvider()]
);

const projectId = '326af5fe4e9b1b9423b70ba2ea688b2e';

const { wallets } = getDefaultWallets({
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
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      oneKeyWallet({ chains })
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});


const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>

      </RainbowKitProvider>
    </WagmiConfig>
  );

};
export default MyApp;
