import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StorageServiceModule } from 'angular-webstorage-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service/data.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
// import {
//   NbThemeModule,
//   NbLayoutModule,
//   NbButtonModule
// } from '@nebular/theme';
import { MatNativeDateModule } from '@angular/material';
import { DemoMaterialModule } from './material-module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SharedModule } from './shared-module';
// import { AutoLogoutService } from './services/auto-logout-service';
import { StoreModule } from '@ngrx/store';
import { createReducer } from './store/reducers/message.reducer';

// import { StoreService } from './store/store.service';
// import { UserIdleModule } from 'angular-user-idle';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DemoMaterialModule,
    StorageServiceModule,
    NgxSpinnerModule,
    // NbLayoutModule,
    // NbButtonModule,
    SharedModule,
    // NbThemeModule.forRoot({ name: 'default'})
    // UserIdleModule.forRoot({ idle: 180, timeout: 1, ping: 120 })
    // StoreModule.forRoot({ count: createReducer })
    // StoreModule.forRoot({ count: _counterReducer })
  ],
  providers: [AuthGuard
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, { provide: LocationStrategy, useClass: HashLocationStrategy }, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
