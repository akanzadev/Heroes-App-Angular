import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Heroe, UpdateHeroeDTO, CreateHeroeDTO } from '../interfaces/heroe';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private BASE_URL = `${environment.API_URL}/heroes`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(this.BASE_URL).pipe(
      catchError((err) => {
        if (err.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error("Can't find heroes"));
        }
        return throwError(() => new Error('Error server'));
      })
    );
  }

  getHeroe(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.BASE_URL}/${id}`).pipe(
      catchError((err) => {
        if (err.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error("Can't find heroe"));
        }
        return throwError(() => new Error('Error server'));
      })
    );
  }

  create(heroe: CreateHeroeDTO): Observable<Heroe> {
    return this.http.post<Heroe>(this.BASE_URL, heroe).pipe(
      catchError((err) => {
        if (err.status === HttpStatusCode.BadRequest) {
          return throwError(() => new Error('Bad request'));
        }
        return throwError(() => new Error('Error server'));
      })
    );
  }

  update(heroe: UpdateHeroeDTO): Observable<Heroe> {
    return this.http.patch<Heroe>(`${this.BASE_URL}/${heroe.id}`, heroe).pipe(
      catchError((err) => {
        if (err.status === HttpStatusCode.BadRequest) {
          return throwError(() => new Error('Bad request'));
        }
        return throwError(() => new Error('Error server'));
      })
    );
  }

  delete(id: string): Observable<{}> {
    return this.http.delete<{}>(`${this.BASE_URL}/${id}`).pipe(
      catchError((err) => {
        if (err.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error("Can't find heroe"));
        }
        return throwError(() => new Error('Error server'));
      })
    );
  }
}
