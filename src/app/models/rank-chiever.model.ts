export interface RankAchieverModel {
    self: OwnModel;
    parent: ParentModel;
    children: Array<ChildModel>;
    siblings: Array<SiblingModel>;
}

export interface RankAchieverCountModel {
    childrenCount: number;
    siblingsCount: number;
}

export interface OwnModel {
    user_name: string;
    email: string;
    role_name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    sex: string;
    father_name: string;
    dob: Date;
    mobile_number: string;
}

export interface ParentModel {
    user_name: string;
    email: string;
    role_name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    sex: string;
    father_name: string;
    dob: Date;
    mobile_number: string;
}

export interface ChildModel {
    user_name: string;
    email: string;
    role_name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    sex: string;
    father_name: string;
    dob: Date;
    mobile_number: string;
}

export interface SiblingModel {
    user_name: string;
    email: string;
    role_name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    sex: string;
    father_name: string;
    dob: Date;
    mobile_number: string;
}
