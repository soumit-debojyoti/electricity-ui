export interface User {
    user_id: number;
    user_name: string;
    email: string;
    security_stamp: string;
    role_name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    father_name: string;
    dob: string;
    mobile_number: string;
    pan_card: string;
    aadhar_card: string;
    address: string;
    post_office: string;
    police_station: string;
    district: string;
    city: string;
    state_name: string;
    pin: string;
    sex: string;
    photo: string;
}

export interface TransferAmountModel {
    is_rejected: boolean;
    return_message: string;
}

export class RegisterUserModel {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fatherName: string;
    dob: string;
    mobile: string;
    pan_card: string;
    aadhar_card: string;
    address: string;
    po: string;
    ps: string;
    district: string;
    city: string;
    state: number;
    pincode: string;
    gender: number; // 0 for male : 1 for female
    password: string;
    extendedDate: Date;
    kycID: number;
}
export interface MobileValidationResponse {
    isValid: boolean;
    user_id: number;
}

export interface MobileUniqueValidationResponse {
    has_present: boolean;
    message: string;
}

export interface TodayUserJoinCountResponse {
    count: number;
}

export interface AccountValidationResponse {
    isValid: boolean;
    message: string;
}

