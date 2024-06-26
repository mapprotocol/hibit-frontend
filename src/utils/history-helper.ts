import {RouteObj} from "@/utils/api/types";

export interface HistoryEntity {
    fromAddress: string,
    toAddress: string,
    route: RouteObj,
    txHash: string,
    timestamp: number,
}
export function saveHistory(data: HistoryEntity) {
    if (typeof window !== "undefined") {
        const res = localStorage.getItem("history");
        if (res) {
            const history = JSON.parse(res) as {[key:string]: HistoryEntity};
            history[data.txHash] = data;
            localStorage.setItem("history", JSON.stringify(history));
        } else {
            const history = {[data.txHash]: data};
            localStorage.setItem("history", JSON.stringify(history));
        }
    }
}


export function loadHistory() {
    if (typeof window !== "undefined") {
        const res = localStorage.getItem("history");
        if (res) {
            return JSON.parse(res) as {[key:string]: HistoryEntity};
        }
        return null;
    }
    return null;
}
