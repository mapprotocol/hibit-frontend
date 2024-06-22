//
// export function saveChains(items: ChainTokenItem) {
//     if (typeof window !== "undefined") {
//         window.localStorage.setItem("chainTokens", JSON.stringify(items));
//     }
// }
//
// export function loadChains() {
//     if (typeof window !== "undefined") {
//         const res = window.localStorage.getItem("chainTokens");
//         if (res) {
//             return JSON.parse(res);
//         } else {
//             return [];
//         }
//     } else {
//         return []
//     }
// }

export function isNear(id?: string | number) {
    if (id) {
        return id + "" === process.env.NEXT_PUBLIC_NEAR_ID;
    } else {
        return false;
    }
}

export function isTron(id?: string | number) {
    if (id) {
        return id + "" === process.env.NEXT_PUBLIC_TRON_ID;
    } else {
        return false;
    }
}

