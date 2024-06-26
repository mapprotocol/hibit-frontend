import {Button} from "@mantine/core";
import {useTranslation} from "next-i18next";
import useSubmitNearBridge from "@/hooks/submitBridge/useSubmitNearBridge";

const NearBridgeButton = () => {
    const {t} = useTranslation("common");
    const {bridging, submitBridge } = useSubmitNearBridge({onComplete: () => {}});
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

export default NearBridgeButton;
