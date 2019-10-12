import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AutoLogoutService } from '../auto-logout-service';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  constructor(private spinner: NgxSpinnerService, private autoLogout: AutoLogoutService) { }
  startLoading() {
    this.autoLogout.reset();
    this.spinner.show();
  }

  stopLoading() {
    this.spinner.hide();
  }
}
