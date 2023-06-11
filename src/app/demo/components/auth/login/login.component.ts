import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/Services/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    valCheck: string[] = ['remember'];

    // password!: string;

    // email!: string;
    emailForm!: FormGroup;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService,
        private formBuilder: FormBuilder
    ) {}
    ngOnInit() {
        this.emailForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }
    login() {
        // Perform login logic here
        console.log('Login button clicked');

        if (this.emailForm.valid) {
            const email = this.emailForm.value.email;
            const password = this.emailForm.value.password;

            // Perform login logic here
            console.log('Login button clicked');
            console.log('Email:', email);
            console.log('Password:', password);
            // Rest of the login logic
            this.authService.login(email, password).subscribe(
                (response: any) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Logged in successfully',
                    });

                    // Store the token in local storage
                    localStorage.setItem('token', response.token);
                    setTimeout(() => {
                        this.messageService.clear();
                        this.router.navigate(['']);
                    }, 500);
                    // Navigate to the dashboard component
                    // Show success toast message
                },
                (error: any) => {
                    // Show error toast message
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Login failed',
                    });
                    console.log(error);
                }
            );
        }
        // Rest of the login logic
    }
    register() {
        this.router.navigate(['auth/register']);
    }
}
