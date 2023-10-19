import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {


  constructor( private router:Router){

    this.login();
  }

  session:any;
  login(){

    this.session = localStorage.getItem("session")

    if(this.session){
      this.router.navigate(['/admin']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }



}
