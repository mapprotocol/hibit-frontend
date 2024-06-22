import { Box, Flex, Text } from "@mantine/core";
import { useChainBoxStyles } from "@/components/swap/styles";
import { ChainBoxProps } from "@/components/swap/types";
import ChainLogo from "@/components/swap/chain-logo";
import useBreakpointsUp from "@/hooks/useBreakpointsUp";
import { useTranslation } from "next-i18next";

const ChainBox = ({
    position,
    chain,
    token,
    onClick,
    disabled,
}: ChainBoxProps) => {
    const { t } = useTranslation("common");
    const { classes } = useChainBoxStyles();
    const { isLargerOrEqual: mdUp } = useBreakpointsUp({
        breakpoint: "md",
    });
    return (
        <Box className={classes.root}>
            <Flex align={"flex-start"} direction={"column"} gap={mdUp ? "lg" : 0} className={classes.content} onClick={onClick}>
                <Text fz={14} fw={700}>{t(position.toLowerCase())}</Text>
                <Flex align={"stretch"} gap={"xs"}>
                    <ChainLogo chainIcon={chain?.logoUri} tokenIcon={token?.image} empty={!chain}></ChainLogo>
                    <Flex direction={"column"} align={"flex-start"} justify={"space-between"}>
                        <Text fz={18} fw={700} lh={1}>{token?.symbol || t("choose")}</Text>
                        <Text fz={12} fw={500}>on {chain?.name || t("chain_token")}</Text>
                    </Flex>
                </Flex>
            </Flex>
            {
                disabled &&
                <Box className={classes.overlay}></Box>
            }
        </Box>

    )
}

export default ChainBox;
