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
      REGISTER_USER: `User/registeruser`,
      FILE_UPLOAD: `common/upload/{fileType}`,
    }
  }

  public getFullURL(key: string, urlVariables?: Object): string {
    debugger;
    return super.getUrl(this.serviceURL[key], urlVariables);
  }
}
