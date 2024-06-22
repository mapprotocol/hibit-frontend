import { useWallet, WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletDisconnectedError, WalletError, WalletNotFoundError } from '@tronweb3/tronwallet-abstract-adapter';
import {PropsWithChildren, useEffect, useState} from "react";
import { WalletModalProvider, WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';
import {Center, Container, Loader} from "@mantine/core";

const TronProvider = ({children}: PropsWithChildren) => {

    const [adaptors, setAdaptors] = useState<any>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        import('@tronweb3/tronwallet-adapters').then((adaptors) => {
            setAdaptors( [
                new adaptors.TronLinkAdapter(),
                new adaptors.OkxWalletAdapter(),
                new adaptors.BitKeepAdapter(),
                new adaptors.WalletConnectAdapter({
                    network: "Mainnet",
                    options: {
                        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID
                    },
                }),
                new adaptors.LedgerAdapter(),
                new adaptors.TokenPocketAdapter(),
            ])
            setReady(true);
        })

    }, []);

    function onError(e: WalletError) {
        if (e instanceof WalletNotFoundError) {
            console.log(e.message);
        } else if (e instanceof WalletDisconnectedError) {
            console.log(e.message);
        } else {
            console.error(e.message);
        }
    }

    return (
        <WalletProvider onError={onError} adapters={adaptors}>
            <WalletModalProvider>
                {
                    ready ?
                    children
                        :
                        <Container fluid h={"100vh"}>
                            <Center w={"100%"} h={"100%"}>
                                {process.env.NEXT_PUBLIC_APP_ENV === "dev" && "Loading TRON"}
                                <Loader></Loader>
                            </Center>
                        </Container>
                }
            </WalletModalProvider>
        </WalletProvider>
    )
}

export default TronProvider;
