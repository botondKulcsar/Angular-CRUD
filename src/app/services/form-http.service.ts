import { Observable } from 'rxjs';
import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormHttpService {

  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  saveUser(user: User):Observable<any> {
    return this.http.post<any>(this.BASE_URL + '/users', user);
  }

  getUsers():Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/users')
  }

  updateUser(user: User, id: number):Observable<any> {
    return this.http.put<any>(this.BASE_URL + '/users/' + id, user);
  }

  deleteUser(id:number):Observable<any> {
    return this.http.delete<any>(this.BASE_URL + '/users/' + id);
  }


}
