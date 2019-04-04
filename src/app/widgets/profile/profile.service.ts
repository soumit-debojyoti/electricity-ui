import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ProfileService {

  constructor(private baseService: BaseService) { }

  public GetUser(user_name: string): Observable<any> {
    debugger;
    var url: string = `user/users/${user_name}`;
    let params = new HttpParams();
    params = params.append('text', 'tytytyt');
    params = params.append('text1', 'bocachoda');
    return this.baseService.get(url, {}, params);
  }
}
