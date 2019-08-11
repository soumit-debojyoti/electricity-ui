import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReactivateTokenComponent } from './reactivate-token.component';

const routes: Routes = [
    {
        path: '',
        component: ReactivateTokenComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReactivateTokenRoutingModule { }
