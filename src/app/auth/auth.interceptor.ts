import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service/auth.service';
import 'rxjs/add/operator/do';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { finalize } from 'rxjs/operators';
import { LoadingScreenService } from '../services/loading-screen/loading-screen.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    activeRequests: number;
    constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
        private loadingScreenService: LoadingScreenService) {
        this.activeRequests = 0;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.activeRequests === 0) {
            this.loadingScreenService.startLoading();
        }
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
                    () => {
                        this.loadingScreenService.stopLoading();
                    }
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
