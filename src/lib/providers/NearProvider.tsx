import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";
import type {AccountState, NetworkId, WalletSelector} from "@near-wallet-selector/core";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupNarwallets } from "@near-wallet-selector/narwallets";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearFi } from "@near-wallet-selector/nearfi";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupSender } from "@near-wallet-selector/sender";
import { setupBitgetWallet } from "@near-wallet-selector/bitget-wallet";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { setupNeth } from "@near-wallet-selector/neth";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupXDEFI } from "@near-wallet-selector/xdefi";
import { setupRamperWallet } from "@near-wallet-selector/ramper-wallet";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";
import { setupMintbaseWallet } from "@near-wallet-selector/mintbase-wallet";

import type { ReactNode } from "react";
import React, {
    useCallback,
    useContext,
    useEffect,
    useState,
    useMemo,
} from "react";
import { distinctUntilChanged, map } from "rxjs";
import {Flex, Loader} from "@mantine/core";
import {keyStores, connect, Near} from "near-api-js";

declare global {
    interface Window {
        selector: WalletSelector;
        modal: WalletSelectorModal;
    }
}

interface WalletSelectorContextValue {
    selector: WalletSelector;
    modal: WalletSelectorModal;
    accounts: Array<AccountState>;
    accountId: string | null;
    connection: Near | null
}

const mainnetConfig = {
    networkId: "mainnet",
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://mainnet.mynearwallet.com/",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://mainnet.nearblocks.io",
}

const testnetConfig = {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://testnet.mynearwallet.com/",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://testnet.nearblocks.io",
}

const nearConfig = process.env.NEXT_PUBLIC_DEV === "1" ? testnetConfig : mainnetConfig;

const NearContext =
    React.createContext<WalletSelectorContextValue | null>(null);

const NearProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const [selector, setSelector] = useState<WalletSelector | null>(null);
    const [modal, setModal] = useState<WalletSelectorModal | null>(null);
    const [accounts, setAccounts] = useState<Array<AccountState>>([]);
    const [nearConnection, setNearConnection] = useState<Near | null>(null)
    const [loading, setLoading] = useState<boolean>(true);

    const init = useCallback(async () => {
        try {
            const connectionConfig = {
                keyStore: new keyStores.BrowserLocalStorageKeyStore(),
                ...nearConfig
            };

            const nearConnection = await connect(connectionConfig);
            const _selector = await setupWalletSelector({
                network: nearConfig.networkId as NetworkId,
                debug: true,
                modules: [
                    setupMyNearWallet(),
                    setupLedger(),
                    setupSender(),
                    setupBitgetWallet(),
                    setupMathWallet(),
                    setupNightly(),
                    setupMeteorWallet(),
                    setupNarwallets(),
                    setupWelldoneWallet(),
                    setupHereWallet(),
                    setupCoin98Wallet(),
                    setupNearFi(),
                    setupRamperWallet(),
                    setupNeth({
                        gas: "300000000000000",
                        bundle: false,
                    }),
                    // setupXDEFI(),
                    // setupNearMobileWallet(),
                    // setupMintbaseWallet({ contractId: "guest-book.testnet" }),
                ],
            });
            const _modal = setupModal(_selector, {
                contractId: "",
            });
            const state = _selector.store.getState();
            setAccounts(state.accounts);

            // this is added for debugging purpose only
            // for more information (https://github.com/near/wallet-selector/pull/764#issuecomment-1498073367)
            // window.selector = _selector;
            // window.modal = _modal;
            setSelector(_selector);
            setModal(_modal);
            setNearConnection(nearConnection);
            setLoading(false);
        } catch (e) {
            console.error(e);
        }

    }, []);

    useEffect(() => {
        init().catch((err) => {
            console.error(err);
            alert("Failed to initialise wallet selector");
        });
    }, [init]);

    useEffect(() => {
        if (!selector) {
            return;
        }

        const subscription = selector.store.observable
            .pipe(
                map((state) => state.accounts),
                distinctUntilChanged()
            )
            .subscribe((nextAccounts) => {
                console.log("Accounts Update", nextAccounts);

                setAccounts(nextAccounts);
            });

        const onHideSubscription = modal!.on("onHide", ({ hideReason }) => {
            console.log(`The reason for hiding the modal ${hideReason}`);
        });

        return () => {
            subscription.unsubscribe();
            onHideSubscription.remove();
        };
    }, [selector, modal]);

    const walletSelectorContextValue = useMemo<WalletSelectorContextValue>(
        () => ({
            selector: selector!,
            modal: modal!,
            accounts,
            accountId: accounts.find((account) => account.active)?.accountId || null,
            connection: nearConnection
        }),
        [selector, modal, accounts, nearConnection]
    );

    if (loading) {
        return (
            <Flex
                align={"center"}
                justify={"center"}
                w={"100vw"}
                h={"100vh"}>
                {process.env.NEXT_PUBLIC_APP_ENV === "dev" && ""}
                <Loader></Loader>
            </Flex>
        )
    }

    return (
        <NearContext.Provider value={walletSelectorContextValue}>
            {children}
        </NearContext.Provider>
    );
};

export function useNearWalletSelector() {
    const context = useContext(NearContext);

    if (!context) {
        throw new Error(
            "useWalletSelector must be used within a WalletSelectorContextProvider"
        );
    }

    return context;
}

export default NearProvider;
