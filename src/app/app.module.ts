import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule,BrowserXhr } from '@angular/http';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { NgProgressModule,NgProgressBrowserXhr } from 'ngx-progressbar';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './errors/error/error.component';
import {ErrorService} from "./errors/error.service";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoadersCssModule } from 'angular2-loaders-css';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
		AppRoutingModule,
		SharedModule,
		AuthModule,
		CoreModule,
    NgProgressModule,
    ToastModule.forRoot(),
    LoadersCssModule
  ],
  providers: [ErrorService,{provide: BrowserXhr, useClass: NgProgressBrowserXhr}],
  bootstrap: [AppComponent]
})
export class AppModule { }
