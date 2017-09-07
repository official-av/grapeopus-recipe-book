import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import { AuthService } from '../auth.service';
import * as AuthActions from "../store/auth.actions";
import * as fromApp from '../../store/app.reducers';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  constructor(private authSvc:AuthService,private router:Router,private store:Store<fromApp.AppState>) { }

  ngOnInit() {
  }

	onSubmit(form:NgForm){
		const email=form.value.email;
		const password=form.value.password;
		this.authSvc.signinUser(email,password).subscribe(
      (data)=>{
        localStorage.setItem('token',data.token);
        localStorage.setItem('userId',data.userId);
        this.store.dispatch(new AuthActions.Signin());
        this.router.navigateByUrl('/recipes')},
      error=>console.log(error))
	}

}
