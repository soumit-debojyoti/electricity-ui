export interface TokenDetailsGeneric {
    token: string;
    created_date: Date;
    is_expired: boolean;
}

export interface TokenDetailsSpecific {
    token: string;
    created_date: Date;
    expiry_date: Date;
    token_generator: string;
    is_expired: boolean;
}
