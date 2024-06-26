import {configureStore} from "@reduxjs/toolkit";
import {routesSlices} from "@/store/route/routes-slice";
import {globalSlice} from "@/store/global/global-slice";
import {walletSlice} from "@/store/wallet/wallet-slice";
import {uiSlice} from "@/store/ui/uiSlice";

const store = configureStore({
    reducer: {
        wallet: walletSlice.reducer,
        routes: routesSlices.reducer,
        global: globalSlice.reducer,
        ui: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
