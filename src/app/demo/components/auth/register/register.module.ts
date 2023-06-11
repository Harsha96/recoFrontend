import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ButtonModule } from 'primeng/button';
import { AuthRoutingModule } from '../auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { FormLayoutDemoRoutingModule } from '../../uikit/formlayout/formlayoutdemo-routing.module';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/Services/auth.service';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // FormLayoutDemoRoutingModule,
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        DropdownModule,
        InputMaskModule,
        InputNumberModule,
        CascadeSelectModule,
        MultiSelectModule,
        InputTextareaModule,
        InputTextModule,
        RegisterRoutingModule,
        PasswordModule,
        ButtonModule,
        ReactiveFormsModule,
        ToastModule,
        CalendarModule,
        RadioButtonModule,
    ],
    declarations: [RegisterComponent],
    providers: [MessageService, AuthService],
})
export class RegisterModule {}
