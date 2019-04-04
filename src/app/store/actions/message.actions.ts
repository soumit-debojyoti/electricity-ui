import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Message } from '../models/message.model';

export class AddMessageToChannel implements Action {
    readonly type: string = '';
    constructor(public payload: Message, public channelName: string) {
        this.type = `[MESSAGE ${channelName}] Add`;
    }
}

export class RemoveMessageFromChannel implements Action {
    readonly type: string = '';
    constructor(public payload: string, public channelName: string) {
        this.type = `[MESSAGE ${channelName}] Remove`;
    }

}

export type ActionsChannel = AddMessageToChannel | RemoveMessageFromChannel;