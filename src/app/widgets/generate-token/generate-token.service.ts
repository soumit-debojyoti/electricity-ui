import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiUrlService } from 'src/app/services/api.url.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateTokenService {

  constructor(private baseService: BaseService, private apiUrlService: ApiUrlService) { }



  public GetToken(userId: string): Observable<any> {
    // var url: string = `user/referaltoken/${userId}`;
    let params = new HttpParams();
    const urlStringObject = {
      userId: userId
    };
    //var url: string = `common/upload/${fileType}`;
    //let params = new HttpParams();
    const mainURL = this.apiUrlService.getFullURL('REFERAL_TOKEN', urlStringObject);
    return this.baseService.get(mainURL, {}, params)
      .pipe(map(response => {
        return response.token;
      }));
  }
}
