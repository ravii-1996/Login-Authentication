import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';


//For wild character we can use page not found component
// we can also use lazy loading if we have multiples routes or modules to make it feasible.
const routes: Routes = [
  { path: '', component:  RegisterComponent},
  // we provide canactive auth guard only authorized person acn access.
  { path: 'welcome', canActivate: [AuthGuard], component : MainComponent},
  { path: 'login', component:  LoginComponent},
  { path: '**' , component:  RegisterComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [LoginComponent, AppComponent, MainComponent, RegisterComponent];

