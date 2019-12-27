import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ViewComplaintComponent } from '../view-complaint/view-complaint.component';
import { ViewComplaintRoutingModule } from '../view-complaint/view-complaint-routing.module';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [ViewComplaintComponent],
    imports: [
        CommonModule,
        ViewComplaintRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [DatePipe]
})
export class ViewComplaintModule { }