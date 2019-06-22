import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WalletAddDeductApprovalRoutingModule } from './wallet-add-deduct-approval-routing.module';
import { WalletAddDeductApprovalComponent } from './wallet-add-deduct-approval.component';
import { MatSlideToggleModule, MatButtonModule, MatCheckboxModule } from '@angular/material';


@NgModule({
    declarations: [WalletAddDeductApprovalComponent],
    imports: [
        CommonModule,
        WalletAddDeductApprovalRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule, MatCheckboxModule,
        MatButtonModule
    ],
    exports: [MatButtonModule, MatSlideToggleModule, MatCheckboxModule],
})
export class WalletAddDeductApprovalModule { }
