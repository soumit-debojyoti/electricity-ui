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
    const params = new HttpParams();
    const urlStringObject = {
      userId: userId
    };
    const mainURL = this.apiUrlService.getFullURL('REFERAL_TOKEN', urlStringObject);
    return this.baseService.get(mainURL, {}, params)
      .pipe(map(response => {
        return response.token;
      }));
  }
}
