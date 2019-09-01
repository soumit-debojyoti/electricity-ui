import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddApiComponent } from './add-api.component';

const routes: Routes = [
    {
        path: '',
        component: AddApiComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddApiRoutingModule { }
