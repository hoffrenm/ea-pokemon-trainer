import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon/pokemon';
import { PokemonResponse } from '../models/pokemon/pokemon-responses';
import { map } from 'rxjs';
import { PokemonAdapter } from '../models/pokemon/pokemon-adapter';

// How many pokemons per fetch
const BATCH_SIZE = 50;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private cache: Map<number, Pokemon[]> = new Map();
  private readonly _pageCount$: BehaviorSubject<number> =
    new BehaviorSubject<number>(1);
  private readonly _pokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<
    Pokemon[]
  >([]);

  constructor(private http: HttpClient) {}

  /** List of the pokemons on the most recently fetched page. */
  public get pokemons$(): Observable<Pokemon[]> {
    return this._pokemons$.asObservable();
  }

  /** Total available page count of pokemons. */
  public get pageCount$(): Observable<number> {
    return this._pageCount$;
  }

  public fetchPokemons(page: number): void {
    if (this.cache.has(page)) {
      const pokemons = this.cache.get(page)!!;
      this._pokemons$.next(pokemons);
      return;
    }

    const offset = (page - 1) * BATCH_SIZE;
    this.http
      .get<PokemonResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${BATCH_SIZE}`
      )
      .pipe(map(this.updatePageCount), map(PokemonAdapter.transformResponse))
      .subscribe({
        next: (value: Pokemon[]) => {
          this._pokemons$.next(value);
          this.cache.set(page, value);
        },
      });
  }

  public getByIds(ids: string[]): Observable<Pokemon[]> {
    throw new Error('Not implemented.');
  }

  private updatePageCount = (response: PokemonResponse): PokemonResponse => {
    if (this._pageCount$.value === 1) {
      this._pageCount$.next(response.count / BATCH_SIZE);
    }
    return response;
  };
}

// to not spam the pokemon api
const fakePokemons: Pokemon[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    id: 2,
    name: 'Ivysaur',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
  },
  {
    id: 3,
    name: 'Venusaur',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
  },
  {
    id: 4,
    name: 'Charmander',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  {
    id: 5,
    name: 'Charmeleon',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
  },
  {
    id: 6,
    name: 'Charizard',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  },
  {
    id: 7,
    name: 'Squirtle',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  },
  {
    id: 8,
    name: 'Wartortle',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
  },
  {
    id: 9,
    name: 'Blastoise',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
  },
  {
    id: 10,
    name: 'Caterpie',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png',
  },
];
