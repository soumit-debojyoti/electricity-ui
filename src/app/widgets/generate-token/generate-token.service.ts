import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateTokenService {

  constructor(private baseService: BaseService) { }



  public GetToken(userId: string): Observable<any> {
    debugger;
    var url: string = `user/referaltoken/${userId}`;
    let params = new HttpParams();
    return this.baseService.get(url, {}, params);
  }
}
