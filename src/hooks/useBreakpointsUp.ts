import {useMantineTheme} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {useEffect} from "react";

type useBreakpointsUpProps = {
    breakpoint: "xs" | "sm" | "md" | "lg" | "xl"
}
const useBreakpointsUp = ({breakpoint}: useBreakpointsUpProps) => {

    const theme = useMantineTheme();
    const isLargerOrEqual = useMediaQuery(`(min-width: ${theme.breakpoints[breakpoint]})`);
    useEffect(() => {
    }, [isLargerOrEqual]);
    return {
        isLargerOrEqual,
    }
}

export default useBreakpointsUp;
