export interface BalanceData {
    balance: string;
    needApprove: boolean;
    insufficientBalance: boolean;
    approve: (value: string) => Promise<any>;
}
