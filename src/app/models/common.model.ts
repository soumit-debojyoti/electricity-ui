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
    newsValid: boolean;
    constructor() {
        this.newsValid = false;
    }
}

export class IntroducerBonus {
    introducerLevel: number;
    referralBonus: number;
    monthlyPayout: number;
    validBonus: boolean;
    constructor() {
        this.validBonus = false;
    }
}

export class BankDetails {
    bankName: string;
    branchName: string;
    ifscCode: string;
    accountNumber: number;
}

export class RechargeTransaction {
    transactionID: number;
    userID: number;
    transactionDate: Date;
    transactionMode: string;
    transactionAmount: number;
    transactionStatus: string;
    transactionMessage: string;
    transactionDateText: string;
}

export class Complaint {
    cID: number;
    tID: number;
    cPriority: number;
    raisedBy: number;
    userContactNumber: string;
    userComment: string;
    cStatus: number;
    resolverComment: string;
    assignedTo: number;
    resolvedBy: number;
    assignedToName: string;
    cPriorityText: string;
    cStatusText: string;
    raisedByText: string;
    transaction: RechargeTransaction;
}

export class BankTransaction {
    bankTransactionID: number;
    accountNumber: string;
    transactionID: string;
    userID: number;
    amount: number;
    verified: boolean;
    received: boolean;
    walletTransactionID: number;
}
