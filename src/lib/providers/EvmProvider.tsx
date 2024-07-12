import {PropsWithChildren, useEffect, useMemo} from "react";
import {Center, Container, Flex, Loader} from "@mantine/core";
import '@rainbow-me/rainbowkit/styles.css';

import {connectorsForWallets, darkTheme, RainbowKitProvider,} from '@rainbow-me/rainbowkit';
import {configureChains, createConfig, WagmiConfig} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';
import {
    bitgetWallet,
    injectedWallet,
    metaMaskWallet,
    okxWallet,
    oneKeyWallet,
    safeWallet,
    tokenPocketWallet,
    trustWallet,
    walletConnectWallet
} from "@rainbow-me/rainbowkit/wallets";
import {useAppDispatch} from "@/store/hooks";
import {fetchChainsData} from "@/store/global/global-slice";
import {useMetamaskChains} from "@/store/global/hooks";
import {bsc} from "wagmi/chains";
import {alchemyProvider} from "wagmi/providers/alchemy";
import {transformChain} from "@/lib/transformChain";

const EvmProvider = ({children}: PropsWithChildren) => {
    const chains = useMetamaskChains();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchChainsData());
    }, [])

    const wagmiChains = useMemo(() => {
        return chains
            .map(transformChain);
    }, [chains]);

    const { chainList, publicClient } = useMemo(() => {
        if (wagmiChains.length === 0) {
            return {
                chainList: [],
                publicClient: null
            };
        }

        const res = wagmiChains.find(item => item.id === 56);
        if (!res) {
            wagmiChains.push(bsc as any);
        }

        const { chains: chainList, publicClient } = configureChains(wagmiChains, [
            alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string }),
            publicProvider()
        ]);
        return {
            chainList,
            publicClient
        };
    }, [wagmiChains]);

    const config = useMemo(() => {
        if (chainList.length > 0) {
            const connectors = connectorsForWallets([
                {
                    groupName: "Recommanded",
                    wallets: [
                        metaMaskWallet({
                            chains: chainList,
                            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string
                        }),
                        tokenPocketWallet({
                            chains: chainList,
                            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string
                        }),
                        bitgetWallet({
                            chains: chainList,
                            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string
                        }),
                        safeWallet({
                            chains: chainList,
                        }),
                        injectedWallet({
                            chains: chainList
                        }),

                        okxWallet({
                            chains: chainList,
                            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string
                        }),
                        oneKeyWallet({
                            chains: chainList,
                        }),
                        // binanceWallet({
                        //     chains: chainList,
                        // }),

                        trustWallet({
                            chains: chainList,
                            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string
                        }),

                        walletConnectWallet({
                            chains: chainList,
                            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string
                        }),
                    ]
                }
            ]);
            return createConfig({
                autoConnect: true,
                connectors,
                publicClient: publicClient!,
            });
        }
        return null;
    }, [chainList]);

    if (!config) {
        return (
            <Container fluid h={"100vh"}>
                <Center w={"100%"} h={"100%"}>
                    {process.env.NEXT_PUBLIC_APP_ENV === "dev" && "Loading EVM"}
                    <Loader></Loader>
                </Center>
            </Container>
        );
    }

    return (
        <WagmiConfig config={config}>
            <RainbowKitProvider theme={darkTheme()} chains={chainList} modalSize={"compact"}>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

export default EvmProvider;
