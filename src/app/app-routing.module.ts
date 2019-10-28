import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet',
    loadChildren: './wallet/wallet.module#WalletModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet-withdrawal-approval',
    loadChildren: './wallet-withdrawal-approval/wallet-withdrawal-approval.module#WalletWithdrawalApprovalModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet-add-deduct-approval',
    loadChildren: './wallet-add-deduct-approval/wallet-add-deduct-approval.module#WalletAddDeductApprovalModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'configuration',
    loadChildren: './configuration/configuration.module#ConfigurationModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'recharge',
    loadChildren: './recharge/recharge.module#RechargeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'add-api',
    loadChildren: './add-api/add-api.module#AddApiModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'rank-achiever-list',
    loadChildren: './rank-achiever-list/rank-achiever-list.module#RankAchieverListModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'permission',
    loadChildren: './permission/permission.module#PermisionModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'reactivate-token',
    loadChildren: './reactivate-token/reactivate-token.module#ReactivateTokenModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'news-update',
    loadChildren: './news-feed-form/news-feed-form.module#NewsFeedFormModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'view-complaint',
    loadChildren: './view-complaint/view-complaint.module#ViewComplaintModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'commission-setting',
    loadChildren: './commission-setting/commission-setting.module#CommissionSettingModule',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: './login/login.module#LoginModule',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
