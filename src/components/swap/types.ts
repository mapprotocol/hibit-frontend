import {ChainItem, TokenItem} from "@/utils/api/types";
import {HistoryEntity} from "@/utils/history-helper";

export type ChainBoxProps = {
    position: "From" | "To",
    chain: ChainItem | null | undefined,
    token: TokenItem | null | undefined,
    onClick: () => void,
    disabled: boolean,
}

export type ChainLogoProps = {
    empty: boolean,
    chainIcon?: string,
    tokenIcon?: string,
}

export type MainCardModalsProps = {
}

export type SettingPanelProps = {
}

export type AddressEditorPanelProps = {
}

export type InputBoxProps = {
    onClickEdit: () => void,
    inputValue: number | "",
    onValueChange: (value: number) => void,
}

export type MainCardProps = {
}
