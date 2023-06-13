import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'crud',
                loadChildren: () =>
                    import('./crud/crud.module').then((m) => m.CrudModule),
            },
            {
                path: 'empty',
                loadChildren: () =>
                    import('./empty/emptydemo.module').then(
                        (m) => m.EmptyDemoModule
                    ),
            },
            {
                path: 'timeline',
                loadChildren: () =>
                    import('./timeline/timelinedemo.module').then(
                        (m) => m.TimelineDemoModule
                    ),
            },
            {
                path: 'degree',
                loadChildren: () =>
                    import('./degreeRecomendation/degree.module').then(
                        (m) => m.DegreeModule
                    ),
            },
            { path: 'question', component: QuestionsComponent },

            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
