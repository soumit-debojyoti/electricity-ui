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
    path: 'wallet-approval',
    loadChildren: './wallet-withdrawal-approval/wallet-approval.module#WalletApprovalModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet-add',
    loadChildren: './wallet-add-approval/wallet-add-approval.module#WalletAddApprovalModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'configuration',
    loadChildren: './configuration/configuration.module#ConfigurationModule',
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
