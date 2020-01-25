import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../material-module';
import { CustomDatePickerComponent } from '../common-controls/custom-date-picker/custom-date-picker.component';
import { HeaderControlComponent } from './header-control/header-control.component';
@NgModule({
    declarations: [CustomDatePickerComponent, HeaderControlComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DemoMaterialModule
    ],
    exports: [CustomDatePickerComponent, HeaderControlComponent]
})
export class CommonControlsModule { }
