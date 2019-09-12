import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsFeedFormComponent } from '../news-feed-form/news-feed-form.component';
const routes: Routes = [
    {
        path: '',
        component: NewsFeedFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class NewsFeedFormRoutingModule { }