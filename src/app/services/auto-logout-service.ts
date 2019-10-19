import { Router } from '@angular/router';
import { Injectable, NgZone, Inject } from '@angular/core';
import { AuthService } from './auth.service/auth.service';
import { StoreService } from '../store/store.service';
import { Observable } from 'rxjs';
import { Message, ChannelNameEnum } from '../store/models/message.model';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

const MINUTES_UNITL_AUTO_LOGOUT = 1; // in Minutes
const CHECK_INTERVALL = 1000; // in ms
const STORE_KEY = 'lastAction';

@Injectable()
export class AutoLogoutService {
    messages: Observable<Message[]>;
    constructor(
        private auth: AuthService,
        private router: Router,
        private ngZone: NgZone,
        private store: StoreService<any>,
        @Inject(LOCAL_STORAGE) private storage: WebStorageService
    ) {
        this.check();
        // this.initListener();
        this.initInterval();
    }

    public getlastAction(): Observable<any> {
        return this.store.GetMessageFromChannel(ChannelNameEnum.message1.toString());
    }
    public setlastAction(value) {
        this.store.SetData(value, ChannelNameEnum.message1.toString());
    }

    initListener() {
        this.ngZone.runOutsideAngular(() => {
            document.body.addEventListener('click', () => this.reset());
        });
    }

    initInterval() {
        this.ngZone.runOutsideAngular(() => {
            setInterval(() => {
                this.check();
            }, CHECK_INTERVALL);
        });
    }

    public reset() {
        // this.getlastAction()
        //     .subscribe((result) => {
        //             // this.store.DeleteMessageFromChannel(ChannelNameEnum.message1.toString(), result[0].object);
        //             this.store.SetData(Date.now(), ChannelNameEnum.message1.toString());
        //     });
        this.store.SetData(Date.now(), ChannelNameEnum.message1.toString());
    }

    public check() {
        this.getlastAction()
            .subscribe((result) => {
                if (result !== undefined) {
                    const length = result.length;
                    const response = result[length - 1].object;
                    const now = Date.now();
                    const timeleft = response + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
                    const diff = timeleft - now;
                    const isTimeout = diff < 0;
                    this.ngZone.run(() => {
                        if (isTimeout && this.auth.loggedIn) {
                            console.log(`System is loggin out after ${MINUTES_UNITL_AUTO_LOGOUT} Minutes.`);
                            this.storage.set('is_login', false);
                            this.auth.logout();
                            this.router.navigate(['login']);
                        }
                    });
                }
            });
    }
}
