import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {LoggedinGaurd} from "./loggedin-gaurd.service";

const authRoutes=[
	{	path:'signup',component:SignupComponent,canActivate:[LoggedinGaurd]},
	{	path:'signin',component:SigninComponent,canActivate:[LoggedinGaurd]}
];
@NgModule({
	imports:[RouterModule.forChild(authRoutes)],
	exports:[RouterModule]
})

export class AuthRoutingModule{}
