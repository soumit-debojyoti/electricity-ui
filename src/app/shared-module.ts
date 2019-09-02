import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectAllDirective } from './directives/select-all.directive';
import { ProfileService } from './widgets/profile/profile.service';
// import { SweetAlertService } from './../sweetalert2.service';

// import { UnmaskDirective } from '../../directive/unmask.directive';
// import { FileUploadComponent } from '../file-upload/file-upload.component';

@NgModule({
    imports: [],
    declarations: [SelectAllDirective],
    providers: [ProfileService],
    exports: [
        SelectAllDirective
    ]
})
export class SharedModule {
}
