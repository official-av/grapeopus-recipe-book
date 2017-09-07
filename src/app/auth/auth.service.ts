import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {ErrorService} from "../errors/error.service";
import {ToastsManager} from "ng2-toastr";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router, private http: Http, private errorService: ErrorService,private toastr:ToastsManager) {
  }

  signUpUser(user: any) {
    return this.http.post('http://Grapeopus-env.nty2pagqgi.ap-south-1.elasticbeanstalk.com/users/register', user).map(
      (response: Response) => {
        this.toastr.success('Registration Successful','Success');
        response.json();
      }).catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }

  signinUser(email: string, password: string) {
    const user = {username: email, password: password};
    return this.http.post('http://Grapeopus-env.nty2pagqgi.ap-south-1.elasticbeanstalk.com/users/login', user).map(
      (response: Response) =>
        response.json()).catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }


  getTk() {
    this.token = localStorage.getItem('token');
    return this.token;
  }

  getUID() {
    return localStorage.getItem('userId');
  }

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    console.log('bye');
    localStorage.clear();
  }
}
