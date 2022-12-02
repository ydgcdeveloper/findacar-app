import { Time } from '@angular/common';
import { ID } from './rate.interface';
import { Place } from './request.interface';
import { Service } from './service.interface';
import { User } from './user.interface';

export interface Order {
    id: ID;
    client: User;
    service: Service;
    date: Date;
    dateTime: Time;
    price: number;
    coin: Coin;
    from: Place;
    to: Place;
    status: OrderStatus;
}

export enum Coin {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CUP = 'CUP',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    USD = 'USD',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MLC = 'MLC'
}

export enum OrderStatus {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CREATED = 'CREATED',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ACCEPTED = 'ACCEPTED',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CANCELED = 'CANCELED',
}
