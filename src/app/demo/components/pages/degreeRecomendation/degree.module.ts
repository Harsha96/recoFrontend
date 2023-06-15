import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeRoutingModule } from './degree-routing.module';
import { DegreeComponent } from './degree.component';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { SharedDataService } from 'src/app/demo/Services/shared.service';


@NgModule({
    imports: [
        CommonModule,
        TimelineModule,
        ButtonModule,
        CardModule,
        DegreeRoutingModule, ProgressSpinnerModule, ToastModule, ChartModule

    ],
    declarations: [DegreeComponent],
    providers: [MessageService]
})
export class DegreeModule { }
