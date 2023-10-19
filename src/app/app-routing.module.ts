import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './admin/auth.guard';
const routes: Routes = [
  {
    //This is how a module is lazy loaded
    path: '',
     loadChildren: ()=>import('./public/public.module').then((m) => m.PublicModule)},
  {
    path:'admin',
    loadChildren:() => import('./admin/admin.module').then((m) =>m.AdminModule),
    canActivate: [authGuard]
  },
  {
    path: "login",
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//Have a public and admin view
