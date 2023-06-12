import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly baseUrl = `${environment.apiUrl}`;

    constructor(private readonly http: HttpClient) { }

    getUserByEmail(email: string): Observable<any> {
        const url = `${this.baseUrl}/user/${email}`;
        // Get the JWT token from wherever it is stored (e.g., local storage, cookie)
        const token = localStorage.getItem('access_token');

        // Create the authorization header
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        // Include the headers in the HTTP GET request
        return this.http.get<any>(url, { headers });
    }
    register(data: any): Observable<any> {
        const body = {
            // social_factor: socialFactor,
            // educational_factor: educationalFactor
        };

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<any>(`${this.baseUrl}/register`, body, { headers: headers });
    }
}