import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectAllDirective } from './directives/select-all.directive';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { PermisionModule } from './permission/permission.module';
import { RankAchieverListModule } from './rank-achiever-list/rank-achiever-list.module';

// import { SweetAlertService } from './../sweetalert2.service';

// import { UnmaskDirective } from '../../directive/unmask.directive';
// import { FileUploadComponent } from '../file-upload/file-upload.component';

@NgModule({
    imports: [],
    declarations: [SelectAllDirective],
    providers: [],
    exports: [
        SelectAllDirective
    ]
})
export class SharedModule {
}
