import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerURLService } from "./server-url.service";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {User} from 'src/app/model/user.model'
export interface Email{
  userEmail:string;
}

export interface loginDetails  {

  userEmail: string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  theme:string;
  private userEmail:string;
  private firstName: string;
  private secondName: string;
  private userSites: Array<string>;

  private tokenTimer : any;
  private isAuthenticated= false;
  private token:string ="";
  private authStatusListener = new Subject<boolean>();
errorMessage: string;
error:boolean = false;

  session:any;


constructor(private http: HttpClient, private router: Router, private su: ServerURLService) {}


getTheme(){
  return this.theme
}

getFirstName(){
  return this.firstName;
}
getUserEmail(){
  return this.userEmail;
}

getSecondName(){
  return this.secondName;
}

getUserSites(){
  return this.userSites;
}

getIsAuth(){
  return this.isAuthenticated;
 }

 getToken(){
   return this.token;

 }

 getAuthStatusListener() {
  return this.authStatusListener.asObservable();
}

login(UserEmail:string, Password:string){
  const loginDetails: loginDetails = {userEmail:UserEmail, password:Password}

  console.log(this.su.serverURL)
  this.http.post<{theme:string,token:string, expiresIn: number, userSites:string[], firstName:string, secondName:string, userEmail:string}>(this.su.serverURL+ "/login",loginDetails).subscribe(response=>{
    var data = response;

    const token =response.token;

    this.token = token;

    console.log(this.token)
    if(token){
      const expiresInDuration = response.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated=true;
      this.theme= response.theme;

      this.firstName=response.firstName;
      this.secondName=response.secondName;
      this.userSites=response.userSites;
      this.userEmail=response.userEmail;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date (now.getTime() + expiresInDuration*1000);


      this.saveAuthData(token,expirationDate,this.userSites, this.firstName,this.secondName,this.userEmail, this.theme)

      this.session = true;;
      sessionStorage.setItem("session", JSON.stringify(this.session))
      this.router.navigate(['/admin']);
    }
  })



}


private saveAuthData(token:string, expirationDate: Date, userSites: Array<string>, firstName:string, secondName:string, userEmail:string, theme:string){
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("expiration", expirationDate.toISOString());
  sessionStorage.setItem("firstName", firstName);

  sessionStorage.setItem("theme", theme);
  sessionStorage.setItem("secondName", secondName);
  sessionStorage.setItem("userSites", JSON.stringify(userSites));
  sessionStorage.setItem("userEmail", userEmail);
}

autoAuthUser(){
  const authInformation = this.getAuthData();
  if(!authInformation){
    return;
  }
 const now = new Date();
 const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
 if(expiresIn>0){
 this.token = authInformation.token;
 this.isAuthenticated=true;
 this.theme = authInformation.theme;
 this.userSites = authInformation.userSites;
 this.firstName = authInformation.firstName;
 this.secondName = authInformation.secondName;
 this.userEmail = authInformation.userEmail;
 this.setAuthTimer(expiresIn/1000);
 this.authStatusListener.next(true);

 }

 }

private setAuthTimer(duration: number){
  this.tokenTimer = setTimeout(()=>{

   this.logout();
  },duration * 1000) ;
}


logout(){


  this.token = "";
  this.isAuthenticated = false;
  this.authStatusListener.next(false);
  clearTimeout(this.tokenTimer);
  this.clearAuthData();
  this.userSites = [];
  this.firstName='';
  this.secondName='';
  this.router.navigate(['/login']);
  }

  private clearAuthData(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expiration");
    sessionStorage.removeItem("userSites");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("secondName");
    sessionStorage.removeItem("userEmail")
   sessionStorage.removeItem("mode")
   sessionStorage.removeItem("theme")
   sessionStorage.removeItem("session");

  }

private getAuthData(){
  const theme = sessionStorage.getItem("theme")!;
  const token = sessionStorage.getItem("token");
  const expirationDate = sessionStorage.getItem("expiration");
  const firstName = sessionStorage.getItem("firstName")!;
  const secondName = sessionStorage.getItem("secondName")!;
  const userSites = JSON.parse(sessionStorage.getItem("userSites")!);
const userEmail = (sessionStorage.getItem("userEmail")!);

  if(!token || !expirationDate ){
return;
  }
  return{
    theme: theme,
    token: token,
    expirationDate: new Date(expirationDate),
    userSites: userSites,
    firstName: firstName,
    secondName: secondName,
    userEmail: userEmail,

  }

}
}


