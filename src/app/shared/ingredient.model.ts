export class ingredient{
	constructor(public name:string,public amount:number,public _id:string,public belongsTo:string){	}
}
//same as
//export class ingredient{
//	public name:string;
//		public amount:string;
//
//	constructor(name:string,amount:string){
//		this.name=name;
//		this.amount=amount;
//	}
//}
