import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
@Injectable()
export class AuthService{
	token:string;
	
	constructor(private router:Router){}
	signUpUser(email:string,password:string){
		firebase.auth().createUserWithEmailAndPassword(email,password).catch(
		(error)=>{console.log(error);}
		);
	}
	
	signinUser(email:string,password:string){
		firebase.auth().signInWithEmailAndPassword(email,password).then(
		(response)=> {
			firebase.auth().currentUser.getToken().then(
				(token:string)=>{
					this.token=token;
				this.router.navigate(['/recipes']);
				}
			)
		}).catch(
		(error)=>console.log(error));
	}
	
	getTk(){
	 firebase.auth().currentUser.getToken().then((token:string)=>this.token=token);
		return this.token;
	}
	
	isAuthenticated(){
		return this.token !=null;
	}
	
	logout(){
		firebase.auth().signOut();
		this.token=null;
		 this.router.navigate(['/signin']);
	}
}