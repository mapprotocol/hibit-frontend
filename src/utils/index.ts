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


