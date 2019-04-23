import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PermissionRoutingModule } from './permission-routing.module';
import { PermissionComponent } from './permission.component';

@NgModule({
    declarations: [PermissionComponent],
    imports: [
        CommonModule,
        PermissionRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class PermisionModule { }
