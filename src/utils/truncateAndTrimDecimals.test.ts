import { truncateAndTrimDecimals } from './numbers';

describe('truncateAndTrimDecimals', () => {
    it('should truncate and trim decimals correctly', () => {
        expect(truncateAndTrimDecimals(123.456789, 2)).toBe('123.45');
        expect(truncateAndTrimDecimals("123.456789", 3)).toBe('123.456');
        expect(truncateAndTrimDecimals(123, 2)).toBe('123');
        expect(truncateAndTrimDecimals("123", 2)).toBe('123');
        expect(truncateAndTrimDecimals(123.4000, 2)).toBe('123.4');
        expect(truncateAndTrimDecimals(0.123456, 4)).toBe('0.1234');
        expect(truncateAndTrimDecimals(0.1200, 4)).toBe('0.12');
        expect(truncateAndTrimDecimals(123.000, 4)).toBe('123');
        expect(truncateAndTrimDecimals("123.456000", 6)).toBe('123.456');
        expect(truncateAndTrimDecimals("0.100", 3)).toBe('0.1');
        expect(truncateAndTrimDecimals(0.000000123456, 10)).toBe('0.0000001234');
    });

    it('should handle cases with no decimal point correctly', () => {
        expect(truncateAndTrimDecimals(1000, 2)).toBe('1000');
        expect(truncateAndTrimDecimals("1000", 2)).toBe('1000');
    });

    it('should handle cases where decimal places is zero', () => {
        expect(truncateAndTrimDecimals(123.456789, 0)).toBe('123');
        expect(truncateAndTrimDecimals("123.456789", 0)).toBe('123');
    });

    it('should handle negative numbers correctly', () => {
        expect(truncateAndTrimDecimals(-123.456789, 2)).toBe('-123.45');
        expect(truncateAndTrimDecimals("-123.456789", 3)).toBe('-123.456');
    });
    it('should handle scientific notation correctly', () => {
        expect(truncateAndTrimDecimals(1.23e-10, 12)).toBe('0.000000000123');
        expect(truncateAndTrimDecimals("4.56e+2", 1)).toBe('456');
        expect(truncateAndTrimDecimals(7.89e3, 0)).toBe('7890');
        expect(truncateAndTrimDecimals("1.2345E-5", 7)).toBe('0.0000123');
    });
});
