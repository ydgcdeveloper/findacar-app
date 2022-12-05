import { RequestInput } from './../../models/request.input';
import { mutations } from './../../_graphql/_mutations';
import { Observable, firstValueFrom } from 'rxjs';
import { queries } from 'src/app/api/_graphql/_queries';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestRepoService {

  constructor(private apollo: Apollo) { }

  async getRequestsByUser(): Promise<any> {
    return await firstValueFrom(
      this.apollo.query({
        query: queries.getRequestsByUser(),
        fetchPolicy: 'no-cache',
      })
    );
  }

  addRequest(requestInput: RequestInput): Observable<any> {
    return this.apollo.mutate({
      mutation: mutations.addRequest(),
      variables: requestInput
    });
  }

  deleteRequest(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: mutations.deleteRequest(),
      variables: {
        id: parseInt((id as unknown) as string, 10)
      }
    });
  }
}
