import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/assets/model/iuser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = environment.api;
  private currentUserSubject: BehaviorSubject<IUser | null>;
  public currentUser: Observable<IUser | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<IUser | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser | null {
    return this.currentUserSubject.value;
  }

  login(credentials: { email: string; password: string }): Observable<IUser> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      username: credentials.email,
      password: credentials.password,
      expiresInMins: 30,
    };

    return this.http
      .post<IUser>(`${this.baseUrl}/auth/login`, body, { headers })
      .pipe(
        map((user: IUser) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') || 'null'
    );
    return currentUser ? currentUser.token : null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}
