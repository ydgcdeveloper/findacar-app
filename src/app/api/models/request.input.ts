import { Place, RequestStatus } from './../interfaces/request.interface';
import { Coin } from './../interfaces/order.interface';
import { Time } from '@angular/common';

export class RequestInput {
    tag: string;
    date: Date;
    datetime: Time;
    ableToPay: number;
    price?: number;
    coin: Coin;
    from: Place;
    to: Place;
    status: RequestStatus;
}
