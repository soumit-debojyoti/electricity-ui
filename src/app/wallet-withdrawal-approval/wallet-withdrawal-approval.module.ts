import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WalletWithdrawalApprovalRoutingModule } from './wallet-withdrawal-approval-routing.module';
import { WalletWithdrawalApprovalComponent } from './wallet-withdrawal-approval.component';
import { MatSlideToggleModule, MatButtonModule, MatCheckboxModule } from '@angular/material';

@NgModule({
    declarations: [WalletWithdrawalApprovalComponent],
    imports: [
        CommonModule,
        WalletWithdrawalApprovalRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule, MatCheckboxModule,
        MatButtonModule
    ],
    exports: [MatButtonModule, MatSlideToggleModule, MatCheckboxModule],
})
export class WalletWithdrawalApprovalModule { }
