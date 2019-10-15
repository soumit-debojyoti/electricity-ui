import { Action } from '@ngrx/store';
import { Message, ChannelNameEnum } from '../models/message.model';
import * as MessageActions from '../actions/message.actions';

// Section 1

const initialState: Message = {
    object: Date.now()
};

const parentFunc = (channelName) => {
    return function reducerChannel(state: Message[] = [initialState], action: MessageActions.ActionsChannel) {
        switch (action.type) {
            case `[MESSAGE ${channelName}] Add`:
                return [...state, action.payload];
            case `[MESSAGE ${channelName}] Remove`:
                state.splice(state.findIndex(x => x.object.name === action.payload), 1);
                return state;
            default:
                return state;
        }
    };
};

export function createReducer() {
    const obj = {};
    Object.keys(ChannelNameEnum).forEach(element => {
        obj[ChannelNameEnum[element]] = parentFunc(ChannelNameEnum[element]);
    });
    return obj;
}
