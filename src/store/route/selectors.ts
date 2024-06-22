import {memoize} from "proxy-memoize";
import {RootState} from "@/store";

export const selectRouteTxData = memoize((state: RootState) => state.routes.routeTxData);

export const selectLoadingRouteTxData = memoize((state: RootState) => state.routes.loadingRouteTx);

export const selectCurrentHistory = memoize((state: RootState) => state.routes.currentHistory);

export const selectBestRoute = memoize((state: RootState) => state.routes.selectedRoute);

export const selectLoadingRoute = memoize((state: RootState) => state.routes.loadingRoutes);

export const selectFetchRouteError = memoize((state: RootState) => state.routes.fetchRouteError);
