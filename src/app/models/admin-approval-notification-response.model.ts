export interface AdminApprovalNotificationResponse {
    withdrawalRequestCount: number;
    withdrawalWalletModels: Array<WithdrawalWallet>;
    message: string;
}

export interface WithdrawalWallet {
    withdrawalid: string;
    firstname: string;
    middlename: string;
    lastname: string;
    comment: string;
    approved: boolean;
    rejected: boolean;
    admincomment: string;
    request_initiator_id: number;
    wallet_balance: number;
}
