import { useInputBoxStyles } from "@/components/swap/styles";
import {
    ActionIcon,
    Box,
    Button,
    Divider,
    Flex,
    Space,
    Text,
    TextInput
} from "@mantine/core";
import { ChangeEvent } from "react";
import IconEdit from "@/components/icons/icon-edit";
import ChainLogo from "@/components/swap/chain-logo";
import useBreakpointsUp from "@/hooks/useBreakpointsUp";
import {useAmount, useAppDispatch, useFrom, useTo} from "@/store/hooks";
import {toggleAddressEditor, updateAmount} from "@/store/route/routes-slice";
import useToAddress from "@/hooks/useToAddress";
import { useTranslation } from "next-i18next";
import useFromTokenBalance from "@/hooks/useFromTokenBalance";
import useSWR from "swr";
import getTokenBalance from "@/store/wallet/thunks/getTokenBalance";
import useFromWallet from "@/hooks/useFromWallet";
import useWallets from "@/lib/wallets/useWallets";
import {getWalletNameForChainId} from "@/lib/configs";

const InputBox = () => {
    const { t } = useTranslation("common");
    const { classes } = useInputBoxStyles();
    const wallet = useFromWallet();
    const {connectWallet} = useWallets();
    const from = useFrom();
    const to = useTo();
    const amount = useAmount();
    const toAddress = useToAddress();
    const dispatch = useAppDispatch();
    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) >= 0 )
            dispatch(updateAmount(e.target.value));
    }
    const handleClickEdit = () => {
        dispatch(toggleAddressEditor(true));
    }
    const { isLargerOrEqual: mdUp } = useBreakpointsUp({ breakpoint: "md" })
    const balance = useFromTokenBalance();

    const handleMax = () => {
        dispatch(updateAmount(balance));
    }

    useSWR([
        wallet,
        from,
        "fetchFromTokenBalance"
    ], ([wallet, from]) => {
        if (wallet && from?.token && from?.chain) {
            dispatch(getTokenBalance({
                wallet: wallet,
                tokenAddress: from?.token?.address,
                decimals: from?.token?.decimals,
                chainId: from?.chain?.chainId
            }))
        }
    }, {
        refreshInterval: 6000,
    })
    return (
        <Box className={classes.root}>
            <Box className={classes.boxRoot}>
                <Box className={classes.addressBar}>
                    <Text
                        className={classes.addressLabel}
                        fz={14} fw={700}>{t("receive_address")}:</Text>
                    {
                        !toAddress ?
                        <Flex gap={10} align={"center"} mt={6}>
                            <Button size={"xs"} variant={"outline"} onClick={() => {
                                connectWallet(getWalletNameForChainId(to?.chain?.chainId))
                            }}>
                                Connect Wallet
                            </Button>
                            or
                            <Button size={"xs"} variant={"light"} onClick={handleClickEdit}>
                                Enter Address
                            </Button>
                        </Flex>
                            :
                            <Box className={classes.addressText} onClick={handleClickEdit}>
                            <Text
                                className={classes.addressInput}
                                fz={12}>{toAddress ? toAddress : <div style={{ color: '#5C5F65', fontSize: '14px' }}> Please enter Address</div>}</Text>
                            <ActionIcon >
                                <IconEdit></IconEdit>
                            </ActionIcon>
                        </Box>
                    }
                </Box>
                <Divider color={"rgba(255,255,255,0.05)"}></Divider>
                <Box className={classes.valueBox}>
                    <Text fz={14} fw={700}>{t("you_pay")}</Text>
                    <Space h={mdUp ? 10 : 0}></Space>
                    <Flex align={"flex-start"} justify={"space-between"}>
                        <Flex align="center" gap={"xs"} w={"100%"}>
                            <ChainLogo
                                empty={false}
                                chainIcon={from?.chain?.logoUri}
                                tokenIcon={from?.token?.image}
                            ></ChainLogo>
                            <Flex direction={"column"} sx={{
                                flexGrow: 1,
                            }}>
                                <TextInput
                                    type={"number"}
                                    value={amount}
                                    onChange={handleValueChange}
                                    placeholder={"0.0"}
                                    size={"xs"}
                                    variant={"filled"}
                                    sx={(theme) => ({
                                        ['input']: {
                                            background: "transparent",
                                            fontSize: "18px",
                                            fontWeight: 700,
                                            color: theme.colors.yellow[6],
                                            padding: 0,
                                            ["&:focus"]: {
                                                border: "none"
                                            }
                                        }
                                    })}
                                    w={"100%"}
                                    rightSectionWidth={"38px"}
                                    rightSection={
                                        <Button
                                            px={0}
                                            h={20}
                                            w={38} variant={"light"} size={"xs"}
                                            onClick={handleMax}
                                        >
                                            {t("max")}
                                        </Button>
                                    }
                                >
                                </TextInput>
                                <Flex w={"100%"} align={"center"} justify={"space-between"}>
                                    <Text c={"opw.3"} fz={12}></Text>
                                    <Text fz={12}>{t("balance")}: {from?.chain?.chainId ? balance : 0}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </Box>

    )
}

export default InputBox;
