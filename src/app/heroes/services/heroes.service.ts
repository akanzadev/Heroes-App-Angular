import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Heroe } from '../interfaces/heroe';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>('http://localhost:3000/heroes').pipe(
      catchError((err) => {
        if (err.status === HttpStatusCode.NotFound) {
          throwError(() => new Error("Can't find heroes"));
        }
        return throwError(() => new Error('Error server'));
      })
    );
  }
}
