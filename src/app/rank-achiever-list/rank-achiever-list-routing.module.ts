import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankAchieverListComponent } from './rank-achiever-list.component';

const routes: Routes = [
    {
        path: '',
        component: RankAchieverListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RankAchieverListRoutingModule { }
