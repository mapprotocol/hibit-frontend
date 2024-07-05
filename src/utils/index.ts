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




export function formatNumber(num:string): string {
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

export const countCharacters = (str:string) => {
    let len = 0;
    let spaceCount = 0;

    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (code === 32) { // 空格 ASCII 编码是 32
        spaceCount++;
      }
      if (code === 8232 || code === 8233 || code === 12288 || code === 10 || code === 9) { // 特殊空白字符
        spaceCount++;
      }
      if (code >= 0 && code <= 128) {
        len += 0.5; // 英文和 ASCII 码个字符算0.5字
      } else {
        len += 1; // 中文字符算1字
      }
    }
    return { len, spaceCount };
  }