import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.baseUrl + 'users');
  }

  getUser(username: string) {
    return this.http.get(this.baseUrl + 'users/' + username);
  }

  createPost(caption: string, picture: File) {
    const formData = new FormData();
    formData.append('Caption', caption);
    formData.append('Photo', picture);
    return this.http.post(this.baseUrl + 'users/create-post', formData);
  }
}
