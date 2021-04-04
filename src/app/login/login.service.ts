import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // tslint:disable-next-line: variable-name
  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(email: string, password: string) {

    return this.http.post<any>(`${environment.API}/login`, { email, password })
      .pipe(map(user => {

        console.log(user);
        if (user.token !== undefined) {
          localStorage.setItem('token', user.token);
          this.router.navigate(['/admin']);
        }
        return user;
      }));
  }
}
