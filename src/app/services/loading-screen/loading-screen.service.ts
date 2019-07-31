import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  constructor(private spinner: NgxSpinnerService) { }
  startLoading() {
    this.spinner.show();
  }

  stopLoading() {
    this.spinner.hide();
  }
}
