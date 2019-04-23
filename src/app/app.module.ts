import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StorageServiceModule } from 'angular-webstorage-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';

import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service/data.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { StoreService } from './store/store.service';
// import { StoreModule } from '@ngrx/store';
// import { createReducer } from './store/reducers/message.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    StorageServiceModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

    // StoreModule.forRoot(createReducer())
  ],
  providers: [AuthGuard
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }