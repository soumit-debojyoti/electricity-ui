import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewsFeedFormComponent } from '../news-feed-form/news-feed-form.component';
import { NewsFeedFormRoutingModule } from '../news-feed-form/news-feed-form-routing.module';
@NgModule({
    declarations: [NewsFeedFormComponent],
    imports: [
        CommonModule,
        NewsFeedFormRoutingModule,
        ReactiveFormsModule
    ]
})
export class NewsFeedFormModule { }