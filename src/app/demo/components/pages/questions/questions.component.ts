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
                question: 'Would you like to work on fields?',
                id: 5,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to study animal and plant?',
                id: 6,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Can do research in agricultural research stations in Sri Lanka?',
                id: 7,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to design and use agricultural machinery and equipment?',
                id: 8,
                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get2DegreeQuiz() {
        let questionSet = [
            {
                question: 'Would you like to work with foreign clients?',
                id: 9,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you familiar with computer coding?',
                id: 10,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to design, construction and implementation of large, complex software systems?',
                id: 11,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to learn cost, time and risk management in software engineering?',
                id: 12,
                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get3DegreeQuiz() {
        let questionSet = [
            {
                question: 'Are you like to work with electronic devices?',
                id: 13,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you good with math, physics, and computer science?',
                id: 14,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to create new electronic devices and systems?',
                id: 15,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to test and improve existing electronic devices and systems?'
                ,
                id: 16,
                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get4DegreeQuiz() {
        let questionSet = [
            {
                question: 'Are you like to work with vehicles?',
                id: 17,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to design new products, and to optimize the performance of existing products?',
                id: 18,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to design, develop, and build machines?',
                id: 19,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Can work with vehicle repair center with oil and grease?'
                ,
                id: 20,
                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get5DegreeQuiz() {
        let questionSet = [
            {
                question: 'Are you like to design, implement and maintain Automation system?',
                id: 21,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Can work with newly released technology?',
                id: 22,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to solve complex engineering problems?',
                id: 23,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to build, repair, program and maintain smart machines and controls?'
                ,
                id: 24,
                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get6DegreeQuiz() {
        let questionSet = [
            {
                question: 'Are you like to creating, designing and testing electrical circuits?',
                id: 25,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to work with power generators?',
                id: 26,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Can work with electricity?',
                id: 27,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to work in power plants?'
                ,
                id: 28,
                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get7DegreeQuiz() {
        let questionSet = [
            {
                question: 'Are you curious about how computer systems work?',
                id: 29,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you enjoy working with hardware components and computer networks',
                id: 30,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you motivated to contribute to the advancement of the digital world?',
                id: 31,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to learn new technology trends?'
                ,
                id: 32,
                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get8DegreeQuiz() {
        let questionSet = [
            {
                question: 'Can work outside?',
                id: 33,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Can work with labors?',
                id: 34,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Can work dusty environment?',
                id: 35,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you enjoy problem-solving and logical thinking?'
                ,
                id: 36,
                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get9DegreeQuiz() {
        let questionSet = [
            {
                question: 'Are you like to improve management skills?',
                id: 37,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Can work on factory?',
                id: 38,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to work on textile industry?',
                id: 39,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Do you familiar with clothes?'
                ,
                id: 40,
                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get10DegreeQuiz() {
        let questionSet = [
            {
                question: 'Are you like to study textile materials (such as fibers, yarns and fabrics)?',
                id: 41,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to improve management skills to maintain quality and productivity of textile?',
                id: 42,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to learn finishing process of fabrics?',
                id: 43,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to learn quality control of textile? '
                ,
                id: 44,
                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get11DegreeQuiz() {
        let questionSet = [
            {
                question: 'Would you like to work on fashion and apparel industry?',
                id: 45,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to set up self-employment in the fashion and apparel fields?',
                id: 46,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to start your career as freelance fashion designer?',
                id: 47,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Would you like to develop your creative ideas in to fashion products?'
                ,
                id: 48,
                answers: ['Yes', 'No'],
            },
        ];
        this.questions = [...this.questions, ...questionSet];
    }
    get12DegreeQuiz() {
        let questionSet = [
            {
                question: 'Would you like to work on garment industry?',
                id: 49,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to study manufacturing process of clothes?',
                id: 50,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Are you like to work on apparel manufacturing sector?',
                id: 51,
                answers: ['Yes', 'No'],
            },
            {
                question: 'Would to like to self-employment as garment manufacture or small scale garment manufacturer?'
                ,
                id: 52,
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


        const transformedAnswers: any = {};

        for (let i = 1; i <= 52; i++) {
            const questionKey = `q${i}`;
            const matchingAnswer = this.answers.find((answerObj) => answerObj.question === i);
            const answer = matchingAnswer ? matchingAnswer.answer : "0";
            transformedAnswers[questionKey] = [answer];
        }
        let streamNum
        if (this.user.stream == AlStream.Art) {
            streamNum = 4
        } else if (this.user.stream == AlStream.Bio) {
            streamNum = 0
        } else if (this.user.stream == AlStream.Commerce) {
            streamNum = 3
        } else if (this.user.stream == AlStream.Maths_IT) {
            streamNum = 2
        } else if (this.user.stream == AlStream.Maths_che) {
            streamNum = 1
        } else if (this.user.stream == AlStream.Technology) {
            streamNum = 5
        }
        transformedAnswers[`q53`] = streamNum


    }
}

