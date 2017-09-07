import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import {ShortenPipe} from "./shorten.pipe";
import {ClickOutsideDirective} from "./clickOutside.directive";

@NgModule({
	declarations:[DropdownDirective,
    ClickOutsideDirective,
  ShortenPipe],
	exports:[
		DropdownDirective,
		CommonModule,
    ShortenPipe,
    ClickOutsideDirective
		]
})
export class SharedModule{

}
