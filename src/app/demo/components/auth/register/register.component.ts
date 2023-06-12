import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    selectedDistrict: any = null;
    selectedGender: any = null;
    selectedMarried: any = null;
    selectedStream: any = null
    sinhala: any = null
    english: any = null

    maths: any = null

    science: any = null

    religion: any = null

    history: any = null


    states: any[] = [
        { name: 'Arizona', code: 'Arizona' },
        { name: 'California', value: 'California' },
        { name: 'Florida', code: 'Florida' },
        { name: 'Ohio', code: 'Ohio' },
        { name: 'Washington', code: 'Washington' },
    ];

    dropdownItems = [
        { name: '', code: '' },
        { name: 'Ampara', code: 'Ampara' },
        { name: 'Anuradhapura', code: 'Anuradhapura' },
        { name: 'Badulla', code: 'Badulla' },
        { name: 'Batticaloa', code: 'Batticaloa' },
        { name: 'Colombo', code: 'Colombo' },
        { name: 'Galle', code: 'Galle' },
        { name: 'Gampaha', code: 'Gampaha' },
        { name: 'Hambantota', code: 'Hambantota' },
        { name: 'Jaffna', code: 'Jaffna' },
        { name: 'Kalutara', code: 'Kalutara' },
        { name: 'Kandy', code: 'Kandy' },
        { name: 'Kegalle', code: 'Kegalle' },
        { name: 'Kilinochchi', code: 'Kilinochchi' },
        { name: 'Kurunegala', code: 'Kurunegala' },
        { name: 'Mannar', code: 'Mannar' },
        { name: 'Matale', code: 'Matale' },
        { name: 'Matara', code: 'Matara' },
        { name: 'Monaragala', code: 'Monaragala' },
        { name: 'Mullaitivu', code: 'Mullaitivu' },
        { name: 'Nuwara Eliya', code: 'Nuwara Eliya' },
        { name: 'Polonnaruwa', code: 'Polonnaruwa' },
        { name: 'Puttalam', code: 'Puttalam' },
        { name: 'Ratnapura', code: 'Ratnapura' },
        { name: 'Trincomalee', code: 'Trincomalee' },
        { name: 'Vavuniya', code: 'Vavuniya' },
    ];
    dropdownItemsGender = [
        { name: '', code: '' },
        { name: 'Male', code: 'Male' },
        { name: 'Female', code: 'Female' },
    ];
    dropdownItemsMarried = [
        { name: '', code: '' },
        { name: 'Yes', code: 'Yes' },
        { name: 'No', code: 'No' },
    ];
    dropdownItemsStream = [
        { name: '', code: '' },
        { name: 'Art', code: 'Art' },
        { name: 'Biological Science', code: 'Biological Science' },
        { name: 'Commerce stream', code: 'Commerce stream' },
        { name: 'Physical Science with chemistry', code: 'Physical Science with chemistry' },
        { name: 'Physical Science with IT', code: 'Physical Science with IT' },
        { name: 'Technology stream', code: 'Technology stream' },

    ];
    dropdownItemsGrade = [
        { name: '', code: '' },
        { name: 'Grade A', code: 'A' },
        { name: 'Grade B', code: 'B' },
        { name: 'Grade C', code: 'C' },
        { name: 'Grade S', code: 'S' },
        { name: 'Grade F', code: 'F' }

    ];

    cities1: any[] = [];

    cities2: any[] = [];

    city1: any = null;

    city2: any = null;

    constructor(
        public layoutService: LayoutService,

        private formBuilder: FormBuilder
    ) { }
    ngOnInit() { }
    register() { }
}
