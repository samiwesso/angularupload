import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  _apiurl: string = "http://localhost:3001/api";

  constructor(private http: HttpClient) { }

  public login(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/login`, userInfo);
  }
  getAll() {
    return this.http.get<User[]>(`${this._apiurl}/users/all`,{
        headers:{
            'authorization': 'bearer ' + localStorage.getItem('ACCESS_TOKEN')
        }
    });
}

getById(_id: number) {
    return this.http.get(`${this._apiurl}/users/${_id}`);
}

 register(_id: User) {
    return this.http.post(`${this._apiurl}/users/register`, _id);
  }
  update(user: User) {
    console.log(user)
    return this.http.patch(`${this._apiurl}/users/${localStorage.getItem("USER_ID")}`, user,{
      headers:{
          'authorization': 'bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }});
}
delete(_id: number) {
  return this.http.delete(`${this._apiurl}/users/${_id}`,{
      headers:{
          'authorization': 'bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }});
}

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('USER_EMAIL');
    localStorage.removeItem('CURRENT_USER')
  }


}

export interface User {
  _id: string;
  firstname: string;
  mellanname: string;
  lastname: string;
  birthday: string;
  addresslinefaktura: string;
  invoicecity: string;
  postnumber: string;
  invoicecountry: string;
  addressline: string;
  zipcode: string;
  city: string;
  email: string;
  password: string;
}
