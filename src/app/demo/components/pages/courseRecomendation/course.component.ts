import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeIcons } from 'primeng/api';
import { Table } from 'primeng/table';
import { CourseRecommendationService } from 'src/app/demo/Services/course.service';
import { DegreeRecommendationService } from 'src/app/demo/Services/degree.service';
import { UserService } from 'src/app/demo/Services/user.service';

@Component({
    templateUrl: './course.component.html',
    styleUrls: ['./course.scss']
})
export class CourseComponent implements OnInit {
    courses!: any[]
    socialFactors: number = 0
    educationalFactors: number = 0
    user: any | undefined;
    loading = true
    activityValues: number[] = [0, 100];

    constructor(private courseService: CourseRecommendationService, private userService: UserService
    ) {

    }

    ngOnInit(): void {
        this.getUserData()

    }
    getCoursesRecommendations(): void {
        // const socialFactor = 3; // Example value
        // const educationalFactor = 4; // Example value
        const socialFactor = this.socialFactors; // Assign the value of this.socialFactors
        const educationalFactor = this.educationalFactors; // Assign the value of this.educationalFactors

        this.courseService.getCourseRecommendations(socialFactor, educationalFactor).subscribe(
            (response: any) => {
                this.loading = false
                const recommendations = response.recommendations;
                this.courses = recommendations.map((recommendation: any, index: number) => ({
                    name: recommendation.subject,
                    progress: recommendation.probability * 100
                }));
            },
            (error: any) => {
                console.error('Error fetching degree recommendations:', error);
            }
        );
    }
    // openPopup(course: Course): void {
    //   const ref: DynamicDialogRef = this.dialogService.open(CoursePopupComponent, {
    //     header: 'Course Details', // Optional header for the dialog
    //     data: course // Pass the selected course to the popup component
    //   });

    //   // Subscribe to the onClose event of the dialog
    //   ref.onClose.subscribe((result) => {
    //     // Handle any actions after the dialog is closed, if needed
    //   });
    // }


    getUserData() {
        let email = localStorage.getItem('email');
        if (email !== null) {
            // Call the function with the non-null value
            this.userService.getUserByEmail(email).subscribe(async (data) => {
                this.user = data.user;
                console.log(this.user);

                this.decideFactorValues(this.user)
            });
        }
    }

    isCourseExcluded(course: any): boolean {
        return this.user.eligibleOnly.includes(course.name) ||
            this.user.passedList.includes(course.name) ||
            this.user.pendingEligible.includes(course.name);
    }
    decideFactorValues(res: any) {

        for (let i = 1; i <= 3; i++) {
            const subject = res.alResults['subject' + i];
            if (subject == 'A') {
                this.educationalFactors += 0.8;
            } else if (subject == 'B') {
                this.educationalFactors += 0.6;
            } else if (subject == 'C') {
                this.educationalFactors += 0.4;
            } else if (subject == 'S') {
                this.educationalFactors += 0.2;
            } else if (subject == 'F') {
                this.educationalFactors += 0.1;
            }
        }
        for (let i = 1; i <= 9; i++) {
            const subject = res.olResults['subject' + i];
            if (subject == 'A') {
                this.educationalFactors += 0.9;
            } else if (subject == 'B') {
                this.educationalFactors += 0.6;
            } else if (subject == 'C') {
                this.educationalFactors += 0.4;
            } else if (subject == 'S') {
                this.educationalFactors += 0.2;
            } else if (subject == 'F') {
                this.educationalFactors += 0.1;
            }
        }
        if (res.gender == 'Male') {
            this.socialFactors += 0.6
        } else {
            this.socialFactors += 0.4
        }
        if (res.working == true) {
            this.socialFactors += 0.3
        } else {
            this.socialFactors += 0.6
        }
        if (res.married == true) {
            this.socialFactors += 0.8
        } else {
            this.socialFactors += 0.2
        }
        this.getCoursesRecommendations()

    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    // clear(table: Table) {
    //     table.clear();
    //     this.filter.nativeElement.value = '';
    // }

}


