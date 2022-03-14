import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Auth } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = `${environment.API_URL}/users`;

  private user = new BehaviorSubject<Auth | null>(null);

  user$ = this.user.asObservable();

  constructor(private httpClient: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this.user.next(JSON.parse(user));
    }
  }

  login(): Observable<Auth> {
    return this.httpClient.get<Auth>(`${this.BASE_URL}/1`).pipe(
      tap((user) => {
        this.user.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
  }
}
