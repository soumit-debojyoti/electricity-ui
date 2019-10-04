import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComplaintComponent } from '../view-complaint/view-complaint.component';
const routes: Routes = [
    {
        path: '',
        component: ViewComplaintComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ViewComplaintRoutingModule { }