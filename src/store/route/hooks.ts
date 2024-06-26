import {
    selectBestRoute,
    selectCurrentHistory, selectFetchRouteError, selectLoadingRoute,
    selectLoadingRouteTxData,
    selectRouteTxData
} from "@/store/route/selectors";
import {useAppSelector} from "@/store/hooks";

export const useRouteTxData = () => {
    return useAppSelector(selectRouteTxData)
}

export const useLoadingRouteTxData = () => {
    return useAppSelector(selectLoadingRouteTxData)
}

export const useCurrentHistory = () => {
    return useAppSelector(selectCurrentHistory)
}

export const useBestRoute = () => {
    return useAppSelector(selectBestRoute);
}

export const useLoadingRoute = () => {
    return useAppSelector(selectLoadingRoute);
}

export const useFetchRouteError = () => {
    return useAppSelector(selectFetchRouteError);
}
