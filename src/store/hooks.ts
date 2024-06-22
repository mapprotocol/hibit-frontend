import {AppDispatch, RootState} from "@/store/index";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {
    selectAmount,
    selectFrom, selectInputAddress,
    selectIsSwap, selectShowAddressEditor, selectShowSetting, selectSlippage, selectTo,
    selectUserHistory,
    selectUserHistoryForPage
} from "@/store/selectors";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFrom = () => {
    return useAppSelector(selectFrom);
}

export const useTo = () => {
    return useAppSelector(selectTo);
}

export const useSlippage = () => {
    return useAppSelector(selectSlippage);
}

export const useAmount = () => {
    return useAppSelector(selectAmount);
}

export const useInputAddress = () => {
    return useAppSelector(selectInputAddress);
}

export const useIsSwap = () => {
    return useAppSelector(selectIsSwap);
}

export const useUserHistory = (account: string) => {
    return useAppSelector((state: RootState) => selectUserHistory(state, account));
}

export const useUserHistoryForPage = (page: number, size: number, account: string) => {
    return useAppSelector((state: RootState) => selectUserHistoryForPage(state,page, size, account));
}



export const useShowAddressEditor = () => {
    return useAppSelector(selectShowAddressEditor);
}

export const useShowSetting = () => {
    return useAppSelector(selectShowSetting);
}
