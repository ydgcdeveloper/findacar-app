import { RequestInput } from './../../models/request.input';
import { from, BehaviorSubject, Observable } from 'rxjs';
import { RequestRepoService } from './../../repos/request/request-repo.service';
import { Injectable } from '@angular/core';
import { Coin } from '../../interfaces/order.interface';
import { Request, RequestStatus } from '../../interfaces/request.interface';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public requestsSubject: BehaviorSubject<any> = new BehaviorSubject<Request[]>([]);

  // requests: Request[] = [
  //   // {
  //   //   id: 1,
  //   // client: this.userService.getUserById(1),
  //   // date: new Date(),
  //   // datetime: {
  //   //   hours: new Date().getHours(),
  //   //   minutes: new Date().getMinutes(),
  //   // },
  //   // ableToPay: 125,
  //   // coin: Coin.MLC,
  //   // from: {
  //   //   name: 'Ciudad de Holguin',
  //   //   latitude: 20.898995,
  //   //   longitude: -76.262816,
  //   // },
  //   // to: {
  //   //   name: 'PLaya Guardalavaca',
  //   //   latitude: 21.123695,
  //   //   longitude: -75.831821,
  //   // },
  //   // status: RequestStatus.STARTED,
  //   // },
  //   // {
  //   //   id: 2,
  //   // client: this.userService.getUserById(1),
  //   // date: new Date(),
  //   // datetime: {
  //   //   hours: new Date().getHours(),
  //   //   minutes: new Date().getMinutes(),
  //   // },
  //   // ableToPay: 2000,
  //   // coin: Coin.CUP,
  //   // from: {
  //   //   name: 'Ciudad de Holguin',
  //   //   latitude: 20.898995,
  //   //   longitude: -76.262816,
  //   // },
  //   // to: {
  //   //   name: 'Santiago de Cuba',
  //   //   latitude: 20.035335,
  //   //   longitude: -75.829092,
  //   // },
  //   // status: RequestStatus.CANCELED,
  //   // },
  //   // {
  //   //   id: 3,
  //   // client: this.userService.getUserById(1),
  //   // date: new Date(),
  //   // datetime: {
  //   //   hours: new Date().getHours(),
  //   //   minutes: new Date().getMinutes(),
  //   // },
  //   // ableToPay: 1500,
  //   // coin: Coin.CUP,
  //   // from: {
  //   //   name: 'Ciudad de Guantanamo',
  //   //   latitude: 20.151510,
  //   //   longitude: -75.206452,
  //   // },
  //   // to: {
  //   //   name: 'Bayamo',
  //   //   latitude: 20.379128,
  //   //   longitude: -76.642529,
  //   // },
  //   // status: RequestStatus.ACCEPTED,
  //   // },
  // ];

  constructor(
    private userService: UserService,
    private requestRepo: RequestRepoService
  ) { }

  get requests(): Observable<Request[]>{
    return this.requestsSubject.value;
  }

  getAllRquests() {
    return this.requests;
  }

  getRequestsById(id: number) {
    return this.requestsSubject.value.filter((request) => request.id as number === id)[0];
  }

  async getRequestsByUser(): Promise<Request[]> {
    try {
      const requestResponse = await this.requestRepo.getRequestsByUser();
      if (!requestResponse.errors) {
        const requests = requestResponse.data.getRequestsByUser;
        this.requestsSubject.next(requests);
        return requests;
      }
    } catch (error) {
      console.log(error);
    }
  }

  addRequest(requestInput: RequestInput) {
    console.log('requestInput', requestInput);
    return new Promise((resolve, reject) => {
      from(this.requestRepo.addRequest(requestInput)).subscribe(
        {
          next:  () => {
            resolve(true);
          },
          error: (error) => {
            reject(error);
          },
          complete: async () => {
            await this.getRequestsByUser();
          }
        }
      );
    });
  }

  deleteRequest(id: number) {
    return new Promise((resolve, reject) => {
      from(this.requestRepo.deleteRequest(id)).subscribe(
        {
          next:  () => {
            resolve(true);
          },
          error: (error) => {
            reject(error);
          },
          complete: async () => {
            await this.getRequestsByUser();
          }
        }
      );
    });
  }
}
