import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DegreeRecommendationService } from 'src/app/demo/Services/degree.service';
import { SharedDataService } from 'src/app/demo/Services/shared.service';
import { UserService } from 'src/app/demo/Services/user.service';
import { Degree } from '../enum/degree.enum';
import { Stream } from 'stream';
import { AlStream } from '../enum/stream.enum';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    questions: any[] = [];
    answers: any[] = [];
    currentQuestion: any;
    currentAnswer: any;
    count: number = 0;
    end: boolean = false;
    isAnswered: boolean = false;
    user: any
    socialFactors: number = 0
    educationalFactors: number = 0
    degree: any
    loading: any
    knnScore: any
    predictedOutput: any = null
    degreeData: any
    display: any = true
    pieData: any
    pieOptions: any
    pieData1: any
    pieOptions1: any
    pieData2: any
    pieOptions2: any
    pieData3: any
    pieOptions3: any
    constructor(private route: ActivatedRoute, private degreeService: DegreeRecommendationService, private userService: UserService, private messageService: MessageService) {
        // this.questions = [
        //     {
        //         question: 'What is the capital of France?',
        //         id: 1,
        //         answers: ['Paris', 'Lyon', 'Marseille'],
        //     },
        //     {
        //         question: 'What is the highest mountain in the world?',
        //         id: 2,
        //         answers: ['Mount Everest', 'K2', 'Kangchenjunga'],
        //     },
        //     {
        //         question: 'What is the name of the current US president?',
        //         id: 3,
        //         answers: ['Joe Biden', 'Donald Trump', 'Barack Obama'],
        //     },
        // ];
    }

    ngOnInit() {
        Promise.all([
            this.getUserData(),

        ]).then(() => {
            this.loading = true
            setTimeout(() => {
                this.currentQuestion = this.questions[0];
                // this.initCharts();
            }, 2000); // Adjust the delay time (in milliseconds) as needed
        });
    }

    onAnswerChange(answer: string) {
        this.currentAnswer = answer;
        this.isAnswered = true;
    }

    onNextQuestion() {
        const q = {
            question: this.currentQuestion.id,
            answer: this.currentAnswer,
            group: this.currentQuestion.group
        };
        this.answers.push(q);
        this.currentAnswer = '';
        this.count += 1;
        this.isAnswered = false;
        this.currentQuestion = this.questions[this.count];
        if (this.count === this.questions.length - 1) {
            this.isAnswered = false;
            this.end = true;
        }
    }

    getDegree() {
        this.getUserData()




    }


    get1DegreeQuiz() {
        let questionSet = [
            {
                question: 'Can you work outside?',
                id: 5,
                group: Degree.Industrial_Studies_Agriculture,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Can you work with laborers?',
                id: 6,
                group: Degree.Industrial_Studies_Agriculture,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Can you work in a dusty environment?',
                id: 7,
                group: Degree.Industrial_Studies_Agriculture,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you good with math?',
                id: 8,
                group: Degree.Industrial_Studies_Agriculture,
                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get2DegreeQuiz() {
        let questionSet = [
            {
                question: 'Can you work remotely?',
                id: 9,
                group: Degree.Software_Engineering,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you interested in working with data?',
                id: 10,
                group: Degree.Software_Engineering,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you like working in an office environment?',
                group: Degree.Software_Engineering,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you enjoy learning about new technology trends?',
                group: Degree.Software_Engineering,
                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get3DegreeQuiz() {
        let questionSet = [
            {
                question: 'Do you enjoy creating, designing, and testing electrical circuits?',
                id: 13,
                group: Degree.Electronic_Communication_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you like working with power generators?',
                id: 14,
                group: Degree.Electronic_Communication_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Can you work with electricity?',
                id: 15,
                group: Degree.Electronic_Communication_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you enjoy working in power plants?'
                ,
                id: 16,
                group: Degree.Electronic_Communication_Engineering,

                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get4DegreeQuiz() {
        let questionSet = [
            {
                question: 'Do you enjoy working with electronic devices?',
                id: 17,
                group: Degree.Mechanical_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you good at math, physics, and computer science?',
                id: 18,
                group: Degree.Mechanical_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you like creating new electronic devices and systems?',
                id: 19,
                group: Degree.Mechanical_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you enjoy testing and improving existing electronic devices and systems?'
                ,
                id: 20,
                group: Degree.Mechanical_Engineering,

                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get5DegreeQuiz() {
        let questionSet = [
            {
                question: 'Do you like working with vehicles?',
                id: 21,
                group: Degree.Mechatronics_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: ' Do you enjoy designing new products and optimizing the performance of existing products?',
                id: 22,
                group: Degree.Mechatronics_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you like designing, developing, and building machines?',
                id: 23,
                group: Degree.Mechatronics_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Can you work at a vehicle repair center with oil and grease?'
                ,
                id: 24,
                group: Degree.Mechatronics_Engineering,

                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get6DegreeQuiz() {
        let questionSet = [
            {
                question: 'Do you enjoy designing, implementing, and maintaining automation systems?',
                id: 25,
                group: Degree.Electrical_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Can you work with newly released technology?',
                id: 26,
                group: Degree.Electrical_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you like solving complex engineering problems?',
                id: 27,
                group: Degree.Electrical_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you enjoy building, repairing, programming, and maintaining smart machines and controls?'
                ,
                id: 28,
                group: Degree.Electrical_Engineering,

                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get7DegreeQuiz() {
        let questionSet = [
            {
                question: 'Do you like improving management skills?',
                id: 29,
                group: Degree.Computer_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Can you work in a factory?',
                id: 30,
                group: Degree.Computer_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you enjoy working in the textile industry?',
                id: 31,
                group: Degree.Computer_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you familiar with clothes?'
                ,
                id: 32,
                group: Degree.Computer_Engineering,

                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get8DegreeQuiz() {
        let questionSet = [
            {
                question: 'Would you like to work in the fields?',
                id: 33,
                group: Degree.Civil_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you enjoy studying animals and plants?',
                id: 34,
                group: Degree.Civil_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Can you do research in agricultural research stations in Sri Lanka?',
                id: 35,
                group: Degree.Civil_Engineering,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you like designing and using agricultural machinery and equipment?'
                ,
                id: 36,
                group: Degree.Civil_Engineering,

                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get9DegreeQuiz() {
        let questionSet = [
            {
                question: 'Would you like to work in the garment industry?',
                id: 37,
                group: Degree.Honours_Engineering_Textile_Clothing,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you enjoy studying the manufacturing process of clothes?',
                id: 38,
                group: Degree.Honours_Engineering_Textile_Clothing,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you like working in the apparel manufacturing sector?',
                id: 39,
                group: Degree.Honours_Engineering_Textile_Clothing,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to be self-employed as a garment manufacturer or a small-scale garment manufacturer?'
                ,
                id: 40,
                group: Degree.Honours_Engineering_Textile_Clothing,

                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get10DegreeQuiz() {
        let questionSet = [
            {
                question: 'Would you like to work in the fashion and apparel industry?',
                id: 41,
                group: Degree.Industrial_Studies_Textile_Manufacture_Specialization,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to set up self-employment in the fashion and apparel fields?',
                id: 42,
                group: Degree.Industrial_Studies_Textile_Manufacture_Specialization,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to start your career as a freelance fashion designer?',
                id: 43,
                group: Degree.Industrial_Studies_Textile_Manufacture_Specialization,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to develop your creative ideas into fashion products?'
                ,
                id: 44,
                group: Degree.Industrial_Studies_Textile_Manufacture_Specialization,

                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get11DegreeQuiz() {
        let questionSet = [
            {
                question: 'Do you like studying textile materials such as fibers, yarns, and fabrics?',
                id: 45,
                group: Degree.Industrial_Studies_Fashion_Design_Product_Development,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to improve your management skills to maintain the quality and productivity of textiles?',
                id: 46,
                group: Degree.Industrial_Studies_Fashion_Design_Product_Development,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to learn the finishing process of fabrics?',
                id: 47,
                group: Degree.Industrial_Studies_Fashion_Design_Product_Development,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to learn about quality control in textiles?'
                ,
                id: 48,
                group: Degree.Industrial_Studies_Fashion_Design_Product_Development,

                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get12DegreeQuiz() {
        let questionSet = [
            {
                question: 'Would you like to work with foreign clients?',
                id: 49,
                group: Degree.Industrial_Studies_Apparel_Production_Management,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you familiar with computer coding?',
                id: 50,
                group: Degree.Industrial_Studies_Apparel_Production_Management,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you enjoy designing, constructing, and implementing large, complex software systems?',
                id: 51,
                group: Degree.Industrial_Studies_Apparel_Production_Management,

                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to learn about cost, time, and risk management in software engineering?'
                ,
                id: 52,
                group: Degree.Industrial_Studies_Apparel_Production_Management,

                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }

    async getDegreeRecommendations(): Promise<void> {
        const socialFactor = this.socialFactors; // Assign the value of this.socialFactors
        const educationalFactor = this.educationalFactors; // Assign the value of this.educationalFactors
        console.log(this.educationalFactors);
        console.log(this.socialFactors);
        this.loading = true
        this.degreeService.getDegreeRecommendations(socialFactor, educationalFactor, this.user.stream).subscribe(
            (response: any) => {
                this.loading = false
                const recommendations = response;
                // Filter out elements with Probability: 0
                const filteredRecommendations = recommendations.filter((degree: { Degree: string; Probability: number; }) => degree.Probability !== 0);
                const validRecommendations = filteredRecommendations.filter((degree: { Degree: string; Probability: number; }) => {
                    return this.getStreamDegrees(this.user.stream).includes(degree.Degree);
                });
                this.initQuiz(validRecommendations)
                // const maxProbabilityDegree = recommendations.reduce((maxDegree: { Probability: number; }, currentDegree: { Probability: number; }) => {
                //     return currentDegree.Probability > maxDegree.Probability ? currentDegree : maxDegree;
                // });


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
    initQuiz(data: any) {
        this.knnScore = data
        data.forEach((degree: any) => {

            if (degree.Degree == Degree.Honours_Agriculture_Plantation_Engineering) {
            } if (degree.Degree == Degree.Industrial_Studies_Agriculture) {
                this.get1DegreeQuiz()
            } if (degree.Degree == Degree.Software_Engineering) {
                this.get2DegreeQuiz()
            }
            if (degree.Degree == Degree.Electronic_Communication_Engineering) {
                this.get3DegreeQuiz()
            }
            if (degree.Degree == Degree.Mechanical_Engineering) {
                this.get4DegreeQuiz()
            }
            if (degree.Degree == Degree.Mechatronics_Engineering) {
                this.get5DegreeQuiz()

            } if (degree.Degree == Degree.Electrical_Engineering) {
                this.get6DegreeQuiz()

            }
            if (degree.Degree === Degree.Computer_Engineering) {
                this.get7DegreeQuiz()

            }
            if (degree.Degree == Degree.Civil_Engineering) {
                this.get8DegreeQuiz()

            }
            if (degree.Degree == Degree.Honours_Engineering_Textile_Clothing) {
                this.get9DegreeQuiz()

            }
            if (degree.Degree == Degree.Industrial_Studies_Textile_Manufacture_Specialization) {
                this.get10DegreeQuiz()

            }
            if (degree.Degree == Degree.Industrial_Studies_Fashion_Design_Product_Development) {
                this.get11DegreeQuiz()

            }
            if (degree.Degree == Degree.Industrial_Studies_Apparel_Production_Management) {
                this.get12DegreeQuiz()

            }
        });
        if (data.length == 0) {
            this.get2DegreeQuiz()//software
            this.get10DegreeQuiz()
            this.get11DegreeQuiz()
            this.get12DegreeQuiz()
            // 'Bachelor of Industrial Studies Honours – Apparel Production & Management',
            // 'Bachelor of Industrial Studies Honours – Fashion Design and Product Development',
            // 'Bachelor of Industrial Studies Honours – Textile Manufacture',
            // 'Bachelor of Software Engineering Honours'
        } else if (data.length == 1) {
            let count = 0
            data.forEach((degree: any) => {

                if (degree.Degree != Degree.Software_Engineering && count != 3) {
                    this.get2DegreeQuiz()
                    count++
                }

                if (degree.Degree != Degree.Industrial_Studies_Textile_Manufacture_Specialization && count != 3) {
                    this.get10DegreeQuiz()
                    count++

                }
                if (degree.Degree == Degree.Industrial_Studies_Fashion_Design_Product_Development && count != 3) {
                    this.get11DegreeQuiz()
                    count++
                }
                if (degree.Degree == Degree.Industrial_Studies_Apparel_Production_Management && count != 3) {
                    this.get12DegreeQuiz()
                    count++

                }
            });

        } else if (data.length == 2) {
            let count = 0
            data.forEach((degree: any) => {

                if (degree.Degree != Degree.Software_Engineering && count != 2) {
                    this.get2DegreeQuiz()
                    count++
                }

                if (degree.Degree != Degree.Industrial_Studies_Textile_Manufacture_Specialization && count != 2) {
                    this.get10DegreeQuiz()
                    count++

                }
                if (degree.Degree == Degree.Industrial_Studies_Fashion_Design_Product_Development && count != 2) {
                    this.get11DegreeQuiz()
                    count++
                }
                if (degree.Degree == Degree.Industrial_Studies_Apparel_Production_Management && count != 2) {
                    this.get12DegreeQuiz()
                    count++

                }
            });

        } else if (data.length == 3) {
            let count = 0
            data.forEach((degree: any) => {

                if (degree.Degree != Degree.Software_Engineering && count != 1) {
                    this.get2DegreeQuiz()
                    count++
                }

                if (degree.Degree != Degree.Industrial_Studies_Textile_Manufacture_Specialization && count != 1) {
                    this.get10DegreeQuiz()
                    count++

                }
                if (degree.Degree == Degree.Industrial_Studies_Fashion_Design_Product_Development && count != 1) {
                    this.get11DegreeQuiz()
                    count++
                }
                if (degree.Degree == Degree.Industrial_Studies_Apparel_Production_Management && count != 1) {
                    this.get12DegreeQuiz()
                    count++

                }
            });

        }

    }
    onSubmit() {
        console.log(this.answers);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Thank you for your time', life: 3000 });

        const groupScores = this.answers.reduce((scores, obj) => {
            const { answer, group } = obj;
            const score = answer === '1' ? 0.25 : 0; // Assign the score based on the answer

            const existingGroup = scores.find((scoreObj: any) => scoreObj.group === group);
            if (existingGroup) {
                existingGroup.score += score;
            } else {
                scores.push({ group, score });
            }

            return scores;
        }, []);


        const updatedGroupScores = groupScores.map((group: { group: any; score: number; }) => {
            const matchingDegree = this.knnScore.find((deg: { Degree: any; }) => deg.Degree === group.group);
            if (matchingDegree) {
                group.score = (group.score + matchingDegree.Probability) / 2;
            }
            return group;
        });
        this.predictedOutput = updatedGroupScores.sort((a: { score: number; }, b: { score: number; }) => b.score - a.score);

        console.log("updated score", this.predictedOutput);

        // const transformedAnswers: any = {};

        // for (let i = 1; i <= 52; i++) {
        //     const questionKey = `q${i}`;
        //     const matchingAnswer = this.answers.find((answerObj) => answerObj.question === i);
        //     const answer = matchingAnswer ? matchingAnswer.answer : "0";
        //     transformedAnswers[questionKey] = [answer];
        // }
        // let streamNum
        // if (this.user.stream == AlStream.Art) {
        //     streamNum = 4
        // } else if (this.user.stream == AlStream.Bio) {
        //     streamNum = 0
        // } else if (this.user.stream == AlStream.Commerce) {
        //     streamNum = 3
        // } else if (this.user.stream == AlStream.Maths_IT) {
        //     streamNum = 2
        // } else if (this.user.stream == AlStream.Maths_che) {
        //     streamNum = 1
        // } else if (this.user.stream == AlStream.Technology) {
        //     streamNum = 5
        // }
        // transformedAnswers[`q53`] = streamNum
        this.loading = true
        setTimeout(() => {
            this.loading = false
            this.getDegreeData(this.predictedOutput[0].group)
        }, 2000);

    }
    getDegreeData(name: string) {
        this.loading = true

        // Retrieve the course data
        this.degreeService.getDegree(name).subscribe((data: any) => {
            this.loading = false

            // Process the retrieved data
            this.degreeData = data

        });
    }

    loadStat() {
        this.display = false
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.pieData = {
            labels: ['Recommending Score', 'Remaining'],
            datasets: [
                {
                    data: [this.predictedOutput[0].score * 100, (1 - this.predictedOutput[0].score) * 100], // Example data, replace with your actual probabilities
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
                }
            ]
        };
        this.pieData1 = {
            labels: ['Recommending Score', 'Remaining'],
            datasets: [
                {
                    data: [this.predictedOutput[1].score * 100, (1 - this.predictedOutput[1].score) * 100], // Example data, replace with your actual probabilities
                    backgroundColor: [
                        '#f44336',   // red-500
                        '#ffc107',   // amber-500
                    ],
                    hoverBackgroundColor: [
                        '#e53935',   // red-400
                        '#ff8f00',   // amber-400
                    ]
                }
            ]
        };
        this.pieData2 = {
            labels: ['Recommending Score', 'Remaining'],
            datasets: [
                {
                    data: [this.predictedOutput[2].score * 100, (1 - this.predictedOutput[2].score) * 100], // Example data, replace with your actual probabilities
                    backgroundColor: [
                        '#009688', // teal-500
                        '#8bc34a'    // light-green-500
                    ],
                    hoverBackgroundColor: [
                        '#00796b'    // teal-400
                        ,
                        '#689f38'    // light-green-400
                    ]
                }
            ]
        };
        this.pieData3 = {
            labels: ['Recommending Score', 'Remaining'],
            datasets: [
                {
                    data: [this.predictedOutput[3].score * 100, (1 - this.predictedOutput[3].score) * 100], // Example data, replace with your actual probabilities
                    backgroundColor: [
                        '#f44336',   // red-500
                        '#ffc107',   // amber-500
                    ],
                    hoverBackgroundColor: [
                        '#e53935',   // red-400
                        '#ff8f00',   // amber-400
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
                }
            }
        };
    }
}

