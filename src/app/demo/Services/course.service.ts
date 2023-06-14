import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CourseRecommendationService {
    private apiUrl = `${environment.apiUrl}/course-recommend`; // Update the API URL as needed

    constructor(private http: HttpClient) { }

    getCourseRecommendations(socialFactor: number, educationalFactor: number): Observable<any> {
        const body = {
            social_factor: socialFactor,
            educational_factor: educationalFactor
        };
        const token = localStorage.getItem('access_token');

        // Create the authorization header
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


        // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<any>(this.apiUrl, body, { headers: headers });
    }
    getCourse(courseName: string): Observable<any> {
        const endpoint = `${environment.apiUrl}/course/${courseName}`;
        return this.http.get<any>(endpoint);
    }
}