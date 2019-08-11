import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReactivateTokenRoutingModule } from './reactivate-token-routing.module';
import { ReactivateTokenComponent } from './reactivate-token.component';

@NgModule({
    declarations: [ReactivateTokenComponent],
    imports: [
        CommonModule,
        ReactivateTokenRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class ReactivateTokenModule { }
