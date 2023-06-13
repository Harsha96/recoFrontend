import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeIcons } from 'primeng/api';
import { DegreeRecommendationService } from 'src/app/demo/Services/degree.service';
import { UserService } from 'src/app/demo/Services/user.service';

@Component({
    templateUrl: './course.component.html',
    styleUrls: ['./course.scss']
})
export class CourseComponent implements OnInit {
    ngOnInit(): void {
    }

}
