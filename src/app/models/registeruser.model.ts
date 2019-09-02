export interface RegisterUserResponse {
    message: string;
    user_security_stamp: string;
}

export interface KYCDetails {
    kyc_detail_id: number;
    id_proof_id: number;
    id_proof_document_path: string;
    address_proof_id: number;
    address_proof_document_path: string;
    bank_details: string;
    created_on: Date;
}
