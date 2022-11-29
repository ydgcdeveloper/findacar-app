import { queries } from 'src/app/api/_graphql/_queries';
import { firstValueFrom } from 'rxjs';
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
}
