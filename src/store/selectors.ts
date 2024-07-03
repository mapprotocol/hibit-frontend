import {createSelector} from "reselect";
import {RootState} from "@/store/index";
import {memoize} from "proxy-memoize";

export const selectFrom = memoize((state: RootState) => state.routes.from);
export const selectTo = memoize((state: RootState) => state.routes.to);
export const selectNewOrder = memoize((state: RootState) => state.routes.newOrder);
export const selectShowSwapPop = memoize((state: RootState) => state.routes.showSwapPop);
export const selectSlippage = memoize((state: RootState) => state.routes.slippage);
export const selectAmount = memoize((state: RootState) => state.routes.amount);
export const selectBuyOrSell = memoize((state: RootState) => state.routes.buyOrSell);
export const selectInputAddress = memoize((state: RootState) => state.routes.inputAddress);

export const selectShowAddressEditor = memoize((state: RootState) => state.routes.showAddressEditor);

export const selectShowSetting = memoize((state: RootState) => state.routes.showSetting);

export const selectIsSwap = memoize((state: RootState) => {
    const from = selectFrom(state);
    const to = selectTo(state);
    return from?.chain?.chainId === to?.chain?.chainId;
    }
)

export const selectUserHistory = createSelector(
    [
        (state: RootState, account: string) => account,
        (state: RootState) => state.routes.userHistory
    ],
    (account, history) => history[account] || [],
);
export const selectUserHistoryTotalCount = (state: RootState) => state.routes.userHistoryTotal;
export const selectUserHistoryForPage = createSelector(
    [
        (state,  page: number, size: number, account: string) => ({page, size, account}),
        (state: RootState) => state.routes.userHistory,
        selectUserHistoryTotalCount,
    ],
    ({page, size, account}, history, total) => {
        const start = (page - 1) * size;
        let end = page * size;
        const userHistory = history[account] || [];
        if (start > userHistory.length) return {
            list: [],
            total: total[account] || 0,
        }
        if (end > userHistory.length) {
            end = userHistory.length;
        }
        const list =  userHistory.slice(start, end) || [];
        return {
            list,
            total: total[account] || 0,
        }
    }
)


