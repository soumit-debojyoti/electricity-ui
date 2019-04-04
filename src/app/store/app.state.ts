import { Message } from './models/message.model';

export interface AppState {
    readonly message: Message[];
}