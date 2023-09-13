import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ServerURLService {

public NUM:Number;
num:number;
data: any=[];
  public serverURL:any
  public wsURL:any
  public wsNMBMURL:any
  public guardURL:any;


constructor(private http: HttpClient){

  this.NUM = 0;

  if (this.NUM==0){
    this.serverURL = "http://localhost:3000";
    this.wsURL = "ws://localhost"
    this.wsNMBMURL = "ws://localhost"
    this.guardURL  = "hawkeye"  //localhost
 }
 else if (this.NUM==2){
   this.serverURL = "http://mac-creations.co.za:3000";
   this.wsNMBMURL ="172.105.70.85";
   this.wsURL= "ws://mac-creations.co.za";
   this.guardURL = "hawkeye";  //Cloud Server - hawkeye
 }
 else if(this.NUM == 3){

  this.serverURL = "http://139.144.176.232:3000";
  this.wsNMBMURL ="172.105.70.85";
  this.wsURL= "ws://mac-creations.co.za";
  this.guardURL = "hawkeye";  //Cloud Server - hawkeye

 }
}
}
