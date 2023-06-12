import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeRoutingModule } from './degree-routing.module';
import { DegreeComponent } from './degree.component';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
    imports: [
        CommonModule,
        TimelineModule,
        ButtonModule,
        CardModule,
        DegreeRoutingModule
    ],
    declarations: [DegreeComponent]
})
export class DegreeModule { }
