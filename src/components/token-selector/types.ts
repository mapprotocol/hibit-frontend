import {ChainItem, TokenItem} from "@/utils/api/types";

export type TokenSelectorProps = {
    show: boolean,
    position: "from" | "to",
    onClose: () => void,
    onSelected: (chain: ChainItem, token: TokenItem) => void;
}
