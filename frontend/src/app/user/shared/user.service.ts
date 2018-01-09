import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RegistrationUser } from './registration-user.model';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../app.config';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../core/auth/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  
@Injectable()
export class UserService {

  private registrationUrl = 'api/registration';

  constructor(private http: HttpClient) { }

  register(user: RegistrationUser): Observable<User> {
    const url = AppConfig.baseUrl + this.registrationUrl;
    return this.http.post<User>(url, user, httpOptions).pipe(
      tap(user => console.log(user)),
      catchError(err => {
        console.log(err);
        return Observable.throw(new Error(err.error));
      })
    );
  }

  getHome() {
    const url = AppConfig.baseUrl + 'api/hello';
    return this.http.get(url).pipe(
      tap(user => console.log(user))
    );
  }

}