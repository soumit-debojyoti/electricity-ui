import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import * as MessageActions from '../store/actions/message.actions';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class StoreService<T> {
    constructor(private store: Store<AppState>) {
    }

    public SetData(obj: T, channelName: string): void {
        this.store.dispatch(new MessageActions.AddMessageToChannel({ object: obj }, channelName));
    }

    public GetMessageFromChannel(channelName: string): Observable<any> {
        return this.store.select(channelName);
    }

    public DeleteMessageFromChannel(channelName: string, data: any): void {
        this.store.dispatch(new MessageActions.RemoveMessageFromChannel(data, channelName));
    }
}
