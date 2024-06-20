export function ellipsis(value: string): string {
    if (!value) {
        return "";
    }
    const len = value.length;
    if (!value) return '';
    if (value.length > 20) {
        return `${value.substring(0, 5)}......${value.substring(len - 5, len)}`;
    }
    return value;
}




export function formatNumber(num: number | string): string {
    const numStr = num.toString();
    const decimalIndex = numStr.indexOf('.');

    if (decimalIndex === -1) {
        return num.toString(); // 如果没有小数点，直接返回
    }

    const decimalPart = numStr.slice(decimalIndex + 1);
    const leadingZeros = decimalPart.match(/^0*/)?.[0].length || 0;

    if (leadingZeros > 3) {
        // 保留有效位数的四位
        const significantPart = decimalPart.slice(leadingZeros, leadingZeros + 4);
        return `0.{${leadingZeros}}${significantPart}`;
    } else {
        return Number(num).toFixed(4);
    }
}