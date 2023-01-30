import { FilterInput } from './../../models/filter.input';
import { AuthRepoService } from './../../repos/auth/auth-repo.service';
import { UpdateProfileInput } from './../../models/update-profile.input';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserRepoService } from '../../repos/user/user-repo.service';
import { BehaviorSubject, from, Observable } from 'rxjs';

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
  private loggedUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private userRepo: UserRepoService) { }

  get user(): Observable<any>{
    return this.loggedUser.value;
  }

  get filter(): Observable<any>{
    return this.loggedUser.value?.profile?.filter;
  }

  async getUser(id: number): Promise<any> {
    try {
      const userResponse = await this.userRepo.getUser(id);
      if (!userResponse.errors) {
        const user = userResponse.data.getUserById;
        this.loggedUser.next(user);
        // console.log('Logged User:', user);
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUsersV1() {
    try {
      const usersResponse = await this.userRepo.getUsers();
      if (!usersResponse.errors) {
        console.log('Usuarios:', usersResponse.data);
        return usersResponse.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateUserProfile(updateProfileInput: UpdateProfileInput): Promise<any> {
    return new Promise((resolve, reject) => {
      from(this.userRepo.updateUserProfile(updateProfileInput)).subscribe(
        {
          next: (updatedData) => {
            console.log(updatedData);
            resolve(true);
          },
          error: (error) => {
            reject(error);
          }
        }
      );
    });
  }

  updateFilter(filterInput: FilterInput){
    return new Promise((resolve, reject) => {
      from(this.userRepo.updateFilter(filterInput)).subscribe(
        {
          next: (updatedData) => {
            console.log(updatedData);
            resolve(true);
          },
          error: (error) => {
            reject(error);
          }
        }
      );
    });
  }

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.filter((user) => user.id as number === id)[0];
  }
}
