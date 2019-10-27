import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommissionSettingComponent } from '../commission-setting/commission-setting.component';
@NgModule({
    declarations: [CommissionSettingComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [CommissionSettingComponent]
})
export class CommissionSettingModule { }
