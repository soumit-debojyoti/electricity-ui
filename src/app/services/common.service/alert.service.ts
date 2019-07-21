import { Injectable } from '@angular/core';
import { SweetAlertType } from 'sweetalert2';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public confirmationMessage(title: string, text: string,
    type: SweetAlertType, showCloseButton: boolean = true,
    showCancelButton: boolean = true, confirmButtonText: string = 'OK',
    cancelButtonText: string = 'Cancel', footerText: string = ''): void {
    Swal.fire({
      type: type,
      title: title,
      text: text,
      showCloseButton: showCloseButton,
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      footer: footerText
    });
  }

  public confirmationMessageHTML(title: string, html: string,
    type: SweetAlertType, showCloseButton: boolean = true,
    showCancelButton: boolean = true, confirmButtonText: string = 'OK',
    cancelButtonText: string = 'Cancel', footerText: string = ''): void {
    Swal.fire({
      type: type,
      title: title,
      html: html,
      showCloseButton: showCloseButton,
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      footer: footerText
    });
  }

  public confirmationPromissMessage(title: string, text: string,
    type: SweetAlertType, showCloseButton: boolean = true,
    showCancelButton: boolean = true, confirmButtonText: string = 'OK', cancelButtonText: string = 'Cancel'): any {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true,
    });

    return swalWithBootstrapButtons.fire({
      title: title,
      text: text,
      type: type,
      showCloseButton: showCloseButton,
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      reverseButtons: true
    });

  }
}
