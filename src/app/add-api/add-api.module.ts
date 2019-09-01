import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddApiRoutingModule } from './add-api-routing.module';
import { AddApiComponent } from './add-api.component';

@NgModule({
    declarations: [AddApiComponent],
    imports: [
        CommonModule,
        AddApiRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class AddApiModule { }
