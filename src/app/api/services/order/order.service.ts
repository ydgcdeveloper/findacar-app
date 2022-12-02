import { Injectable } from '@angular/core';
import { Coin, Order } from '../../interfaces/order.interface';
import { ServiceService } from '../service/service.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: Order[] = [
    // {
    //   id: 1,
    //   service: this.serviceService.getServiceById(1),
    //   price: '120.00',
    //   coin: Coin.USD,
    //   date: new Date(),
    //   client: this.userService.getUserById(1),
    //   from: {
    //     name: 'Ciudad de Guantanamo',
    //     latitude: 20.151510,
    //     longitude: -75.206452,
    //   },
    //   to: {
    //     name: 'Bayamo',
    //     latitude: 20.379128,
    //     longitude: -76.642529,
    //   },
    // },
    // {
    //   id: 2,
    //   service: this.serviceService.getServiceById(2),
    //   price: 350,
    //   coin: Coin.CUP,
    //   date: new Date(),
    //   client: this.userService.getUserById(2),
    //   from: {
    //     name: 'Ciudad de Holguin',
    //     latitude: 20.898995,
    //     longitude: -76.262816,
    //   },
    //   to: {
    //     name: 'Santiago de Cuba',
    //     latitude: 20.035335,
    //     longitude: -75.829092,
    //   },
    // },
    // {
    //   id: 3,
    //   service: this.serviceService.getServiceById(3),
    //   price: '560.00',
    //   coin: Coin.CUP,
    //   date: new Date(),
    //   client: this.userService.getUserById(3),
    //   from: {
    //     name: 'Ciudad de Guantanamo',
    //     latitude: 20.151510,
    //     longitude: -75.206452,
    //   },
    //   to: {
    //     name: 'Bayamo',
    //     latitude: 20.379128,
    //     longitude: -76.642529,
    //   },
    // }
  ];

  constructor(private userService: UserService, private serviceService: ServiceService) { }

  getAllOrders() {
    return this.orders;
  }

  getOrderById(id: number) {
    return this.orders.filter((order) => order.id as number === id)[0];
  }
}
