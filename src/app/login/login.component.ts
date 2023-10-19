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
  users: any[] = [
    {
      id:1,
      name:'David',
      username:'david',
      password:'abc',
    },
    {
      id:2,
      name:'XYZ',
      username:'zyz',
      password:'abc',
    }
  ]

  form:FormGroup = this.fb.group({
    username:['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private authService: AuthService, private fb:FormBuilder, private router:Router){

  }
  login(){
    let user = this.loginService(this.form.value.username,this.form.value.password);

       if(!user){
        alert("Invalid username or password")
       }else{
        this.router.navigateByUrl("/admin")
       }
  }


  loginService(username:string, password:string){
    let user = this.users.find((u)=>u.username==username && u.password === password)
    if(user){
      this.session = user;
      localStorage.setItem("session", JSON.stringify(this.session))
    }

    return user;
  }

  onLogin(){

    console.log(this.form.value)

    this.authService.login(this.form.value.username,this.form.value.password)

  }
}
