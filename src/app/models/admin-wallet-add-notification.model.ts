export interface AdminWalletAddApprovalNotificationResponse {
    addRequestCount: number
    addWalletModels: Array<AddWallet>
    message: string
}

export interface AddWallet {
    addwalletid: string
    firstname: string
    middlename: string
    lastname: string
    comment: string
    approved: boolean
    rejected: boolean
    admin_comment: string
    request_initiator_id: number
    wallet_balance: number
}