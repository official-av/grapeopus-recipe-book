import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authSvc:AuthService) { }

  ngOnInit() {
  }

	onSignUp(form:NgForm){
    const fname=form.value.fname;
    const lname=form.value.lname;
		const email=form.value.email;
		const password=form.value.password;
		const user={username:email,password:password,firstname:fname,lastname:lname};
		this.authSvc.signUpUser(user).subscribe(
      data => console.log(data),
      error => console.error(error)
    );
	}

}
