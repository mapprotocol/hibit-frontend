import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {
    selectChainById,
    selectChainLogoById,
    selectChains,
    selectChainsMap,
    selectMetamaskChains,
    selectShowConfirmCard,
    selectTokensForNetwork,
    selectTokensNoMoreForNetwork,
    selectTokensPageForNetwork,
} from "@/store/global/selector";
import {RootState} from "@/store";

export const useChainsSelector = () => {
    return useAppSelector(selectChains);
}

export const useMetamaskChains = () => {
    return useAppSelector(selectMetamaskChains);
}

export const useChainsMap = () => {
    return useAppSelector(selectChainsMap);
}

export const useChainById = (chainId: string) => {
    return useAppSelector((state) => selectChainById(state, chainId));
}

export const useChainLogoById = (chainId: string) => {
    return useAppSelector((state) => selectChainLogoById(state, chainId));
}

export const useTokensForNetwork = (network: string) => {
    return useAppSelector((state: RootState) => selectTokensForNetwork(state, network));
}

export const useTokenNoMoreForNetwork = (network: string) => {
    return useAppSelector(state => selectTokensNoMoreForNetwork(state, network));
}

export const useTokensPageForNetwork = (network: string) => {
    return useAppSelector(state => selectTokensPageForNetwork(state, network));
}

export const useTokenLoading = () => {
    return useAppSelector((state: RootState) => state.global.tokensLoading);
};

export const useShowConfirmCard = () => {
    return useAppSelector(selectShowConfirmCard);
}
