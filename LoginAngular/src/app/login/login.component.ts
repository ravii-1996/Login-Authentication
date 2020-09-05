import { Component, OnInit } from '@angular/core';
import { LookupService } from '../lookup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private lookupService : LookupService,  private _router: Router) { }

  loginUserData = {
    email: "",
    password :""
  };

  ngOnInit(): void {
  }

  /**
   * Sending login details to backend for verification
   * If user verified then we store the role and token
   * Role to ensure that end-user is admin or basic user (this help to hide the actions)
   * token to ensure user is authorized or not.
   */
  loginUser() {
    this.lookupService.loginUser(this.loginUserData)
    .subscribe((res:any) => {
      localStorage.setItem('token',res.token);
        localStorage.setItem('role',res.role);
        this._router.navigate(['/welcome']);
    },
    error => {
      alert("Invalid Credentials");
    });
  }

}
