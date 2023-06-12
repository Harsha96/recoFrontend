import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DegreeRecommendationService {
    private apiUrl = `${environment.apiUrl}/predict`; // Update the API URL as needed

    constructor(private http: HttpClient) { }

    getDegreeRecommendations(socialFactor: number, educationalFactor: number, stream: string): Observable<any> {
        const body = {
            social_factor: socialFactor,
            educational_factor: educationalFactor,
            stream: stream
        };
        const token = localStorage.getItem('access_token');

        // Create the authorization header
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


        return this.http.post<any>(this.apiUrl, body, { headers: headers });
    }
    getDegree(name: string): Observable<any> {
        const endpoint = `${environment.apiUrl}/degree/${name}`;
        const token = localStorage.getItem('access_token');

        // Create the authorization header
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        // Include the headers in the HTTP GET request
        return this.http.get<any>(endpoint, { headers });
    }
}