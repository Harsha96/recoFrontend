import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { QuestionsComponent } from './questions/questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SharedDataService } from '../../Services/shared.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChartModule } from 'primeng/chart';

@NgModule({
    declarations: [QuestionsComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule, ProgressSpinnerModule, ChartModule
    ],
    providers: [SharedDataService]
})
export class PagesModule { }
