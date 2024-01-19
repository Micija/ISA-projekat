import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import AuthenticatedUser from '../payload/responses/authenticated-user';
import RegisterRequest from '../payload/requests/regiser.request';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(environment.backendBaseUrl + 'Account/Login', {
      username,
      password
    }, httpOptions);
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(environment.backendBaseUrl + 'Account/Register', {
      ...request
    },
    {
      responseType: 'text'
    });
  }

  private getUserFromStorage(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public autoLogin(): void {
      const userFromStorage = this.getUserFromStorage();
      if (userFromStorage) {
        this.user$.next(userFromStorage);
      }
  }

  signOut(): void {
    window.sessionStorage.clear();
    this.user$.next(null);

    this.router.navigate(["/"]);
  }

  public getToken(): string | null {
    return this.user$.value?.token;
  }

  public saveUser(user: AuthenticatedUser): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

    this.user$.next(user);
  }

  public getUserObservable(): BehaviorSubject<AuthenticatedUser> {
    return this.user$;
  }

}
