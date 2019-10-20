import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DemoMaterialModule } from '../material-module';
@NgModule({
    declarations: [EditProfileComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DemoMaterialModule
    ],
    exports: [EditProfileComponent]
})
export class EditProfileModule { }
