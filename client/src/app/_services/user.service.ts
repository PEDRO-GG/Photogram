import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.baseUrl + "users")
  }

  getUser(username: string) {
    return this.http.get(this.baseUrl + 'users/' + username);
  }
}
