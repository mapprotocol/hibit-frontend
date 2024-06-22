import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchChains, fetchTokens} from "@/utils/api/nomal-fetches";
import {jsonToChainList} from "@/utils/api/helpers";
import {ChainItem, TokenItem} from "@/utils/api/types";
import {IsomericChainIds} from "@/lib/configs";
import {RootState} from "@/store";
import {Wallet} from "@/lib/wallets/useWallets";

export interface GlobalState {
    chains: ChainItem[],
    metamaskChains: ChainItem[],
    loadingChains: boolean,
    chainsMap: {[key: string]: ChainItem};

    tokensForChain: {
        [key: string]: TokenItem[]
    },
    tokensForChainPages: {
        [key: string]: number,
    },
    tokensForChainNoMore: {
        [key: string]: boolean,
    },
    tokensLoading: boolean,

    showConfirmCard: boolean,

}

const initialState: GlobalState = {
    chains: [],
    metamaskChains: [],
    loadingChains: false,
    chainsMap: {},
    tokensForChain: {},
    tokensForChainPages: {},
    tokensForChainNoMore: {},
    tokensLoading: false,
    showConfirmCard: false,
}


export const fetchChainsData = createAsyncThunk<ChainItem[]>("global/fetchChainsData", async () => {
    const res = await fetchChains();
    return jsonToChainList(res.data.data.chains);
})

const TOKEN_PAGE_SIZE = 10;

export const getTokensForChain = createAsyncThunk<
    Pick<GlobalState, "tokensForChain" | "tokensForChainNoMore" | "tokensForChainPages">,
    { network: string, page: number, chainId: string, wallet: Wallet | null },
    { state: RootState }
>(
    "routes/getTokensForChain",
    async ({ network, page, chainId, wallet }, { getState }) => {
        if (!network) {
            return {
                tokensForChain: {},
                tokensForChainNoMore: {},
                tokensForChainPages: {},
            };
        }
        const res = await fetchTokens({
            network,
            page,
            size: TOKEN_PAGE_SIZE,
        })
        let tokensRes = res.data.data.results;
        try {
            if (!!wallet) {
                const balances = await wallet.getBalances(
                    tokensRes.map((item: any) => {
                        return {
                            address: item.address,
                            decimals: item.decimals,
                        }
                    }),
                    Number(chainId),
                )
                tokensRes = tokensRes.map((item: any, index: number) => {
                    return {
                        ...item,
                        balance: Number(balances[index]).toFixed(6),
                    }
                })
            }
        } catch (err) {
            tokensRes = tokensRes.map((item: any, index: number) => {
                return {
                    ...item,
                    balance: Number(0).toFixed(4),
                }
            })

        }
        tokensRes = tokensRes.sort((a: any, b: any) => Number(a.balance) > Number(b.balance) ? -1 : 1);
        const state = getState().global;
        const oldTokens = page === 1 ? [] : (state.tokensForChain[network] || []);
        return {
            tokensForChain: {
                [network]: [...oldTokens, ...tokensRes],
            },
            tokensForChainNoMore: {
                [network]: tokensRes.length < TOKEN_PAGE_SIZE,
            },
            tokensForChainPages: {
                [network]: page,
            }
        }
    }
)



export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        updateTokensPage: (state, action: PayloadAction<{ [network: string]: number }>) => {
            state.tokensForChainPages = {
                ...state.tokensForChainPages,
                ...action.payload
            }
        },
        setShowConfirmCard: (state, action: PayloadAction<boolean>) => {
            state.showConfirmCard = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChainsData.fulfilled, (state, action: PayloadAction<ChainItem[]>) => {
            state.chains = action.payload;
            state.metamaskChains = action.payload.filter((chain) => {
                return !Object.values(IsomericChainIds).includes(chain.chainId + "");
            });
            state.chainsMap = action.payload.reduce((acc, chain) => {
                return {
                    ...acc,
                    [chain.chainId]: chain
                };
            }, {})
            state.loadingChains = false;
        })
        builder.addCase(fetchChainsData.rejected, (state, action) => {
            state.chains = [];
            state.metamaskChains = [];
            state.chainsMap = {};
            state.loadingChains = false;
            console.log(action.error, 'error')
        })
        builder.addCase(fetchChainsData.pending, (state, action) => {
            state.loadingChains = true;
        })

        builder.addCase(getTokensForChain.fulfilled, (state, action) => {
            state.tokensForChain = {
                ...state.tokensForChain,
                ...action.payload.tokensForChain,
            };
            state.tokensForChainNoMore = {
                ...state.tokensForChainNoMore,
                ...action.payload.tokensForChainNoMore,
            };
            state.tokensForChainPages = {
                ...state.tokensForChainPages,
                ...action.payload.tokensForChainPages,
            };
        })
        builder.addCase(getTokensForChain.pending, (state, action) => {
            state.tokensLoading = true;
        })
        builder.addCase(getTokensForChain.rejected, (state, action) => {
            state.tokensLoading = false;
        })

    }
})

export const {
    updateTokensPage,
    setShowConfirmCard
} = globalSlice.actions;

export default globalSlice.reducer;
