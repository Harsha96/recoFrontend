import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // apiUrl = process.env['API_URL'];

    apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

    login(email?: string, password?: string): Observable<any> {
        const url = `${this.apiUrl}/login`;
        const body = { email, password };
        return this.http.post(url, body).pipe(
            tap((response: any) => {
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('email', email!);

            })
        );
    }

    logout(): Observable<any> {
        const url = `${this.apiUrl}logout`;
        const token = localStorage.getItem('access_token');
        if (!token) {
            return throwError('No token found');
        }
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const options = { headers };

        return this.http.post(url, {}, options).pipe(
            tap(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('email');

            })
        );
    }
    register(body: any) {
        const url = `${this.apiUrl}/register`;
        return this.http.post<any>(url, body);
    }

}