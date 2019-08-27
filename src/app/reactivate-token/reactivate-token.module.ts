import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReactivateTokenRoutingModule } from './reactivate-token-routing.module';
import { ReactivateTokenComponent } from './reactivate-token.component';

import { ClipboardModule } from 'ngx-clipboard';
import { FilterTextPipe } from '../pipes/filter-text.pipe';

@NgModule({
    declarations: [ReactivateTokenComponent, FilterTextPipe],
    imports: [
        CommonModule,
        ReactivateTokenRoutingModule,
        FormsModule, ClipboardModule,
        ReactiveFormsModule,
    ]
})
export class ReactivateTokenModule { }
