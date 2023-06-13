import { Component, OnInit } from '@angular/core';

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

    constructor() {
        this.questions = [
            {
                question: 'What is the capital of France?',
                id: 1,
                answers: ['Paris', 'Lyon', 'Marseille'],
            },
            {
                question: 'What is the highest mountain in the world?',
                id: 2,
                answers: ['Mount Everest', 'K2', 'Kangchenjunga'],
            },
            {
                question: 'What is the name of the current US president?',
                id: 3,
                answers: ['Joe Biden', 'Donald Trump', 'Barack Obama'],
            },
        ];
    }

    ngOnInit() {
        this.currentQuestion = this.questions[0];
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
}
