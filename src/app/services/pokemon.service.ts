import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly _pokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<
    Pokemon[]
  >([]);

  constructor(private http: HttpClient) {}

  public get pokemons(): Observable<Pokemon[]> {
    return this._pokemons$.asObservable();
  }

  public fetchPokemons(): void {
    this.http
      .get<Pokemon[]>('https://pokeapi.co/api/v2/pokemon?limit=10')
      .subscribe({
        next: (value) => {
          this._pokemons$.next(value)
        }
      });
  }
}
