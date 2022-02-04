import { Injectable } from '@angular/core';
import { Coin, Order } from '../../interfaces/order/order.interface';
import { ServiceService } from '../service/service.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: Order[] = [
    {
      id: 1,
      service: this.service_service.getServiceById(1),
      price: '120.00',
      coin: Coin.USD,
      date: new Date(),
      client: this.user_service.getUserById(1)
    },
    {
      id: 2,
      service: this.service_service.getServiceById(2),
      price: '350.00',
      coin: Coin.CUP,
      date: new Date(),
      client: this.user_service.getUserById(2)
    },
    {
      id: 3,
      service: this.service_service.getServiceById(3),
      price: '560.00',
      coin: Coin.CUP,
      date: new Date(),
      client: this.user_service.getUserById(3)
    }
  ]

  constructor(private user_service: UserService, private service_service: ServiceService) { }

  getAllOrders() {
    return this.orders;
  }

  getOrderById(id: number) {
    return this.orders.filter((order) => {
      return order.id == id;
    })[0];
  }
}
