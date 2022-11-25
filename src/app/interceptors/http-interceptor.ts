import { AuthService, STORAGE_ACCESS_TOKEN_KEY } from './../api/services/auth/auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    debug = false;
    constructor(private authService: AuthService, private router: Router) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.getTokenJWT();
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        // if (request.url.indexOf('/graphql') > -1 || request.url.indexOf('/custom-operations') > -1) {
        //   request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
        //   request = request.clone({headers: request.headers.set('Accept', 'application/json')});
        // } else if (request.url.indexOf('/multimedia') < 0) {
        //   request = request.clone({headers: request.headers.set('Content-Type', 'application/ld+json')});
        //   request = request.clone({headers: request.headers.set('Accept', 'application/ld+json')});
        // }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                   if(event.body.errors){
                    const errorMessages = (event.body.errors as Array<any>).map((element) => element.message);
                    if (errorMessages.includes('Expired JWT Token') || errorMessages.includes('Wrong JWT Token')) {
                        console.log('Error JWT token');
                        this.authService.logout().then(() => {
                            this.router.navigate(['/login']).then();
                        });
                    }
                   }
                }
                return event;
            }),
            // catchError((response: HttpResponse<any>) => {
            //     // console.log('http_event--->', response.body.errors);
            //     // if (response.body.errors.length && (response.body.errors as Array<any>).includes((element) => { element.message === 'Expired JWT Token' })) {
            //     //     console.log('Error refresh token');
            //     //     this.authService.logout().then(() => {
            //     //         this.router.navigate(['/login']).then();
            //     //     });
            //     // } else {
            //     //     return throwError(response);
            //     // }
            // })
        );
    }

    getTokenJWT() {
        return localStorage.getItem(STORAGE_ACCESS_TOKEN_KEY);
    }
}
