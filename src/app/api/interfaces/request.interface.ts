import { Service } from './service.interface';
import { Time } from '@angular/common';
import { User } from './user.interface';
import { Coin } from './order.interface';

export interface Request {
    id: number;
    client: User;
    service: Service;
    date: Date;
    datetime: Time;
    ableToPay: number;
    price: number;
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    STARTED = 'STARTED',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ACCEPTED = 'ACCEPTED',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ORDER = 'ORDER',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CANCELED = 'CANCELED',
}
