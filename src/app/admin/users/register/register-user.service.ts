import { HttpClient } from '@angular/common/http';
import { GenericHttp } from 'src/app/http-core/generic-http.model';
import { Injectable } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService extends GenericHttp {

  constructor(public http: HttpClient) {
    super(http);
  }

  updateUser(user) {
    return this.put(`${environment.API}/users/${user.Id}&delay=2`, user);
  }

  getSingleUser(Id) {
    return this.get(`${environment.API}/users/${Id}`);
  }
}
