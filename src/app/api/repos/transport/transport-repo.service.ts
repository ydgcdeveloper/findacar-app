import { queries } from 'src/app/api/_graphql/_queries';
import { firstValueFrom } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransportRepoService {

  constructor(private apollo: Apollo) { }

  async getTransportServices(): Promise<any> {
    return await firstValueFrom(
      this.apollo.query({
        query: queries.getTransportServices(),
        fetchPolicy: 'no-cache',
      })
    );
  }
}
