import {createAsyncThunk} from "@reduxjs/toolkit";
import {RouteObj, RouteTxData} from "@/utils/api/types";
import {generateSwapData} from "@/utils/api/nomal-fetches";

export const getRouteTxData = createAsyncThunk<
    RouteTxData[] | null,
    {route: RouteObj, slippage: string, toAddress: string, from: string}
>(
    "route/getRouteTxData",
    async ({
                route: selectedRoute,
                slippage,
                toAddress,
               from
           }) => {
        const res = await generateSwapData({
            hash: (selectedRoute as RouteObj).hash,
            slippage: Number(slippage) * 100 + "",
            receiver: toAddress,
            from: from,
        });
        return res.data.data;
    }
)

export default getRouteTxData;
