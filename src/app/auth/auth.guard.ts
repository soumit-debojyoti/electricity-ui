import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { AuthService } from '../services/auth.service/auth.service';
import { ValidateReferalTokenResponse } from '../models/validatereferaltokenresponse.model';
import { AlertService } from '../services/common.service/alert.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private router: Router, private alertService: AlertService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('access_token') != null) {
      if (state.url === '/dashboard') {
        return true;
      } else {
        return true;
      }
    } else {
      if (this.storage.get('security_token') != null) {
        return true;
      } else {
        this.alertService.confirmationMessage('',
          'You are not authrize to view this page.... Only you can view this after successful login.', 'error', true, false);
        this.router.navigateByUrl('/login');
        return false;
      }

    }
  }
}
