import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the access token from local storage
        const accessToken = localStorage.getItem('access_token');

        // If the access token is present, add the Authorization header
        if (accessToken) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
            });

            return next.handle(authReq).pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        // Redirect to login page
                        this.router.navigate(['/login']);
                    }
                    return throwError(error);
                })
            );
        }

        // If the access token is not present, just forward the request as is
        return next.handle(req);
    }
}
