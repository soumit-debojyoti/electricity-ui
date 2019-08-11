export interface WalletReportResponse {
    user_logs: Array<UserLog>;
    wallet_logs: Array<WalletLog>;
    // date_logs: Array<DateLog>;
}
export interface UserLog {
    user_id: number;
    user_name: string;
}
export interface WalletLog {
    wallet_transaction_id: number;
    transaction_amount: number;
    transaction_initiated_user: number;
    message: string;
    created_on: Date;
    transaction_mode: string;
}
export interface DateLog {
    month_number: number;
    month_name: string;
    year_name: string;
}
