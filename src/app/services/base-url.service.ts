import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BaseURLService {
  private rootURL = environment.apiUrl;
  constructor() { }

  private constructURL(serviceURL: string, urlVariables: Object): string {
    if (urlVariables) {
      Object.keys(urlVariables).forEach(urlVar => {
        serviceURL = serviceURL.replace(`{${urlVar}}`, urlVariables[urlVar]);
      });
    }
    return serviceURL;
  }




  public getUrl(urlString: string, urlVariables: Object = {}): string {
    const serviceUrl = this.rootURL + urlString;
    return `${this.constructURL(serviceUrl, urlVariables)}`;
  }
}
