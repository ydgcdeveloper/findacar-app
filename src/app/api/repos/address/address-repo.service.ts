import { mutations } from './../../_graphql/_mutations';
import { AddressInput } from './../../models/address.input';
import { queries } from 'src/app/api/_graphql/_queries';
import { Observable, firstValueFrom } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressRepoService {

  constructor(private apollo: Apollo) { }

  async getAddressesByUser(): Promise<any> {
    return await firstValueFrom(
      this.apollo.query({
        query: queries.getAddressesByUser(),
        fetchPolicy: 'no-cache',
      })
    );
  }

  async getAddressById(id: number): Promise<any> {
    return await firstValueFrom(
      this.apollo.query({
        query: queries.getAddressById(),
        variables: {
          id
        },
        fetchPolicy: 'no-cache',
      })
    );
  }

  addAddress(addressInput: AddressInput): Observable<any> {
    return this.apollo.mutate({
      mutation: mutations.addAddress(),
      variables: addressInput
    });
  }

  setSelectedAddress(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: mutations.setSelectedAddress(),
      variables: {
        id: parseInt((id as unknown) as string, 10)
      }
    });
  }
}
