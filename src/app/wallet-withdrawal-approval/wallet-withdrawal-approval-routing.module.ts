import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletWithdrawalApprovalComponent } from './wallet-withdrawal-approval.component';

const routes: Routes = [
    {
        path: '',
        component: WalletWithdrawalApprovalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WalletWithdrawalApprovalRoutingModule { }
