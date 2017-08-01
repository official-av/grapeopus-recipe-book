import { Component,OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	ngOnInit(){
		
firebase.initializeApp({apiKey: "AIzaSyCPJoLLk0e67tilutPMTk-kylyCo4ER3yU",
    authDomain: "av-recipe-book.firebaseapp.com"});
	}
}
