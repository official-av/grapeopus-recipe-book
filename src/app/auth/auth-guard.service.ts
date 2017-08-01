import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router,CanLoad,Route} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate,CanLoad {
	constructor(private authSvc:AuthService,private router:Router){}
	
	canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
		const val= this.authSvc.isAuthenticated();
		if(!val){
			this.router.navigate(['/signin']);
			return false;
		}
		else
			return true;
	}
	
	canLoad(route: Route) {
    const val= this.authSvc.isAuthenticated();
		if(!val){
			this.router.navigate(['/signin']);
			return false;
		}
		else
			return true;
  }
}