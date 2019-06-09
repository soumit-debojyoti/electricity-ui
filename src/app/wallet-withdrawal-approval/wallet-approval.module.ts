import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WalletApprovalRoutingModule } from './wallet-approval-routing.module';
import { WalletApprovalComponent } from './wallet-approval.component';
import { MatSlideToggleModule, MatButtonModule, MatCheckboxModule } from '@angular/material';

@NgModule({
    declarations: [WalletApprovalComponent],
    imports: [
        CommonModule,
        WalletApprovalRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule, MatCheckboxModule,
        MatButtonModule
    ],
    exports: [MatButtonModule, MatSlideToggleModule, MatCheckboxModule],
})
export class WalletApprovalModule { }
