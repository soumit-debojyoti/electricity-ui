import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from '../widgets/profile/profile.component';
import { NotificationComponent } from '../widgets/notification/notification.component';
import { PostComponent } from '../widgets/post/post.component';
import { ContentComponent } from '../widgets/content/content.component';
import { NewsUpdateComponent } from '../widgets/news-update/news-update.component';
import { AddWalletBalanceComponent } from '../widgets/add-wallet-balance/add-wallet-balance.component';
import { AddWalletBalanceAdminComponent } from '../widgets/add-wallet-balance-admin/add-wallet-balance-admin.component';
import { DeductWalletBalanceComponent } from '../widgets/deduct-wallet-balance/deduct-wallet-balance.component';
import { RankAchieverListComponent } from '../widgets/rank-achiever-list/rank-achiever-list.component';
import { GenerateTokenComponent } from '../widgets/generate-token/generate-token.component';
import { WalletBalanceReportComponent } from '../widgets/wallet-balance-report/wallet-balance-report.component';
import { ReportComponent } from '../widgets/report/report.component';
import { TdsChargeComponent } from '../widgets/tds-charge/tds-charge.component';
import { PermissionComponent } from '../widgets/permission/permission.component';
import { AddOperatorComponent } from '../widgets/add-operator/add-operator.component';
import { AddApiComponent } from '../widgets/add-api/add-api.component';
import { CommissionSettingComponent } from '../widgets/commission-setting/commission-setting.component';
import { WidthdrawalRequestComponent } from '../widgets/widthdrawal-request/widthdrawal-request.component';
import { AddEmployeeComponent } from '../widgets/add-employee/add-employee.component';
import { AdminProfileComponent } from '../widgets/admin-profile/admin-profile.component';
import { ApiBalanceComponent } from '../widgets/api-balance/api-balance.component';
import { NewsSliderComponent } from '../widgets/news-slider/news-slider.component';
import { ProfileService } from '../widgets/profile/profile.service';
import { GenerateTokenService } from '../widgets/generate-token/generate-token.service';
import { AmountTransferComponent } from '../widgets/amount-transfer/amount-transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../material-module';
import { ReviveTokenComponent } from '../widgets/revive-token/revive-token.component';
import { SharedModule } from '../shared-module';
import { RechargeComponent } from '../widgets/recharge/recharge.component';
import { RechargeTransactionReportComponent } from '../widgets/recharge-transaction-report/recharge-transaction-report.component';
import { WalletAddApprovalComponent } from '../widgets/wallet-add-approval/wallet-add-approval.component';
import { WalletWithdrawalApprovalComponent } from '../widgets/wallet-withdrawal-approval/wallet-withdrawal-approval.component';
import { RechargeModule } from '../recharge/recharge.module';
import { BalanceTransferComponent } from '../widgets/balance-transfer/balance-transfer.component';
import { BalanceComponent } from '../widgets/balance/balance.component';
import { BalanceRequestComponent } from '../widgets/balance-request/balance-request.component';
import { MyPayoutReportComponent } from '../widgets/my-payout-report/my-payout-report.component';
import { WalletModule } from '../wallet/wallet.module';
import { CommonControlsModule } from '../common-controls/common-controls.module';
@NgModule({
    declarations: [
        DashboardComponent,
        ProfileComponent,
        NotificationComponent,
        PostComponent,
        ContentComponent,
        NewsUpdateComponent,
        AddWalletBalanceComponent,
        AddWalletBalanceAdminComponent,
        DeductWalletBalanceComponent,
        RankAchieverListComponent,
        GenerateTokenComponent,
        WalletBalanceReportComponent,
        ReportComponent,
        TdsChargeComponent,
        PermissionComponent,
        ReviveTokenComponent,
        AddOperatorComponent,
        AddApiComponent,
        CommissionSettingComponent,
        WidthdrawalRequestComponent,
        AddEmployeeComponent,
        AdminProfileComponent,
        ApiBalanceComponent,
        AmountTransferComponent,
        RechargeComponent,
        RechargeTransactionReportComponent,
        NewsSliderComponent,
        WalletAddApprovalComponent,
        WalletWithdrawalApprovalComponent,
        BalanceTransferComponent,
        BalanceComponent,
        BalanceRequestComponent,
        MyPayoutReportComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DemoMaterialModule,
        SharedModule,
        RechargeModule,
        WalletModule,
        CommonControlsModule
        // BrowserAnimationsModule,
        // MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule,
        // MatIconModule, MatSidenavModule, MatListModule
    ],
    providers: [
        ProfileService,
        GenerateTokenService
    ],
    exports: [DashboardComponent]
})
export class DashboardModule { }
