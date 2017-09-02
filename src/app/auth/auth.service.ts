import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { Http,Headers,Response } from '@angular/http';

@Injectable()
export class AuthService{
	token:string;

	constructor(private router:Router,private http:Http){}
	signUpUser(user:any){
	  return this.http.post('http://localhost:3000/users/register',user).map(
      (response:Response)=>response.json(),
    (error:Response)=> error.json()
    );
	}

	signinUser(email:string,password:string){
	  const user={username:email,password:password};
		return this.http.post('http://localhost:3000/users/login',user).map(
      (response:Response)=>response.json(),
      (error:Response)=>error.json()
    );
	}


  getTk(){
	 this.token=localStorage.getItem('token');
		return this.token;
	}

	getUID(){
    return localStorage.getItem('userId');
  }

	isAuthenticated(){
		return localStorage.getItem('token')!==null;
	}

	logout(){
		localStorage.clear();
	}
}
