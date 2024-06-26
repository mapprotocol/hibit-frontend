import {createAsyncThunk} from "@reduxjs/toolkit";
import {RouteObj} from "@/utils/api/types";
import {fetchRoutes} from "@/utils/api/nomal-fetches";

export type GetRouteDataProps = {
    fromChainId: string,
    toChainId: string,
    amount: string,
    tokenInAddress: string,
    tokenOutAddress: string,
    slippage: string,
    signal?: AbortSignal,
    id?: number,
}

const getRouteData = createAsyncThunk<
    {
        data: RouteObj[],
        id: number,
    },
    GetRouteDataProps
>(
    "route/getRouteData",
    async ({fromChainId, toChainId, amount, tokenInAddress, tokenOutAddress, slippage, signal, id}) => {
        const res = await fetchRoutes({
            fromChainId,
            toChainId,
            amount,
            tokenInAddress,
            tokenOutAddress,
            type: "exactIn",
            slippage: Number(slippage) * 100 + "",
            entrance: "Butter+",
            signal,
        });
        return {
            data: res.data.data,
            id: id || 0,
        };
    }
)

export default getRouteData;
