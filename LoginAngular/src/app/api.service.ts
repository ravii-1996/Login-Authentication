import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private baseurl: string = "http://localhost:4000";

  getUser() : Observable<any>{
    return this.http.get<any>(this.baseurl + "/api/getUser");
  }

  registerUser(registerUserData){
    console.log(registerUserData);
    return this.http.post(this.baseurl + "/api/register",registerUserData);
  }

  loginUser(loginUserData){
    return this.http.post(this.baseurl + "/api/login",loginUserData);
  }

  deleteUser(user){
    return this.http.post(this.baseurl + "/api/delete", user);
  }
}
