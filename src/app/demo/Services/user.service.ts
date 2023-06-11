import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly baseUrl = `${environment.apiUrl}`;

    constructor(private readonly http: HttpClient) { }

    getUserByEmail(email: string): Observable<User> {
        const url = `${this.baseUrl}/user/${email}`;
        return this.http.get<User>(url);
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