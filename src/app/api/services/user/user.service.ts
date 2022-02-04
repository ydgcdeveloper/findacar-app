import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [
    {
      id: 1,
      username: 'ydgc',
      name: 'Yan'
    },
    {
      id: 2,
      username: 'adam',
      name: 'Adam David'
    },
    {
      id: 3,
      username: 'ydgcdeveloper',
      name: 'Yan David'
    },
  ]

  constructor() { }

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.filter((user) => {
      return user.id == id;
    })[0]
  }
}
