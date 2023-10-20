import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
//import { AuthService } from 'src/app/auth.service';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  session:any;


  form:FormGroup = this.fb.group({
    username:['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private authService: AuthService, private fb:FormBuilder, private router:Router){

  }




  onLogin(){

    console.log(this.form.value)

    this.authService.login(this.form.value.username,this.form.value.password)

  }
}
