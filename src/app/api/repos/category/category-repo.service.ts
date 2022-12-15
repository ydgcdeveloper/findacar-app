import { queries } from 'src/app/api/_graphql/_queries';
import { firstValueFrom } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryRepoService {

  constructor(private apollo: Apollo) { }

  async getCategories(): Promise<any> {
    return await firstValueFrom(
      this.apollo.query({
        query: queries.getCategories(),
        fetchPolicy: 'no-cache',
      })
    );
  }
}
