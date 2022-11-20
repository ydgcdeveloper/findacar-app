import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserRepoService } from '../../repos/user/user-repo.service';

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
  ];

  constructor(private userRepo: UserRepoService) { }

  getUsers() {
    return this.users;
  }

  async getUsersV1() {
    try {
      const usersResponse = await this.userRepo.getUsers();
      if (!usersResponse.errors) {
        console.log("Usuarios:", usersResponse.data);
        return usersResponse.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  getUserById(id: number) {
    return this.users.filter((user) => user.id as number === id)[0];
  }
}
