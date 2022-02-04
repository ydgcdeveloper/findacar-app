import { Injectable } from '@angular/core';
import { Coin } from '../../interfaces/order/order.interface';
import { Request, RequestStatus } from '../../interfaces/request/request.interface';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  requests: Request [] = [
    {
      id: 1,
    client: this.user_service.getUserById(1),
    date: new Date(),
    datetime: {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    },
    ableToPay: 125,
    coin: Coin.MLC,
    from: {
      name: "Ciudad de Holguin",
      latitude: 20.898995,
      longitude: -76.262816,
    },
    to: {
      name: "PLaya Guardalavaca",
      latitude: 21.123695,
      longitude: -75.831821,
    },
    status: RequestStatus.STARTED,
    },
    {
      id: 2,
    client: this.user_service.getUserById(1),
    date: new Date(),
    datetime: {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    },
    ableToPay: 2000,
    coin: Coin.CUP,
    from: {
      name: "Ciudad de Holguin",
      latitude: 20.898995,
      longitude: -76.262816,
    },
    to: {
      name: "Santiago de Cuba",
      latitude: 20.035335,
      longitude: -75.829092,
    },
    status: RequestStatus.CANCELED,
    },
    {
      id: 3,
    client: this.user_service.getUserById(1),
    date: new Date(),
    datetime: {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    },
    ableToPay: 1500,
    coin: Coin.CUP,
    from: {
      name: "Ciudad de Guantanamo",
      latitude: 20.151510,
      longitude: -75.206452,
    },
    to: {
      name: "Bayamo",
      latitude: 20.379128,
      longitude: -76.642529,
    },
    status: RequestStatus.ACCEPTED,
    },
  ]
  
  constructor(private user_service: UserService) { }

  getAllRquests(){
    return this.requests;
  }

  getRequestsById(id: number){
    return this.requests.filter((request) => {
      return request.id == id;
    })[0];
  }
}
