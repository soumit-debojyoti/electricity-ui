import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommissionSettingComponent } from '../commission-setting/commission-setting.component';

const routes: Routes = [
    {
        path: '',
        component: CommissionSettingComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommissionSettingRoutingModule { }
