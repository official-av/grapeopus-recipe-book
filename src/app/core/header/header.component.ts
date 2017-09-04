 import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
 import {RecipeService} from '../../recipes/recipes.service';
 import {ServerService} from '../../server.service';
import {Recipe} from '../../recipes/recipe.model';
import {AuthService} from '../../auth/auth.service';
import { Router } from '@angular/router';

 @Component({
	selector:'app-header',
	templateUrl:'./header.component.html',
	styleUrls:['./header.component.css']
 })

 export class HeaderComponent {
   @ViewChild('nav') el:ElementRef;
   search=false;
   toggle=false;
   toggleDrop=false;
	 recipes=[];

	 constructor(private recSvc:RecipeService,private serverSvc:ServerService,private authSvc:AuthService,private router:Router,private renderer:Renderer2){}

	 onLogout(){
		 this.authSvc.logout();
		 this.router.navigateByUrl('/');
	 }

	 isAuthenticated(){
		 return this.authSvc.isAuthenticated();
	 }

	 onToggle(){this.toggle=!this.toggle;
     }

   onDropToggle(){
	   this.toggleDrop=!this.toggleDrop;
   }
 }
