import {Button} from "@mantine/core";
import useTronAllowanceCheck from "@/lib/wallets/tron/useTronAllowanceCheck";
import {useAmount, useFrom} from "@/store/hooks";
import {useRouteTxData} from "@/store/route/hooks";
import {useTranslation} from "next-i18next";
import useSubmitTronBridge from "@/hooks/submitBridge/useSubmitTronBridge";

const TRON_BRIDGE_CONTRACT = "TSBDbe1TB8Ft3KZTdbDcZPLFTkL2BFBiZh";

const TronBridgeButton = () => {
    const {t} = useTranslation("common");
    const amount = useAmount();
    const from = useFrom();
    const routeTxData = useRouteTxData();
    const {needApprove, approve, approving} = useTronAllowanceCheck({
        amount,
        token: from?.token?.address || "",
        target: TRON_BRIDGE_CONTRACT,
    })

    const {bridging, submitBridge} = useSubmitTronBridge();

    if (needApprove) {
        return (
            <Button
                loading={approving}
                fz={18} c={"black"} h={42}
                onClick={approve}>
                {"Approve"}
            </Button>
        )
    }

    return (
        <Button
            loading={bridging}
            onClick={submitBridge}
            fz={18}
            c={"black"}
            h={42}
        >{"Confirm"}</Button>
    )
}

export default TronBridgeButton;
