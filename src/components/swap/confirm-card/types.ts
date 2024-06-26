import {HistoryEntity} from "@/utils/history-helper";

export type ConfirmCardProps = {
    onConfirm: (data: HistoryEntity) => void,
}
