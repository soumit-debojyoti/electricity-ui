export interface AdminWalletAddDeductApprovalNotificationResponse {
    addRequestCount: number
    addDeductWalletModels: Array<addDeductWalletModel>
    message: string
}

export interface addDeductWalletModel {
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
    balance_request_type: string
}