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
      REFERAL_TOKEN: `user/referaltoken/{userId}`,
      VALIDATE_TOKEN: `user/validatetoken/{token}`,
      ADDRESSPROOF_DATA: `common/addressproofs`,
      IDPROOF_DATA: `common/idproofs`,
      STATES_DATA: `common/states`,
      USER_DATA: `user/users/{user_name}`,
      ADD_WALLET: `common/wallet/{user_security_stamp}`,
      RANK_ACHIEVER_LIST: `user/rank/user/{userId}`,
      RANK_ACHIEVER_COUNT: `user/rank/user/count/{userId}`,
      FIND_USER: `user/exist/{userName}`,
      GET_CONFIGURATION: `common/configuration`,
      SET_CONFIGURATION: `common/configuration`,
    }
  }

  public getFullURL(key: string, urlVariables?: Object): string {
    return super.getUrl(this.serviceURL[key], urlVariables);
  }
}
