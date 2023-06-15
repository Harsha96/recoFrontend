import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeIcons } from 'primeng/api';
import { DegreeRecommendationService } from 'src/app/demo/Services/degree.service';
import { SharedDataService } from 'src/app/demo/Services/shared.service';
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
    loading: any
    chartData: any
    chartOptions: any
    probability: any
    display!: any
    lineData: any;

    barData: any;

    pieData: any;

    polarData: any;

    radarData: any;

    lineOptions: any;

    barOptions: any;

    pieOptions: any;

    polarOptions: any;

    radarOptions: any;
    constructor(private router: Router, private degreeService: DegreeRecommendationService, private userService: UserService, private messageService: MessageService) {

    }

    ngOnInit(): void {
        this.loading = true
        this.getUserData()
        const documentStyle = getComputedStyle(document.documentElement);
        this.display = true
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
                this.loading = false

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
        if (email) {
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
        this.loading = true

        // Retrieve the course data
        this.degreeService.getDegree(name).subscribe((data: any) => {
            this.loading = false

            // Process the retrieved data
            this.degree = data

        });
    }
    advanceRecomondation() {

        this.router.navigate(['/pages/question']);

        // this.router.navigate(['/pages/question']);
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
    loadStat() {
        this.display = false
        this.initCharts()
    }
    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        this.pieData = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400')
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

        this.lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    tension: .4
                }
            ]
        };

        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        this.polarData = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    3
                ],
                backgroundColor: [
                    documentStyle.getPropertyValue('--indigo-500'),
                    documentStyle.getPropertyValue('--purple-500'),
                    documentStyle.getPropertyValue('--teal-500'),
                    documentStyle.getPropertyValue('--orange-500')
                ],
                label: 'My dataset'
            }],
            labels: [
                'Indigo',
                'Purple',
                'Teal',
                'Orange'
            ]
        };

        this.polarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        this.radarData = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    label: 'My First dataset',
                    borderColor: documentStyle.getPropertyValue('--indigo-400'),
                    pointBackgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                    pointBorderColor: documentStyle.getPropertyValue('--indigo-400'),
                    pointHoverBackgroundColor: textColor,
                    pointHoverBorderColor: documentStyle.getPropertyValue('--indigo-400'),
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    borderColor: documentStyle.getPropertyValue('--purple-400'),
                    pointBackgroundColor: documentStyle.getPropertyValue('--purple-400'),
                    pointBorderColor: documentStyle.getPropertyValue('--purple-400'),
                    pointHoverBackgroundColor: textColor,
                    pointHoverBorderColor: documentStyle.getPropertyValue('--purple-400'),
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };

        this.radarOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: textColorSecondary
                    }
                }
            }
        };
    }
}
