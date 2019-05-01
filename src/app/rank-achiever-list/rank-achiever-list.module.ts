import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RankAchieverListRoutingModule } from './rank-achiever-list-routing.module';
import { RankAchieverListComponent } from './rank-achiever-list.component';

@NgModule({
    declarations: [RankAchieverListComponent],
    imports: [
        CommonModule,
        RankAchieverListRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class RankAchieverListModule { }
