import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WalletAddApprovalRoutingModule } from './wallet-add-approval-routing.module';
import { WalletAddApprovalComponent } from './wallet-add-approval.component';
import { MatSlideToggleModule, MatButtonModule, MatCheckboxModule } from '@angular/material';

@NgModule({
    declarations: [WalletAddApprovalComponent],
    imports: [
        CommonModule,
        WalletAddApprovalRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule, MatCheckboxModule,
        MatButtonModule
    ],
    exports: [MatButtonModule, MatSlideToggleModule, MatCheckboxModule],
})
export class WalletAddApprovalModule { }
