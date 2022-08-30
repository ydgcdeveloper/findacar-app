import { Time } from '@angular/common';
import { User } from '../user/user.interface';
import { Coin } from '../order/order.interface';

export interface Request {
    id: number;
    client: User;
    date: Date;
    datetime: Time;
    ableToPay: number;
    coin: Coin;
    from: Place;
    to: Place;
    status: RequestStatus;
}

export interface Place {
    name: string;
    latitude: number;
    longitude: number;
}

export enum RequestStatus {
    STARTED = 'STARTED',
    ACCEPTED = 'ACCEPTED',
    ORDER = 'ORDER',
    CANCELED = 'CANCELED',
}
