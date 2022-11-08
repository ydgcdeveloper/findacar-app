import { ID } from './rate.interface';
import { Place } from './request.interface';
import { Service } from './service.interface';
import { User } from './user.interface';

export interface Order {
    id: ID;
    service: Service;
    price: string;
    coin: Coin;
    date: Date;
    client: User;
    from: Place;
    to: Place;
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
