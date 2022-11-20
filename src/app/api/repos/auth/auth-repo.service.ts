import { SignupInput } from './../../models/signup.input';
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

  signUp(signupInput: SignupInput): Observable<any>{
    return this.apollo.mutate({
      mutation: mutations.createAccount(),
      variables: signupInput
    })
  }

  login(loginInput: LoginInput): Observable<any> {
    return this.apollo.mutate({
      mutation: mutations.login(),
      variables: loginInput,
    });
  }

  verifyEmailByPin(id: string, pin: string): Observable<any> {
    return this.apollo.mutate({
      mutation: mutations.verifyEmailByPin(),
      variables: {
        id,
        pin
      }
    });
  }
}
