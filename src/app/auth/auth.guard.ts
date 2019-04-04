import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      debugger;
      if (localStorage.getItem("access_token")!=null) {
        return true;
      }
    else{
      alert("You are not authrize to view this page.... Only you can view this after successful login.");
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
