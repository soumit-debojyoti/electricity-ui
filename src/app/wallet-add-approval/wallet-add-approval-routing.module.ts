import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletAddApprovalComponent } from './wallet-add-approval.component';

const routes: Routes = [
    {
        path: '',
        component: WalletAddApprovalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WalletAddApprovalRoutingModule { }
