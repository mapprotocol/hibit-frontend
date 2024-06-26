import { service as request } from "@/utils/api/request";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useSWR from "swr";

type UseRequestProps = {
    url: string,
    method: string,
    params?: any,
    data?: any,
    enabled: boolean
}

function useRequest({ url, method, params, data, enabled = true }: UseRequestProps) {
    const { data: resData, mutate, error, isLoading } = useSWR(enabled ? url : null, (aUrl) => {
        return request({
            url: aUrl,
            method,
            params,
            data,
        })
    });
    const loading = (!resData && !error) || isLoading;
    return {
        data: (resData as any)?.data,
        loading,
        mutate,
        error
    }
}

export function useHomeData() {
    const { data, mutate, error, loading } = useRequest({
        url: "https://ms-mainnet-api.chainservice.io//scan/api/queryHomeData?size=10",
        method: "GET",
        enabled: true,
    })
    return {
        data,
        mutate,
        loading,
        error,
    };
}


export function useChainAndTokenList() {
    const { data, mutate, error, loading } = useRequest({
        url: "/tokens",
        method: "GET",
        enabled: true,
    });
    return {
        data,
        mutate,
        loading,
        error,
    }
}

export function useHomepageChartsData() {
    const { data, mutate, error, loading } = useRequest({
        url: "https://bs-app-api.chainservice.io/api/queryCharData",
        method: "GET",
        enabled: true,
    });
    return {
        data,
        mutate,
        loading,
        error,
    };
}


export function useQueryBridgeList(page: number | string, size: number | string) {
    const { data, mutate, error, loading } = useRequest({
        url: `https://bs-app-api.chainservice.io/api/queryBridgeList?page=${page}&size=${size}`,
        method: "GET",
        enabled: true,
    });
    return {
        data,
        mutate,
        loading,
        error,
    };
}


interface QueryDateResponse {
    code: number;
    message: string;
    data: {
        list: any;
        slippage: string;
    };
}
export const querySlippage = async (): Promise<QueryDateResponse> => {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: 'https://bs-app-api.chainservice.io/api/querySlippage',
    };

    try {
        const response: AxiosResponse<QueryDateResponse> = await axios(config);
        return response.data;
    } catch (error) {
        // 处理错误
        throw error;
    }
};




// Template
// export function useBlockList(page: number, size: number) {
//     const {data, mutate, error, loading} = useRequest({
//         url: QueryBlocksList,
//         method: "GET",
//         params: {
//             page,
//             size
//         },
//         enabled: true
//     })
//     return {
//         data,
//         mutate,
//         loading,
//         error,
//     }
// }
