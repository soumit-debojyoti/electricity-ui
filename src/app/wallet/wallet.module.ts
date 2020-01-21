import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DemoMaterialModule } from '../material-module';
import { CommonControlsModule } from '../common-controls/common-controls.module';
@NgModule({
    declarations: [WalletComponent],
    imports: [
        CommonModule,
        WalletRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DemoMaterialModule,
        CommonControlsModule,
        BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot()
    ],
    exports: [WalletComponent],
    providers: [DatePipe]
})
export class WalletModule { }
