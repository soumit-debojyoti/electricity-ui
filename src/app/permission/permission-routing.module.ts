import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionComponent } from './permission.component';

const routes: Routes = [
    {
        path: '',
        component: PermissionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PermissionRoutingModule { }
