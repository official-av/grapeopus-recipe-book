import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {CommonModule} from "@angular/common";

@NgModule({
	declarations:[
		SigninComponent,
		SignupComponent
	],
	imports:[FormsModule,
    ReactiveFormsModule,
					 AuthRoutingModule,
    CommonModule
					]
})
export class AuthModule{

}
