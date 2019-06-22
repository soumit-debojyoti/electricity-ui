import { Injectable } from '@angular/core';
import { BaseURLService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService extends BaseURLService {
  private serviceURL: any = {};
  constructor() {
    super();
    this.serviceURL = {
      PAGE_PERMISSION: `common/pagepermission/role/{roleId}`,
      REGISTER_USER: `User/registeruser`,
      FILE_UPLOAD: `common/upload/{fileType}`,
      PHOTO_UPLOAD: `common/uploadphoto/{fileType}/{fileName}`,
      REFERAL_TOKEN: `user/referaltoken/{userId}`,
      VALIDATE_TOKEN: `user/validatetoken/{token}`,
      ADDRESSPROOF_DATA: `common/addressproofs`,
      IDPROOF_DATA: `common/idproofs`,
      STATES_DATA: `common/states`,
      USER_DATA: `user/users/{user_name}`,
      ADD_WALLET: `common/wallet/{user_security_stamp}`,
      ADD_WALLET_TRANSACTION: `common/wallettransaction`,
      ADMIN_WALLET_WITHDRAWAL_APPROVAL_NOTIFICATION: `common/adminwalletwithdrawalapprovalnotification/user/{userId}`,
      ADMIN_WALLET_ADD_DEDUCT_APPROVAL_NOTIFICATION: `common/adminadddeductwalletapprovalnotification/user/{userId}`,
      WITHDRAWAL_REQUEST_FINDER: `common/withdrawalrequestfinder/user/{userId}`,
      ADD_BALANCE_REQUEST: `common/requestbalance/user/{requestInitiatorId}/amount/{amount}/comment/{comment}`,
      DEDUCT_BALANCE_REQUEST: `common/requestbalancededuct/user/{requestInitiatorId}/amount/{amount}/comment/{comment}`,
      ADMIN_WALLET_APPROVAL: `common/walletwidthdrawal/approve`,
      ADMIN_ADD_DEDUCT_WALLET_APPROVAL: `common/walletadddeduct/approve`,
      ADD_WALLET_WITHDRAWAL_REQUEST: `common/walletwidthdrawal/user/{requestInitiatorId}/comment/{comment}`,
      RANK_ACHIEVER_LIST: `user/rank/user/{userId}`,
      RANK_ACHIEVER_COUNT: `user/rank/user/count/{userId}`,
      FIND_USER: `user/exist/{userName}`,
      GET_CONFIGURATION: `common/configuration`,
      SET_CONFIGURATION: `common/configuration`,
      GET_USER_RANK: `user/{userID}/userrank`,
    }
  }

  public getFullURL(key: string, urlVariables?: Object): string {
    return super.getUrl(this.serviceURL[key], urlVariables);
  }
}
