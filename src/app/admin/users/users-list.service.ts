import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttp } from 'src/app/http-core/generic-http.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersListService extends GenericHttp {

  constructor(public http: HttpClient) {
    super(http);
  }

  // requisito do teste é passar o index da página, exemplo pagina 1, 2, 3
  getListUsers(IndexPage) {
    return this.get(`${environment.API}/users?page=${IndexPage}&delay=2`);
  }
}
