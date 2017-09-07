 import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { Router } from '@angular/router';
 import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducers';
 import {Observable} from "rxjs/Observable";
import * as fromAuth from '../../auth/store/auth.reducer';
 import * as AuthActions from "../../auth/store/auth.actions";

 @Component({
	selector:'app-header',
	templateUrl:'./header.component.html',
	styleUrls:['./header.component.css']
 })

 export class HeaderComponent implements OnInit{
   authState:Observable<fromAuth.State>;
   toggle=false;
	 recipes=[];
	 search=false;
	 constructor(private authSvc:AuthService,private router:Router,private store:Store<fromApp.AppState>){}

	 ngOnInit(){
  this.authState=this.store.select('auth');
   }

	 onLogout(){
		 this.store.dispatch(new AuthActions.Logout());
     this.authSvc.logout();
		 this.router.navigateByUrl('/');
	 }

	 isAuthenticated(){
		 return this.authSvc.isAuthenticated();
	 }

	 onToggle(){this.toggle=!this.toggle;
     }
 }
