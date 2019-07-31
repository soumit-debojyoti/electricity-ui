import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AmountTransferRoutingModule } from './amount-transfer-routing.module';
import { AmountTransferComponent } from './amount-transfer.component';

@NgModule({
    declarations: [AmountTransferComponent],
    imports: [
        CommonModule,
        AmountTransferRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class AmountTransferModule { }
