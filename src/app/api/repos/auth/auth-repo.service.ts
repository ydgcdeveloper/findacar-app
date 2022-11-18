import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { LoginInput } from '../../models/login.input';
import { mutations } from '../../_graphql/_mutations';

@Injectable({
  providedIn: 'root'
})
export class AuthRepoService {

  constructor(private apollo: Apollo) { }

  login(loginInput: LoginInput): Observable<any> {
    return this.apollo.mutate({
      mutation: mutations.login(),
      variables: loginInput,
    });
  }

  verifyEmailByPin(pin: string): Observable<any> {
    return this.apollo.mutate({
      mutation: mutations.verifyEmailByPin(),
      variables: {
        pin
      }
    });
  }
}
