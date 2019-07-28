import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service/auth.service';
import 'rxjs/add/operator/do';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { finalize } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('Basic-Auth') === 'True') {
            return next.handle(req.clone());
        }


        if (this.storage.get('access_token') != null) {
            const clonedreq = req.clone({
                headers: req.headers.append('Authorization',
                    'Bearer ' + this.storage.get('access_token'))
                    .append('Content-Type', 'application/x-www-form-urlencoded')
            });
            return next.handle(clonedreq)
                .do(
                    succ => { },
                    err => {
                        if (err.status === 401) {
                            this.router.navigateByUrl('/login');
                        }
                    },
                    () => { }
                );
        } else {
            if (this.router.url === '/book') {
                // this.router.navigateByUrl('/book');
                return next.handle(req);
            } else {
                this.router.navigateByUrl('/login');
            }

        }

    }
}
