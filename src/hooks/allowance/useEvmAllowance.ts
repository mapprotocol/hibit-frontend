import {RouteTxData} from "@/utils/api/types";
import {useContractRead, useContractWrite, usePublicClient} from "wagmi";
import Erc20Abi from "@/utils/abis/erc20";
import {EMPTY_ADDRESS} from "@/utils/addresses";
import {useAppSelector, useFrom} from "@/store/hooks";
import useFromWallet from "@/hooks/useFromWallet";
import {useMemo} from "react";
import {WalletName} from "@/lib/types";
import useFromTokenBalance from "@/hooks/useFromTokenBalance";
import {BigNumber, ethers} from "ethers";
import USDTMainnetABI from "@/utils/abis/usdtmainnet";

const useEvmAllowance = ({data}: {data: RouteTxData[]}) => {
    const from = useFrom();
    const balance = useFromTokenBalance();
    const wallet = useFromWallet();
    const amount = useAppSelector(state => state.routes.amount);
    const enabled = useMemo(() => {
        return !!wallet
            && !!from?.token?.address
            && from.token.address !== EMPTY_ADDRESS
            && !!data
            && data.length > 0
            && wallet.providerName === WalletName.EVM;
    }, [from, data, wallet])
    const { data: allowanceData, refetch } = useContractRead({
        address: from?.token?.address as `0x${string}`,
        abi: Erc20Abi,
        functionName: "allowance",
        args: [
            wallet?.address,
            data ? data[0]?.to : ""
        ],
        enabled,
        watch: true,
        staleTime: 1000,
    })

    const needApprove = useMemo(() => {
        if (!isNaN(Number(amount)) && from && (allowanceData as any) >= BigInt(0)) {
            const amountBig = ethers.utils.parseUnits(amount || "0", from.token?.decimals as number);
            return amountBig.gt(BigNumber.from(allowanceData));
        } else {
            return false;
        }
    }, [amount, from, allowanceData]);

    const isMainnetUSDT = (Number(from?.chain?.chainId) === 1 && from?.token?.symbol === "USDT");

    const { data: writeResult, isLoading, isSuccess, writeAsync } = useContractWrite({
        address: from?.token?.address as `0x${string}`,
        abi: isMainnetUSDT ? USDTMainnetABI : Erc20Abi,
        functionName: 'approve',
    });
    const publicClient = usePublicClient();

    const approve = async (value: string) => {
        if (BigNumber.from(allowanceData?.toString()).gt(0) && isMainnetUSDT) {
            // USDT on ETH need to do this next step
            const res = await writeAsync({
                args: [
                    data![0].to,
                    0,
                ]
            })
            await publicClient.waitForTransactionReceipt({ hash: res.hash });
        }
        const result = await writeAsync({
            args: [
                data![0].to,
                value,
            ]
        })
        const receipt = await publicClient.waitForTransactionReceipt({ hash: result.hash });
        await refetch();
        return receipt;
    }

    return {
        approve,
        needApprove,
        balance,
    }

}

export default useEvmAllowance;
