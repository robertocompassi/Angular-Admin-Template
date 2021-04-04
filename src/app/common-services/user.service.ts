import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;
  constructor() { }

  getSessionUser() {
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage !== undefined && userLocalStorage !== null ) {
      const tempUserInLocalStorage = JSON.parse(localStorage.getItem('user'));

      this.user = new User();
      this.user.Name = tempUserInLocalStorage.Name;
      this.user.ProfilePicture = tempUserInLocalStorage.ProfilePicture;
      this.user.Role = tempUserInLocalStorage.Role;
      this.user.Email = tempUserInLocalStorage.Email;

    }

    return this.user;
  }
}
