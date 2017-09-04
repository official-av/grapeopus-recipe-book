import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authSvc: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'firstname': new FormControl(null, [Validators.required]),
      'lastname': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'passwords':new FormGroup({
        'password': new FormControl(null, [Validators.required]),
        'password2': new FormControl(null, [Validators.required])
      },this.confirmPwdValidator)
    });
  }

  onSubmit() {
    const fname = this.signupForm.get('firstname').value;
    const lname = this.signupForm.get('lastname').value;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('passwords.password2').value;
    const user = {username: email, password: password, firstname: fname, lastname: lname};
    this.authSvc.signUpUser(user).subscribe(
      data => {
        this.router.navigateByUrl('/signin');
      },
      error => console.log(error)
    );
  }

  confirmPwdValidator(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.password2.value;
    return pass === confirmPass ? null : { notSame: true }
  }
}
