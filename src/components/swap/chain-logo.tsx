import {Box, createStyles} from "@mantine/core";
import {useChainLogoStyles} from "@/components/swap/styles";
import {ChainLogoProps} from "@/components/swap/types";
import DefaultNet from "../../../public/images/networks.svg";


const ChainLogo = ({empty = false, chainIcon, tokenIcon}: ChainLogoProps) => {
    const {classes} = useChainLogoStyles({empty});
    return (
        <Box className={classes.root}>
            {
                empty
                    ? <>
                        <Box className={classes.chainImg}></Box>
                        <Box className={classes.tokenImg}></Box>
                    </>
                    :
                <>
                    <img
                        width={32}
                        height={32}
                        src={tokenIcon || DefaultNet.src} alt={'chain'} className={classes.chainImg}></img>
                    <img
                        width={12}
                        height={12}
                        src={chainIcon || DefaultNet.src} alt={'token'} className={classes.tokenImg}></img>
                </>
            }
        </Box>
    )
}

export default ChainLogo;
