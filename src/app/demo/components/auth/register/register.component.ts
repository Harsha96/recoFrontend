import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    selectedDistrict: any = null;

    states: any[] = [
        { name: 'Arizona', code: 'Arizona' },
        { name: 'California', value: 'California' },
        { name: 'Florida', code: 'Florida' },
        { name: 'Ohio', code: 'Ohio' },
        { name: 'Washington', code: 'Washington' },
    ];

    dropdownItems = [
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

    cities1: any[] = [];

    cities2: any[] = [];

    city1: any = null;

    city2: any = null;

    constructor(
        public layoutService: LayoutService,

        private formBuilder: FormBuilder
    ) {}
    ngOnInit() {}
    register() {}
}
