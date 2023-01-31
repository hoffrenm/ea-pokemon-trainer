import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon/pokemon';
import { PokemonResponse } from '../models/pokemon/pokemon-responses';
import { map } from 'rxjs';
import { PokemonAdapter } from '../models/pokemon/pokemon-adapter';

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
      .get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
      .pipe(map(PokemonAdapter.transformResponse))
      .subscribe({
        next: (value: Pokemon[]) => {
          this._pokemons$.next(value);
        },
      });
  }
}
