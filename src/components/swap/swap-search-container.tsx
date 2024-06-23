import {memo, PropsWithChildren, useEffect, useRef} from "react";
import useSearchRoutes from "@/utils/useSearchRoutes";

const SwapSearchContainer = memo(
    ({children}: PropsWithChildren) => {
        useSearchRoutes();
        return (
            <>{children}</>
        )
    }
)

SwapSearchContainer.displayName = 'SwapSearchContainer';
// SwapSearchContainer.whyDidYouRender = true;

export default SwapSearchContainer;
