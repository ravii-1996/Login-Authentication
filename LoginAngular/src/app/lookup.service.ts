import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  deleteUser(user: any) {
    return this.api.deleteUser(user);
  }
  getUser() {
    return this.api.getUser();
  }

  registerUser(registerUserData) {
    return this.api.registerUser(registerUserData);
  }

  constructor(private api : ApiService, private _router: Router ) { }
  // check for token exist or user logged in
  loggedIn() {
    return !!localStorage.getItem('token')
  }

  // check for token
  getToken(){
    return localStorage.getItem('token');
  }

  /**
   * when we logout we clean the local storage
   */
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('vote');
    this._router.navigate(['/'])
  }



  loginUser (loginUserData){
    return this.api.loginUser(loginUserData);
  }
}
