import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import { AuthService } from '../auth.service';
import {ServerService} from "../../server.service";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private authSvc:AuthService,private router:Router) { }

  ngOnInit() {
  }

	onSignIn(form:NgForm){
		const email=form.value.email;
		const password=form.value.password;
		this.authSvc.signinUser(email,password).subscribe(
      (data)=>{console.log(data);
        localStorage.setItem('token',data.token);
        localStorage.setItem('userId',data.userId);
        this.router.navigateByUrl('/recipes')},
      error=>console.log(error))
	}

}
