
import { Component, OnInit } from '@angular/core';
import { LookupService } from '../lookup.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public userDetails=[];
  hide: boolean=false;
  constructor(private lookupService: LookupService) { }
  tempUser={
    email:""
  };
  setUserDetail(user){
    this.tempUser=user;
    this.hide=true;
  }

  private ROLE ={
    ADMIN: "admin",
    USER : "user"
  }



  // Flag check to hide actions
  // if any one has user role then they cant see the delete option
  isUserAdmin(){
    return this.ROLE.ADMIN===localStorage.getItem('role');
  }

  // delete User api call
  deleteUser(user){
    this.lookupService.deleteUser(user).subscribe((arg :any)=> {
      alert(arg.msg);
      window.location.reload();
    });
  }

  // when the componenet load fetch the user data and store into userDetails variable. Which is using in dropdown to render the user name.
  ngOnInit(): void {
    console.log("21231");
    this.lookupService.getUser().subscribe((data: any) => {
      this.userDetails=data;
    },
    error=>{
      console.log(error);
    });
  }

}
