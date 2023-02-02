import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, of, tap } from 'rxjs';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.utils';

const url = 'https://noroff-api-production-70b3.up.railway.app/trainers'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  public login(username: string): Observable<Trainer> {
    return this.checkUsername(username)
      .pipe(
        switchMap((trainer: Trainer | undefined) => {
          if (trainer === undefined) {
            return this.createUser(username);
          }
          return of(trainer);
        }),
        tap((trainer: Trainer) => {
          StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer)
        })
      )

  }

  private checkUsername(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${url}?username=${username}`)
      .pipe(
        map((response: Trainer[]) => response.pop())
      )
  }

  private createUser(username: string): Observable<Trainer> {
    const trainer = {
      username,
      pokemon: []
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": "KLz98453JKLF90KJ8yffj"
    });

    return this.http.post<Trainer>(url, trainer, {
      headers
    })
  }
}

