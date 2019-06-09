import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletApprovalComponent } from './wallet-approval.component';

const routes: Routes = [
    {
        path: '',
        component: WalletApprovalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WalletApprovalRoutingModule { }
