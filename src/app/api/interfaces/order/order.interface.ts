import { Place } from '../request/request.interface';
import { Service } from '../service/service.interface';
import { User } from '../user/user.interface';

export interface Order {
    id: number;
    service: Service;
    price: string;
    coin: Coin;
    date: Date;
    client: User;
    from: Place;
    to: Place;
}

export enum Coin {
    CUP = 'CUP',
    USD = 'USD',
    MLC = 'MLC'
}

export enum OrderStatus {
    CREATED = 'CREATED',
    ACCEPTED = 'ACCEPTED',
    CANCELED = 'CANCELED',
}
