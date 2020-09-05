import { Component, OnInit } from '@angular/core';
import { LookupService } from '../lookup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private lookupService : LookupService,  private _router: Router) { }

  registerUserData = {
    email: "",
    password :""
  };

  ngOnInit(): void {
  }

  /**
   * Sending User Details to backend for verification . Is user exist or not. If it not exist create a user profile
   * we store the role and token in local strogre coming from backend
   * Role to ensure that end-user is admin or basic user (this help to hide the actions)
   * token to ensure autorized person
   */
  registerUser() {
    this.lookupService.registerUser(this.registerUserData)
    .subscribe((res:any) => {
      localStorage.setItem('token',res.token);
        localStorage.setItem('role',res.role);
        this._router.navigate(['/welcome']);
    },
    error => {
      alert("User Already register");
    });
  }

}
