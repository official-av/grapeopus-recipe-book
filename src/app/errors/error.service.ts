import {EventEmitter} from "@angular/core";
import {Error} from "./error/error.model"
export class ErrorService{
  errorOccurred=new EventEmitter<Error>();
  handleError(error:any){
    const ErrorData=new Error(error.title,error.error.message);
    this.errorOccurred.emit(ErrorData);
  }
}
