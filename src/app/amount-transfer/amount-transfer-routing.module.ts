import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmountTransferComponent } from './amount-transfer.component';

const routes: Routes = [
    {
        path: '',
        component: AmountTransferComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AmountTransferRoutingModule { }
