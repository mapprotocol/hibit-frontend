import {createSlice} from "@reduxjs/toolkit";
import getTokenBalance from "@/store/wallet/thunks/getTokenBalance";

interface WalletState {
    tokenBalances: Record<string, Record<string, string>>;
}

const initialState: WalletState = {
    tokenBalances: {}
}

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getTokenBalance.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.tokenBalances = {
                ...state.tokenBalances,
                [action.payload.chainId]: {
                    ...state.tokenBalances[action.payload.chainId],
                    [action.payload.address]: action.payload.balance
                }
            };
        });
        builder.addCase(getTokenBalance.rejected, (state, action) => {
            console.log(action.error, 'error');
        });
    }
})

export const {} = walletSlice.actions;

export default walletSlice.reducer;
