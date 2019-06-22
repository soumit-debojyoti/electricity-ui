import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletAddDeductApprovalComponent } from './wallet-add-deduct-approval.component';

const routes: Routes = [
    {
        path: '',
        component: WalletAddDeductApprovalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WalletAddDeductApprovalRoutingModule { }
