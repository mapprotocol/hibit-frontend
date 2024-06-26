import { service2, service, service3 } from "@/utils/api/request";
import { AxiosResponse } from "axios";
import { UserSwapHistoryResponseItem } from "@/utils/api/types";
import { PublicClient } from "wagmi";
import Erc20Abi from "@/utils/abis/erc20";
import { parseAbi } from "viem";
import { EMPTY_ADDRESS } from "@/utils/addresses";
import Router from "next/router";

export function fetchChains() {
    return service2({
        url: process.env.NEXT_PUBLIC_APP_ENV === "prod"
            ? "/api/queryChainList"
            : "/api/queryChainListTest",
        method: "GET",
        params: {
            type: 1
        }
    })
}

function setCache(key: string, value: AxiosResponse<any, any>) {
  localStorage.setItem(key, JSON.stringify({ data: value, time: Date.now() }));
}

function getCache(key: string) {
  const cache = localStorage.getItem(key);
  if (!cache) return null;
  const { data, time } = JSON.parse(cache);
  const age = (Date.now() - time) / (10 * 60 * 1000);
  if (age > 1) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
}

export function fetchTokens({
    network, page, size,
    signal,
    symbol
}: {
    network: string,
    page: number,
    size: number,
    signal?: AbortSignal,
    symbol?: string,
}) {
    const params = {
        network,
        page,
        size
    } as any;
    if (symbol) {
        params.symbol = symbol;
    }


    return service2({
        method: "GET",
        url: "/api/queryTokenList",
        signal,
        params,
    }).then((data) => {
        return data;
    });
}

type fetchRouteProps = {
    fromChainId: string,
    toChainId: string,
    amount: string,
    tokenInAddress: string,
    tokenOutAddress: string,
    type: "exactIn" | "exactOut",
    slippage: string,
    entrance: string,
}

export function fetchRoutes({ signal, ...props }: fetchRouteProps & { signal?: AbortSignal }) {
    return service({
        method: "GET",
        url: "/route",
        params: props,
        signal,
    })
}

export function generateSwapData({
    hash,
    slippage,
    receiver,
    from
}: { hash: string, slippage: string, receiver: string, from: string }) {
    return service({
        method: "GET",
        url: "/swap",
        params: {
            from,
            hash,
            slippage,
            receiver,
        }
    })
}


export function fetchUserHistory({
    page,
    size,
    sourceAddress,
}: {
    page: number,
    size: number,
    sourceAddress: string,
}): Promise<AxiosResponse<{
    data: {
        list: UserSwapHistoryResponseItem[],
        total: number
    }
}>> {
   let address =  Router.query.history || sourceAddress
    return service3({
        method: "GET",
        url: "api/queryBridgeHistoryByAddress",
        params: {
            page,
            size,
            address: address,
        }
    })
}

export function fetchHistoryDetail({
    hash,
}: {
    hash: string,
}) {
    return service3({
        method: "GET",
        url: "/api/queryBridgeInfoBySourceHash",
        params: {
            hash,
        }
    })
}

export async function fetchTokensBalance({
    tokens,
    client,
    account,
}: {
    client: PublicClient,
    tokens: string[],
    account: string
}) {
    client.batch = {
        multicall: {
            batchSize: 2048,
            wait: 128
        }
    }
    const calls = tokens.map(token => {
        if (token === EMPTY_ADDRESS) {
            return client.getBalance({
                address: account as `0x${string}`,
            })
        }

        return client?.readContract({
            address: token as `0x${string}`,
            abi: parseAbi(['function balanceOf(address) view returns (uint256)']),
            functionName: 'balanceOf',
            args: [account as `0x${string}`],
        })
    });
    return await Promise.all(calls);
}

