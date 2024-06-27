import {ChainTokenSelectedItem, RouteObj, RouteTxData, TokenItem, UserSwapHistoryResponseItem} from "@/utils/api/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserHistory } from "@/utils/api/nomal-fetches";
import { showTip } from "@/utils/notifications";
import { toFixedN } from "@/utils/numbers";
import getRouteTxData from "@/store/route/thunks/getRouteTxData";
import getRouteData from "@/store/route/thunks/getRouteData";
import {HistoryEntity} from "@/utils/history-helper";

interface RoutesState {
    from: ChainTokenSelectedItem | null,
    to: ChainTokenSelectedItem | null,
    slippage: string,
    amount: string,
    loadingRoutes: boolean,
    routes: RouteObj[],
    inputAddress: string,
    selectedRoute: RouteObj | null | "empty",
    showAddressEditor: boolean,
    showSetting: boolean,
    userHistoryTotal: {
        [key: string]: number,
    },
    userHistory: {
        [key: string]: UserSwapHistoryResponseItem[]
    },
    userHistoryPages: {
        [key: string]: number,
    },
    historyLoading: boolean,

    showExchangeModal: boolean,

    routeTxData: RouteTxData[] | null,
    loadingRouteTx: boolean,

    currentHistory: HistoryEntity | null,

    lastRequestId: number,
    fetchRouteError: {
        code: string,
        message: string,
    } | null,
}

const initialState: RoutesState = {
    from: null,
    to: null,
    slippage: "2",
    amount: "",
    loadingRoutes: false,
    routes: [],
    inputAddress: "",
    selectedRoute: null,
    userHistoryTotal: {},
    userHistory: {},
    historyLoading: false,
    userHistoryPages: {},

    showAddressEditor: false,
    showSetting: false,
    showExchangeModal: false,
    routeTxData: null,
    loadingRouteTx: false,

    // for trigger complete animation
    currentHistory: null,

    lastRequestId: 0,

    fetchRouteError: null,
}


export const getUserHistory = createAsyncThunk<
    {
        list: UserSwapHistoryResponseItem[],
        total: number,
        account: string,
        page: number
    },
    { account: string, page: number }
>("routes/getUserHistory",
    async ({ account, page }) => {
        if (!account) {
            return {
                total: 0,
                list: [],
                account: account,
                page: page,
            }
        }
        const res = await fetchUserHistory({
            page: page,
            size: 50,
            sourceAddress: account
        })
        return {
            total: res.data.data.total > 50 ? 50 : res.data.data.total,
            list: res.data.data.list || [],
            account: account,
            page
        }
    })

export const routesSlices = createSlice({
    name: "routes",
    initialState,
    reducers: {
        updateFrom: (state, action) => {

            state.amount = toFixedN(state.amount, action.payload.token?.decimals as number).toString();
            state.from = action.payload;
        },
        updateTo: (state, action) => {


            state.to = action.payload;
        },
        updateSlippage: (state, action) => {
            state.slippage = action.payload;
        },
        updateAmount: (state, action) => {

            state.amount = action.payload;

        },
        updateLoading: (state, action) => {
            state.loadingRoutes = action.payload;
        },
        updateRoutes: (state, action) => {
            state.routes = action.payload;
            if (action.payload.length > 0) {
                const route = action.payload[0];
                if (route !== "empty") {
                    if (!route.dstChain) {
                        route.dstChain = route.bridgeChain;
                    }
                    if (!route.srcChain) {
                        route.srcChain = route?.bridgeChain;
                    }
                }
                state.selectedRoute = route;
            } else {
                state.selectedRoute = null;
            }
        },
        updateInputAddress: (state, action: PayloadAction<string>) => {
            state.inputAddress = action.payload;
        },
        updateSelectedRoute: (state, action: PayloadAction<RouteObj | null | "empty">) => {
            let route = action.payload;
            const isSwap = state.from?.chain?.chainId === state.to?.chain?.chainId;
            if (!isSwap) {
                if (route && route !== "empty") {
                    if (!route?.dstChain) {
                        route.dstChain = route?.bridgeChain;
                    }
                    if (!route.srcChain) {
                        route = {
                            ...route,
                        };
                    }
                }
            }

            state.selectedRoute = route;
        },
        swapComplete: (state) => {
            state.selectedRoute = null;
            state.routes = [];
            state.amount = "";
        },

        toggleAddressEditor: (state, action) => {
            state.showAddressEditor = action.payload;
        },
        toggleSetting: (state, action) => {
            state.showSetting = action.payload;
        },
        toggleShowExchangeModal: (state, action) => {
            state.showExchangeModal = action.payload;
        },
        setRouteTxData: (state, action) => {
            state.routeTxData = action.payload;
        },

        setCurrentHistoryData: (state, action) => {
            state.currentHistory = action.payload;
        },
        setFetchRouteError: (state, action) => {
            state.fetchRouteError = action.payload;
        },
        closeRoute: (state) => {
            state.routes = [];
            state.selectedRoute = null;
            state.fetchRouteError = null;
            state.amount = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserHistory.pending, (state, action) => {
            state.historyLoading = true;
        })
        builder.addCase(getUserHistory.fulfilled, (state, action) => {
            state.historyLoading = false;
            if (!action.payload.account) {
                return;
            }
            const oldData = state.userHistory[action.payload.account] || [];
            const page = action.payload.page;
            const newData = action.payload.list;
            if (page === 1) {
                state.userHistory = {
                    ...state.userHistory,
                    [action.payload.account]: newData
                };
            } else {
                state.userHistory = {
                    ...state.userHistory,
                    [action.payload.account]: [...oldData, ...newData]
                };
            }
            state.userHistoryPages = {
                ...state.userHistoryPages,
                [action.payload.account]: page,
            };
            state.userHistoryTotal = {
                ...state.userHistoryTotal,
                [action.payload.account]: action.payload.total
            };
        });
        builder.addCase(getRouteTxData.pending, (state, action) => {
            state.loadingRouteTx = true;
        })
        builder.addCase(getRouteTxData.fulfilled, (state, action) => {
            state.loadingRouteTx = false;
            state.routeTxData = action.payload;
        })
        builder.addCase(getRouteTxData.rejected, (state, action) => {
            state.loadingRouteTx = false;
            state.routeTxData = null;
        })

        builder.addCase(getRouteData.pending, (state, action) => {
            // state.routes = [];
            // state.selectedRoute = null;
            state.loadingRoutes = true;
            state.fetchRouteError = null;
            state.selectedRoute = null;
            state.routes = [];
        })
        builder.addCase(getRouteData.fulfilled, (state, action) => {
            if (action.payload.id < state.lastRequestId) {
                return;
            }
            state.lastRequestId = action.payload.id;
            state.routes = action.payload.data;
            if (action.payload.data.length > 0) {
                const route = action.payload.data[0];
                // @ts-ignore
                if (route !== "empty") {
                    if (!route.dstChain) {
                        route.dstChain = route.bridgeChain;
                    }
                    if (!route.srcChain) {
                        route.srcChain = route?.bridgeChain;
                    }
                }
                state.selectedRoute = route;
            } else {
                state.selectedRoute = null;
            }
            state.loadingRoutes = false;
        })
        builder.addCase(getRouteData.rejected, (state, action) => {
            state.loadingRoutes = false;
            console.error(action.error, 'error');
            if (action.error.message !== "canceled"
                && action.error.message
            ) {
                state.fetchRouteError = {
                    code: action.error.code || "0",
                    message: action.error.message
                }
            }
        })
    }
})

export const {
    updateFrom,
    updateTo,
    updateSlippage,
    updateAmount,
    updateLoading,
    updateRoutes,
    updateInputAddress,
    updateSelectedRoute,
    swapComplete,
    toggleSetting,
    toggleAddressEditor,
    toggleShowExchangeModal,
    setRouteTxData,
    setCurrentHistoryData,
    setFetchRouteError,
    closeRoute,
} = routesSlices.actions;

export default routesSlices.reducer;
