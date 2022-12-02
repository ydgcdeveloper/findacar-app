import { FilterInput } from './../../models/filter.input';
import { UpdateProfileInput } from './../../models/update-profile.input';
import { mutations } from './../../_graphql/_mutations';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { firstValueFrom, Observable } from 'rxjs';
import { queries } from 'src/app/api/_graphql/_queries';
import { JsonPipe } from '@angular/common';

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
    );
  }

  async getUser(id: number): Promise<any> {
    return await firstValueFrom(
      this.apollo.query({
        query: queries.getUserById(),
        variables: {
          id
        },
        fetchPolicy: 'no-cache',
      })
    );
  }

  updateUserProfile(updateProfileInput: UpdateProfileInput): Observable<any> {
    return this.apollo.mutate({
      mutation: mutations.updateProfile(),
      variables: updateProfileInput
    });
  }

  updateFilter(filterInput: FilterInput): Observable<any> {
    return this.apollo.mutate({
      mutation: mutations.updateFilter(),
      variables: {
        filter: filterInput,
      },
    });
  }
}
