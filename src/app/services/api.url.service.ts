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
      PHOTO_REUPLOAD: `common/reuploadphoto/{userName}/{fileType}/{fileName}/{oldfileName}/{oldfileExtension}`,
      REFERAL_TOKEN: `user/referaltoken/{userId}`,
      GET_USERS: `user/users`,
      ADD_KYC: `user/addkyc/{userId}`,
      GET_KYC: `user/getkycdetail/{userId}`,
      SEARCH_USERS: `user/searchusers/{name}`,
      VALIDATE_TOKEN: `user/validatetoken/{token}`,
      WALLET_BALANCE: `user/walletbalance/user/{userId}`,
      WALLET_BALANCE_REPORT: `user/walletbalancereport/user/{userId}/start/{startDate}/end/{endDate}`,
      WALLET_BALANCE_TRANSFER: `user/balancetransfer/sender/{senderId}/receiver/{receiverId}/amount/{amount}/comment/{comment}`,
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
      GET_UNUSED_TOKEN_GENERIC: `user/unusedtokendetails`,
      GET_UNUSED_TOKEN_SPECIFIC: `user/unusedtokendetails/{token}`,
      REACTIVATE_TOKEN: `user/reactivatetoken/{token}`,
      DEACTIVATE_TOKEN: `user/deactivatetoken/{token}`,
      SURRENDER_TOKEN: `user/surrendertoken/{token}`,
      RECHARGE_API: `RechargeAPI/api`,
      RECHARGE_API_FETCH: `RechargeAPI/api/{rechargeMode}`,
      INSERT_TRANSACTION: `RechargeAPI/api/recharge/{userID}/rechargemode/{rechargeMode}/amount/{rechargeAmount}`,
      UPDATE_TRANSACTION: `RechargeAPI/api/transaction/{orderID}/status/{transactionStatus}/message/{errorMessage}`,
      DEDUCT_WALLET_BALANCE_TRANSACTION: `RechargeAPI/api/transaction/user/{userID}/wallet/amount/{amount}/message/{message}`,
      FETCH_RECHARGE_API_VALIDATION: `RechargeAPI/api/validation/rechargemode/{rechargeMode}/operator/{operatorName}`,
      RECHARGE_API_VALIDATION: `RechargeAPI/api/validation`,
      FETCH_ALL_TRANSACTION: `User/{requestorID}/AllTransaction/from/{startDate}/to/{endDate}`,
      FETCH_RANK_ACHIEVER: `user/rankachiever`,
      NEWS_FEED: `Common/news`,
      LEVEL_BONUS_INFO: `User/levelbonusinfo`,
      ADMIN_BANK_INFO: `common/bankinfo`,
      RECHARGE_TRANSACTION_USER: `RechargeAPI/api/transaction/user/{userID}/from/{endDate}/to/{startDate}`,
      RECHARGE_TRANSACTION: `RechargeAPI/api/transaction/from/{endDate}/to/{startDate}`,
      RECHARGE_COMPALINT: `RechargeAPI/api/transaction/complaint`,
      RECHARGE_COMPALINT_USER: `RechargeAPI/api/transaction/complaint/user/{userid}`,
      RECHARGE_COMPALINT_ADMIN: `RechargeAPI/api/transaction/complaint/admin`,
      COMPLAINT_UPDATE: `RechargeAPI/api/transaction/complaint`,
      RECENT_TRANSACTION: `common/recent/transaction`,
      BANK_TRANSACTION: `common/bank/transaction`,
      RECHARGE_SERVICE: `RechargeAPI/api/recharge/{rechargetype}`,
      VALIDATE_UTILITY_SERVICE:
      `RechargeAPI/api/recharge/validate/{rechargetype}/operator/{operatorName}/consumer/{consumer_number}/mobile/{customer_mobile}`
    };
  }

  public getFullURL(key: string, urlVariables?: Object): string {
    return super.getUrl(this.serviceURL[key], urlVariables);
  }
}
