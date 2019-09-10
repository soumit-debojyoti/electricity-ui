export enum RechargeType {
    MobilePrepaid = 1,
    MobilePostpaid,
    DTH
}
export class RechargeAPI {
    public rechargeMode: string;
    public operatorName: string;
    public apiValue: string;
}

export class WalletTransaction {
    public walletTransactionID: number;
    public transactionAmount: number;
    public userName: string;
    public transactionMessage: string;
    public transactionTime: string;
    public transactionMode: string;
}
