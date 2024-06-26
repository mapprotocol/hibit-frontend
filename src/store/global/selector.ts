import {createSelector} from "reselect";
import {memoize, memoizeWithArgs} from "proxy-memoize";
import {RootState} from "@/store";

export const selectChains = memoize((state: RootState) => state.global.chains);

export const selectChainsMap = memoize((state: RootState) => state.global.chainsMap);

export const selectMetamaskChains = memoize((state: RootState) => state.global.metamaskChains);

export const selectChainById = memoizeWithArgs((state: RootState, chainId: string) => {
    const chainsMap = selectChainsMap(state);
    return chainsMap[chainId] || null;
})

export const selectChainLogoById = memoizeWithArgs((state: RootState, chainId: string) => {
    const chainsMap = selectChainsMap(state);
    return chainsMap[chainId]?.logoUri || null;
});

export const selectAllChainTokens = memoize((state: RootState) => state.global.tokensForChain);
export const selectTokensForNetwork = memoizeWithArgs((state: RootState, network:string) => {
    const tokensForChain = selectAllChainTokens(state);
    return tokensForChain[network] || [];
})
// export const selectTokensForNetwork = createSelector(
//     [
//         selectAllChainTokens,
//         (state, network: string) => network
//     ],
//     (tokensForChain, network) => tokensForChain[network] || []
// )

export const selectTokensNoMoreForNetwork = createSelector(
    [
        (state: RootState) => state.global.tokensForChainNoMore,
        (state, network: string) => network
    ],
    (tokensForChainNoMore, network) => tokensForChainNoMore[network] || false
)

export const selectTokensPageForNetwork = createSelector(
    [
        (state: RootState) => state.global.tokensForChainPages,
        (state, network: string) => network
    ],
    (tokensForChainPages, network) => tokensForChainPages[network] || 1
)

export const selectTokenByNetrokAndSymbol = memoizeWithArgs((state: RootState, network: string, symbol: string) => {
    const tokens = selectTokensForNetwork(state, network);
    return tokens.find((item) => item.symbol.toLowerCase() === symbol.toLowerCase()) || null;
});


export const selectShowConfirmCard = memoize((state: RootState) => state.global.showConfirmCard);
