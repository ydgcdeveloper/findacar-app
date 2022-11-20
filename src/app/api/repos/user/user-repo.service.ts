import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { firstValueFrom, Observable } from 'rxjs';
import { queries } from 'src/app/api/_graphql/_queries';

@Injectable({
  providedIn: 'root'
})
export class UserRepoService {

  constructor(private apollo: Apollo) { }

  async getUsers(): Promise<any> {
    return await firstValueFrom(
      this.apollo.query({
        query: queries.getUsers(),
        fetchPolicy: 'no-cache',
      })
    )
  }
  
}
