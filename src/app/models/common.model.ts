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

export class RankAchiever {
    public userName: string;
    public firstName: string;
    public lastName: string;
    public userRank: number;
    public rankAchievementDate: Date;
    public joiningDate: Date;
}

export class NewsFeed {
    title: string;
    content: string;
    postDate: string;
    expirationDate: string;
    postValidity: number;
    feedID: number;
}
