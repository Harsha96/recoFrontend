import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AcademicService {
    private apiUrl = `${environment.apiUrl}/add-courses`; // Update the API URL as needed

    constructor(private http: HttpClient) { }

    addCourses(email: any, data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<any>(`${this.apiUrl}/${email}`, data, { headers: headers });
    }
}