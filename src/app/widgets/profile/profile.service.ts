import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiUrlService } from 'src/app/services/api.url.service';

@Injectable()
export class ProfileService {

  constructor(private baseService: BaseService, private apiUrlService: ApiUrlService) { }

  public GetUser(user_name: string): Observable<any> {
    // var url: string = `user/users/${user_name}`;
    const params = new HttpParams();
    const urlStringObject = {
      user_name: user_name
    };
    const mainURL = this.apiUrlService.getFullURL('USER_DATA', urlStringObject);
    return this.baseService.get(mainURL, {}, params);
  }
}
