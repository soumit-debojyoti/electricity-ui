import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';

@NgModule({
    declarations: [WalletComponent],
    imports: [
        CommonModule,
        WalletRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class WalletModule { }
