import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommissionSettingComponent } from '../commission-setting/commission-setting.component';
import { CommissionSettingRoutingModule } from '../commission-setting/commission-setting-routing.module';
@NgModule({
    declarations: [CommissionSettingComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommissionSettingRoutingModule
    ],
    exports: [CommissionSettingComponent]
})
export class CommissionSettingModule { }
