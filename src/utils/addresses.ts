
export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

export function ellipsis(value: string): string {
    if (!value) {
        return "";
    }
    const len = value.length;
    if (!value) return '';
    if (value.length > 20) {
        return `${value.substring(0, 10)}......${value.substring(len - 5, len)}`;
    }
    return value;
}

export function ellipsis2(value: string): string {
    if (!value) {
        return "";
    }
    const len = value.length;
    if (!value) return '';
    if (value.length > 15) {
        return `${value.substring(0, 8)}......${value.substring(len - 5, len)}`;
    }
    return value;
}
export function ellipsisThree(value: string): string {
    if (typeof value === 'undefined' || value === null || value.length === 0) {
        return '';
    }
    const len = value.length;
    if (!value) return '';
    if (value.length > 15) {
        return `${value.substring(0, 5)}...${value.substring(len - 4, len)}`;
    }
    return value;
}




export function ellipsisShortest(value: string): string {
    if (typeof value === 'undefined' || value === null || value.length === 0) {
        return '';
    }
    const len = value.length;
    if (!value) return '';
    if (value.length > 20) {
        return `${value.substring(0, 3)}...${value.substring(len - 3, len)}`;
    }
    return value;
}

