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
    level3!: any[]
    level4!: any[]
    level5!: any[]
    level6!: any[]
    lineData: any;

    barData: any;

    pieData: any;



    lineOptions: any;

    barOptions: any;

    pieOptions: any;
    loadCharts = false
    constructor(private courseService: CourseRecommendationService, private userService: UserService
    ) {

    }

    ngOnInit(): void {
        this.getUserData()
        this.getLevel3()
        this.getLevel4()
        this.getLevel5()
        this.getLevel6()
        // this.initCharts();

    }
    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
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


    // clear(table: Table) {
    //     table.clear();
    //     this.filter.nativeElement.value = '';
    // }
    getLevel3() {
        this.loading = true
        this.courseService.getLevel3().subscribe(
            (response: any) => {
                this.loading = false
                this.level3 = response;

            },
            (error: any) => {
                console.error('Error fetching Courses:', error);
            }
        );
    }
    getLevel4() {
        this.loading = true
        this.courseService.getLevel4().subscribe(
            (response: any) => {
                this.loading = false
                this.level4 = response;

            },
            (error: any) => {
                console.error('Error fetching Courses:', error);
            }
        );
    }
    getLevel5() {
        this.loading = true
        this.courseService.getLevel5().subscribe(
            (response: any) => {
                this.loading = false
                this.level5 = response;

            },
            (error: any) => {
                console.error('Error fetching Courses:', error);
            }
        );
    }
    getLevel6() {
        this.loading = true
        this.courseService.getLevel6().subscribe(
            (response: any) => {
                this.loading = false
                this.level6 = response;

            },
            (error: any) => {
                console.error('Error fetching Courses:', error);
            }
        );
    }
    initCharts(data: any) {
        this.loadCharts = true
        console.log(data);

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barData = {
            labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
            datasets: [
                {
                    label: 'Pass out Rate',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data: [data.passout_2010, data.passout_2011, data.passout_2012, data.passout_2013, data.passout_2014, data.passout_2015, data.passout_2016, data.passout_2017, data.passout_2018, data.passout_2019, data.passout_2020, data.passout_2021
                    ]
                },
                // {
                //     label: 'My Second dataset',
                //     backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                //     borderColor: documentStyle.getPropertyValue('--primary-200'),
                //     data: [28, 48, 40, 19, 86, 27, 90]
                // }
            ]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                },
                title: {
                    display: true,
                    text: `${data.course_name} - ${data.course_code}`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: 'white'
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

        // this.pieData = {
        //     labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
        //     datasets: [
        //         {
        //             data: [data.passout_2010, data.passout_2011, data.passout_2012, data.passout_2013, data.passout_2014, data.passout_2015, data.passout_2016, data.passout_2017, data.passout_2018, data.passout_2019, data.passout_2020, data.passout_2021],
        //             backgroundColor: [
        //                 documentStyle.getPropertyValue('--indigo-500'),
        //                 documentStyle.getPropertyValue('--purple-500'),
        //                 documentStyle.getPropertyValue('--teal-500')
        //             ],
        //             hoverBackgroundColor: [
        //                 documentStyle.getPropertyValue('--indigo-400'),
        //                 documentStyle.getPropertyValue('--purple-400'),
        //                 documentStyle.getPropertyValue('--teal-400')
        //             ]
        //         }]
        // };
        this.pieData = {
            labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
            datasets: [
                {
                    data: [data.passout_2010, data.passout_2011, data.passout_2012, data.passout_2013, data.passout_2014, data.passout_2015, data.passout_2016, data.passout_2017, data.passout_2018, data.passout_2019, data.passout_2020, data.passout_2021],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#FF8A80',
                        '#4DD0E1',
                        '#C5E1A5',
                        '#FFAB40',
                        '#FF4081',
                        '#536DFE',
                        '#FF5252',
                        '#80CBC4',
                        '#FFEB3B'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#FF8A80',
                        '#4DD0E1',
                        '#C5E1A5',
                        '#FFAB40',
                        '#FF4081',
                        '#536DFE',
                        '#FF5252',
                        '#80CBC4',
                        '#FFEB3B'
                    ]
                }
            ]
        };
        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                },
                title: {
                    display: true,
                    text: `${data.course_name} - ${data.course_code}`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: 'white'
                }
            }
        };
        let selectedLevel = null;

        if (data.course_code) {
            const level = data.course_code.charAt(3);

            if (level === "3") {
                selectedLevel = this.level3;
            } else if (level === "4") {
                selectedLevel = this.level4;
            } else if (level === "5") {
                selectedLevel = this.level5;
            } else if (level === "6") {
                selectedLevel = this.level6;
            }
        }

        if (selectedLevel) {
            this.lineData = {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
                datasets: selectedLevel.map((course, index) => {
                    let color;

                    if (data.course_code === course.course_code) {
                        color = 'blue'; // Replace 'blue' with the color you want for the specific line
                    } else {
                        color = `hsl(${(index * (360 / selectedLevel.length))}, 70%, 50%)`;
                    }

                    return {
                        label: course.course_code,
                        data: [
                            course.passout_2010,
                            course.passout_2011,
                            course.passout_2012,
                            course.passout_2013,
                            course.passout_2014,
                            course.passout_2015,
                            course.passout_2016,
                            course.passout_2017,
                            course.passout_2018,
                            course.passout_2019,
                            course.passout_2020,
                            course.passout_2021
                        ],
                        fill: false,
                        backgroundColor: color,
                        borderColor: color,
                        tension: 0.4
                    };
                })
            };

        }
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

    }
}
