import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AllProfileComponent } from '../all-profile/all-profile.component';
import { DemoMaterialModule } from '../material-module';
import { EditProfileModule } from '../edit-profile/edit-profile.module';
import { CommonControlsModule } from '../common-controls/common-controls.module';
@NgModule({
    declarations: [AllProfileComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DemoMaterialModule,
        EditProfileModule,
        CommonControlsModule
    ],
    exports: [AllProfileComponent]
})
export class AllProfileModule { }
