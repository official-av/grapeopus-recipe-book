import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable()
export class LoggedinGaurd implements CanActivate {
	constructor(private authSvc:AuthService,private router:Router){}

	canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
		const val= this.authSvc.isAuthenticated();
		if(val){
			this.router.navigate(['/recipes']);
			return false;
		}
		else
			return true;
	}
}
