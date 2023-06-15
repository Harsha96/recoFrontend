import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    selectedDistrict: any = null;
    selectedGender: any = null;
    selectedMarried: any = null;
    selectedStream: any = null;
    sinhala: any = null;
    english: any = null;
    maths: any = null;
    science: any = null;
    religion: any = null;
    history: any = null;
    empStatus: any;
    defaultALStream: string = 'Mathematics';
    state: number = 1;

    dropdownItemsGender = [
        // { name: '', code: '' },
        { name: 'Male', code: 'Male' },
        { name: 'Female', code: 'Female' },
    ];
    dropdownItemsMarried = [
        // { name: '', code: '' },
        { name: 'Single', code: 'Single' },
        { name: 'Married', code: 'Married' },
        { name: 'Divorced', code: 'Divorced' },
        { name: 'Widowed', code: 'Widowed' },
    ];
    dropdownItemsStream = [
        { name: '', code: '' },
        { name: 'Art', code: 'Art' },
        { name: 'Biological Science', code: 'Biological Science' },
        { name: 'Commerce stream', code: 'Commerce stream' },
        {
            name: 'Physical Science with chemistry',
            code: 'Physical Science with chemistry',
        },
        { name: 'Physical Science with IT', code: 'Physical Science with IT' },
        { name: 'Technology stream', code: 'Technology stream' },
    ];
    dropdownItemsGrade = [
        { name: 'A', code: 'A' },
        { name: 'B', code: 'B' },
        { name: 'C', code: 'C' },
        { name: 'S', code: 'S' },
        { name: 'F', code: 'F' },
    ];

    dropdownItemsEmploymentStatus = [
        { name: 'Unemployed', code: 'Unemployed' },
        { name: 'Full-time', code: 'Full-time' },
        { name: 'Part-time', code: 'Part-time' },
    ];
    dropdownItemsCommitment = [
        { name: '1-5 hours', code: '1-5 hours' },
        { name: '6-10 hours', code: '6-10 hours' },
        { name: '11-15 hours', code: '11-15 hours' },
        { name: '16-20 hours', code: '16-20 hours' },
        { name: 'More than 20 hours', code: 'More than 20 hours' },
    ];

    dropdownItemsIncome = [
        { name: 'Less than 30,000', code: 'Less than 30,000' },
        { name: '30,000 - 50,000', code: '30,000 - 50,000' },
        { name: '50,000 - 70,000', code: '50,000 - 70,000' },
        { name: '70,000 - 90,000', code: '70,000 - 90,000' },
        { name: 'More than 90,000', code: 'More than 90,000' },
    ];

    dropdownOLSubj1 = [
        'Business & Accounting Studies',
        'Geography',
        'Civic Education',
        ' Entrepreneurship Studies',
        'Second Language (Sinhala)',
        'Second Language (Tamil)',
        'Pali',
        'Sanskrit',
        'French',
        'German',
        'Hindi',
        'Japanese',
        'Arabic',
        'Korean',
        'Chinese',
        'Russian',
    ];

    dropdownOLSubj2 = [
        ' Music (Oriental)',
        'Music (Western)',
        'Music (Carnatic)',
        'Art',
        'Dancing (Oriental)',
        'Dancing (Bharata)',
        'Appreciation of English Literary Texts',
        'Appreciation of Sinhala Literary Texts',
        'Appreciation of Tamil Literary Texts',
        'Appreciation of Arabic Literary Texts',
        'Drama and Theatre (Sinhala)',
        'Drama and Theatre (Tamil)',
        'Drama and Theatre (English)',
    ];
    dropdownOLSubj3 = [
        'Information & Communication Technology',
        'Agriculture & Food Technology',
        'Aquatic Bioresources Technology',
        'Art & Crafts',
        'Home Economics',
        'Health & Physical Education',
        'Communication & Media Studies',
        'Design & Construction Technology',
        'Design & Mechanical Technology',
        'Design, Electrical & Electronic Technology',
        'Electronic Writing & Shorthand (Sinhala)',
        'Electronic Writing & Shorthand (Tamil)',
        'Electronic Writing & Shorthand (English)',
    ];

    dropdownALStream = ['Mathematics', 'Mathematics with IT', 'Biology'];

    youngerThanValidator =
        (maxAge: number): ValidatorFn =>
        (control) => {
            return new Date().getFullYear() -
                new Date(control.value).getFullYear() <
                maxAge
                ? { younger: { maxAge } }
                : null;
        };

    personalInfo = new FormGroup({
        firstName: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
        ]),
        lastName: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
        ]),
        gender: new FormControl('Male'),
        martialStatus: new FormControl('Single'),
        dob: new FormControl('', [this.youngerThanValidator(18)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        nic: new FormControl('', [Validators.required]),
        password: new FormControl('', [
            Validators.required,
            matchValidator('password1', true),
        ]),
        password1: new FormControl('', [
            Validators.required,
            matchValidator('password'),
        ]),
        employeeStatus: new FormControl('Unemployment'),
        income: new FormControl(''),
        commitment: new FormControl('1-5 hours'),
    });

    educationInfo = new FormGroup({
        olSinhala: new FormControl('A'),
        olScience: new FormControl('A'),
        olMaths: new FormControl('A'),
        olHistory: new FormControl('A'),
        olReligion: new FormControl('A'),
        olSubj1: new FormControl('Business & Accounting Studies'),
        olSubj1grade: new FormControl('A'),
        olSubj2: new FormControl('Music (Oriental)'),
        olSubj2grade: new FormControl('A'),
        olSubj3: new FormControl('Information & Communication Technology'),
        olSubj3grade: new FormControl('A'),
        alStream: new FormControl('Mathematics'),
        alSubj1: new FormControl('A'),
        alSubj2: new FormControl('A'),
        alSubj3: new FormControl('A'),
    });

    onEmploymentChange() {
        this.empStatus = this.personalInfo.value['employeeStatus'];
    }

    onALStreamChange() {
        // 'Mathematics', 'Mathematics with IT', 'Biology'
        if (this.educationInfo.value['alStream'] === 'Mathematics') {
            this.defaultALStream = 'Mathematics';
        } else if (this.educationInfo.value['alStream'] === 'Biology') {
            this.defaultALStream = 'Biology';
        } else if (
            this.educationInfo.value['alStream'] === 'Mathematics with IT'
        ) {
            this.defaultALStream = 'Mathematics with IT';
        }
    }


    constructor(
        public layoutService: LayoutService,

        private fb: FormBuilder
    ) {
        this.empStatus = {
            name: 'Unemployed',
            code: 'Unemployed',
        };
    }

    personalDetails = {};
    educationResults = {};

    ngOnInit() {
        // console.log(this.a.password1);
    }

 

    register() {
        let employeeStatus:any = this.personalInfo.value['employeeStatus'];
        let income:any;
        let martialStatus:any = this.personalInfo.value['martialStatus'];
        let gender:any = this.personalInfo.value['gender'];
        let commitment:any = this.personalInfo.value['commitment'];
        if(employeeStatus === 'Unemployment'){
            income ='Less than 30,000';
        } else{

            income = this.personalInfo.value['income'];
        }
        let dob = this.convertDate(this.personalInfo.value['dob']);
        this.personalDetails = {
            firstName: this.personalInfo.value['firstName'],
            lastName: this.personalInfo.value['lastName'],
            email : this.personalInfo.value['email'],
            nic: this.personalInfo.value['nic'],
            income: income,
            gender: gender,
            dob: dob,
            martialStatus: martialStatus,
            employeeStatus: employeeStatus,
            commitment: commitment,
        }
        this.state =2;
    }
    register2() {

        let history = this.educationInfo.value['olHistory'];
        let maths = this.educationInfo.value['olMaths'];
        let religion = this.educationInfo.value['olReligion'];
        let science = this.educationInfo.value['olScience'];
        let sinhala = this.educationInfo.value['olSinhala'];
        let sub1 = this.educationInfo.value['olSubj1'];
        let sub1Grade = this.educationInfo.value['olSubj1grade'];
        let sub2 = this.educationInfo.value['olSubj2'];
        let sub2Grade = this.educationInfo.value['olSubj2grade'];
        let sub3 = this.educationInfo.value['olSubj3'];
        let sub3Grade = this.educationInfo.value['olSubj3grade'];

        let olResults = {
            history: history,
            mathematics: maths,
            religion: religion,
            science: science,
            sinhala: sinhala,
        };
        if (typeof sub1 === 'string' && typeof sub1Grade === 'string') {
            Object.defineProperty(olResults, sub1, {value:sub1Grade});
        }
        if (typeof sub2 === 'string' && typeof sub2Grade === 'string') {
            Object.defineProperty(olResults, sub2, {value:sub2Grade});
        }
        if (typeof sub3 === 'string' && typeof sub3Grade === 'string') {
            Object.defineProperty(olResults, sub3, {value:sub3Grade});
        }

        let subject1Grade = this.educationInfo.value['alSubj1'];
        let subject2Grade = this.educationInfo.value['alSubj2'];
        let subject3Grade = this.educationInfo.value['alSubj3'];

        let alResults;
        if (this.defaultALStream === 'Mathematics') {
            alResults = {
                stream: this.defaultALStream,
                Mathematics: subject1Grade,
                Chemistry: subject2Grade,
                Physics: subject3Grade,
            };
        } else if (this.defaultALStream === 'Mathematics with IT') {
            alResults = {
                stream: this.defaultALStream,
                Mathematics: subject1Grade,
                IT: subject2Grade,
                Physics: subject3Grade,
            };
        } else {
            alResults = {
                stream: this.defaultALStream,
                Biology: subject1Grade,
                Chemistry: subject2Grade,
                Physics: subject3Grade,
            };
        }
        this.educationResults = {
            alResults, 
            olResults
        }
        this.onSubmit();
    }

    get a() {
        return this.personalInfo.controls;
    }

    onSubmit() {
        let pData:any = this.personalDetails;
        let eData:any = this.educationResults;
        let formData = {
            firstName: pData['firstName'],
            lastName: pData['lastName'],
            email : pData['email'],
            nic: pData['nic'],
            income: pData['income'],
            gender: pData['gender'],
            dob: pData['dob'],
            martialStatus: pData['martialStatus'],
            employeeStatus: pData['employeeStatus'],
            commitment: pData['commitment'],
            olResults:eData['olResults'],
            alResults: eData['alResults']
        }

        console.log(formData);
    }

    convertDate(dateString:any) {
        // Split the date string into its constituent parts.
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
      }
}

export function matchValidator(
    matchTo: string,
    reverse?: boolean
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.parent && reverse) {
            const c = (control.parent?.controls as any)[
                matchTo
            ] as AbstractControl;
            if (c) {
                c.updateValueAndValidity();
            }
            return null;
        }
        return !!control.parent &&
            !!control.parent.value &&
            control.value === (control.parent?.controls as any)[matchTo].value
            ? null
            : { matching: true };
    };
}
