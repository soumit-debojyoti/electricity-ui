import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RechargeRoutingModule } from './recharge-routing.module';
import { RechargeComponent } from './recharge.component';

@NgModule({
    declarations: [RechargeComponent],
    imports: [
        CommonModule,
        RechargeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [RechargeComponent]
})
export class RechargeModule { }
