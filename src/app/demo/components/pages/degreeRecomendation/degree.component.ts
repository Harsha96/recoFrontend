import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeIcons } from 'primeng/api';
import { DegreeRecommendationService } from 'src/app/demo/Services/degree.service';
import { UserService } from 'src/app/demo/Services/user.service';

@Component({
    templateUrl: './degree.component.html',
    styleUrls: ['./degree.scss']
})
export class DegreeComponent implements OnInit {
    degreeList: string[] = ["Bachelor of Technology (BTech) Honours in Agriculture and Plantation Engineering",
        "Bachelor of Industrial Studies Honours - Agriculture",
        "Bachelor of Software Engineering Honours",
        "Bachelor of Technology - Electronic and Communication Engineering",
        "Bachelor of Technology - Mechanical Engineering",
        "Bachelor of Technology - Mechatronics Engineering",
        "Bachelor of Technology - Electrical Engineering",
        "Bachelor of Technology - Computer Engineering",
        "Bachelor of Technology - Civil Engineering",
        "Bachelor of Technology Honours in Engineering – Textile & Clothing",
        "Bachelor of Industrial Studies Honours – Textile Manufacture Specialization",
        "Bachelor of Industrial Studies Honours – Fashion Design and Product Development",
        "Bachelor of Industrial Studies Honours – Apparel Production and Management"
    ];
    suitableDegree?: string;
    user: any
    socialFactors: number = 0
    educationalFactors: number = 0
    degree: any
    loading = true
    chartData: any
    chartOptions: any
    probability: any
    constructor(private router: Router, private degreeService: DegreeRecommendationService, private userService: UserService, private messageService: MessageService) {

    }

    ngOnInit(): void {
        this.loading = true
        this.getUserData()
        const documentStyle = getComputedStyle(document.documentElement);

    }
    getDegreeRecommendations(): void {
        const socialFactor = this.socialFactors; // Assign the value of this.socialFactors
        const educationalFactor = this.educationalFactors; // Assign the value of this.educationalFactors
        console.log(this.educationalFactors);
        console.log(this.socialFactors);
        this.loading = true
        this.degreeService.getDegreeRecommendations(socialFactor, educationalFactor, this.user.stream).subscribe(
            (response: any) => {
                this.loading = false
                const recommendations = response;
                console.log(response);

                const streamDegrees = this.getStreamDegrees(this.user.stream);
                const maxProbabilityDegree = recommendations.reduce((maxDegree: { Probability: number; }, currentDegree: { Probability: number; }) => {
                    return currentDegree.Probability > maxDegree.Probability ? currentDegree : maxDegree;
                });

                this.suitableDegree = maxProbabilityDegree.Degree;
                this.probability = maxProbabilityDegree.Probability;
                this.getDegreeData(this.suitableDegree!)
                this.generateChart()
                // this.suitableDegree = recommendations.reduce((maxDegree, currentDegree) => {
                //     return currentDegree.Probability > maxDegree.Probability ? currentDegree : maxDegree;
                // });

                // this.degreeList = recommendations.map((recommendation: any, index: number) => ({
                //   name: recommendation.Degree,
                //   // progress: recommendation.Probability * 100
                // }));
            },
            (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Login failed',
                });
            }
        );
    }

    getUserData() {
        this.loading = true
        let email = localStorage.getItem('email');
        if (email !== null) {
            // Call the function with the non-null value
            this.userService.getUserByEmail(email).subscribe(async (data) => {
                this.user = data.user;
                this.decideFactorValues(this.user)
                // this.updateDegreeList(this.user.stream)
            });
        }
    }

    decideFactorValues(res: any) {
        this.loading = true

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

        this.getDegreeRecommendations();

    }
    getStreamDegrees(stream: string): string[] {
        switch (stream) {
            case 'Biology':
                return [
                    'Bachelor of Industrial Studies Honours - Agriculture',
                    'Bachelor of Industrial Studies Honours – Apparel Production & Management',
                    'Bachelor of Industrial Studies Honours – Fashion Design and Product Development',
                    'Bachelor of Industrial Studies Honours – Textile Manufacture',
                    'Bachelor of Software Engineering Honours'
                ];

            case 'Mathematics with IT':
                return [
                    'Bachelor of Industrial Studies Honours – Apparel Production & Management',
                    'Bachelor of Industrial Studies Honours – Fashion Design and Product Development',
                    'Bachelor of Industrial Studies Honours – Textile Manufacture',
                    'Bachelor of Software Engineering Honours'
                ];

            case 'Mathematics with Chemistry':
                return [
                    'Bachelor of Technology - Civil Engineering',
                    'Bachelor of Technology - Computer Engineering',
                    'Bachelor of Technology - Electrical Engineering',
                    'Bachelor of Technology - Electronic & Communication Engineering',
                    'Bachelor of Technology - Mechanical Engineering',
                    'Bachelor of Technology - Mechatronics Engineering',
                    'Bachelor of Technology - Textile and Clothing Engineering',
                    'Bachelor of Industrial Studies Honours – Apparel Production & Management',
                    'Bachelor of Industrial Studies Honours – Fashion Design and Product Development',
                    'Bachelor of Industrial Studies Honours – Textile Manufacture',
                    'Bachelor of Software Engineering Honours'
                ];

            case 'Commerce':
                return [
                    'Bachelor of Industrial Studies Honours – Apparel Production & Management',
                    'Bachelor of Industrial Studies Honours – Fashion Design and Product Development',
                    'Bachelor of Industrial Studies Honours – Textile Manufacture',
                    'Bachelor of Software Engineering Honours'
                ];

            case 'Art':
                return [
                    'Bachelor of Industrial Studies Honours – Apparel Production & Management',
                    'Bachelor of Industrial Studies Honours – Fashion Design and Product Development',
                    'Bachelor of Industrial Studies Honours – Textile Manufacture',
                    'Bachelor of Software Engineering Honours'
                ];

            case 'Technology':
                return [
                    'Bachelor of Industrial Studies Honours – Apparel Production & Management',
                    'Bachelor of Industrial Studies Honours – Fashion Design and Product Development',
                    'Bachelor of Industrial Studies Honours – Textile Manufacture',
                    'Bachelor of Software Engineering Honours'
                ];

            default:
                return [];
        }
    }


    filterDegreesByStream(degrees: string[]): string[] {
        return this.degreeList.filter(degree => degrees.includes(degree));
    }

    getDegreeData(name: string) {


        // Retrieve the course data
        this.degreeService.getDegree(name).subscribe((data: any) => {
            // Process the retrieved data
            this.degree = data

        });
    }
    generateChart() {
        this.chartData = {
            labels: ['Success', 'Remaining'],
            datasets: [
                {
                    data: [this.probability * 100, (1 - this.probability) * 100], // Example data, replace with your actual probabilities
                    backgroundColor: ['#00E676', '#E0E0E0']
                }
            ]
        };
        this.chartOptions = {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context: any) => {
                            const label = context.dataset.label || '';
                            const value = context.formattedValue || '';
                            return `${label}: ${value}%`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Probability of Success' // Add your desired title here
                }
            },
            responsive: false, // Disable responsiveness
            maintainAspectRatio: false, // Disable aspect ratio
            height: 100, // Specify the desired height for the chart container
            width: 100 // Specify the desired width for the chart container
        }

    }
}
