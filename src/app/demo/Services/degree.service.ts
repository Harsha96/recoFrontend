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

    getDegreeRecommendations(socialFactor: number, educationalFactor: number): Observable<any> {
        const body = {
            social_factor: socialFactor,
            educational_factor: educationalFactor
        };

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<any>(this.apiUrl, body, { headers: headers });
    }
}