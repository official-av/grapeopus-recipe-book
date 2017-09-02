import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './errors/error/error.component';
import {ErrorService} from "./errors/error.service";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
		AppRoutingModule,
		SharedModule,
		AuthModule,
		CoreModule
  ],
  providers: [ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
