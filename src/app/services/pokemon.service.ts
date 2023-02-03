import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon/pokemon';
import {
  PokemonDetailsResponse,
  PokemonResponse,
} from '../models/pokemon/pokemon-responses';
import { map } from 'rxjs';
import { PokemonAdapter } from '../models/pokemon/pokemon-adapter';

// How many pokemons per fetch
const BATCH_SIZE = 50;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private cache: Map<number, Pokemon[]> = new Map();
  private readonly _pageCount$ = new BehaviorSubject<number>(1);
  private readonly _pokemons$ = new BehaviorSubject<Pokemon[]>([]);
  private readonly _pokemonsByIds$ = new BehaviorSubject<Pokemon[]>([]);
  private readonly _pokemonsByNames$ = new BehaviorSubject<Pokemon[]>([]);

  constructor(private http: HttpClient) { }

  /** List of the pokemons on the most recently fetched page. */
  public get pokemons$(): Observable<Pokemon[]> {
    return this._pokemons$.asObservable();
  }

  /** List of the pokemons matching the last fetch by ids result. */
  public get pokemonsById$(): Observable<Pokemon[]> {
    return this._pokemonsByIds$.asObservable();
  }

  public get pokemonsByNames$(): Observable<Pokemon[]> {
    return this._pokemonsByNames$.asObservable();
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

  public fetchByIds(ids: number[]) {
    console.log('Fetch by ids called');
    const fetchIds: Set<number> = new Set(ids);
    const cached = [...this.cache.values()];
    const local = cached.flat().filter((it) => {
      if (ids.includes(it.id) && fetchIds.has(it.id)) {
        fetchIds.delete(it.id);
        return true;
      } else {
        return false;
      }
    });

    // All pokemon ids found in cache, skip requests
    if (fetchIds.size === 0 && cached.length !== 0) {
      this._pokemonsByIds$.next(local);
      return;
    }

    // Fetch the pokemons not found locally
    const requests: Observable<Pokemon>[] = [...fetchIds].map((it) => {
      return this.http
        .get<PokemonDetailsResponse>(`https://pokeapi.co/api/v2/pokemon/${it}`)
        .pipe(map(PokemonAdapter.transformDetailsResponse));
    });

    forkJoin(requests).subscribe((pokemons) => {
      // Save to page -1
      this.cache.set(-1, pokemons);
      this._pokemonsByIds$.next(local.concat(pokemons));
    });
  }


  public fetchByNames(names: string[]) {
    let temp: string[] = []
    for (let i = 0; i < names.length; i++) {
      temp.push(names[i].toLowerCase())
    }
    names = temp
    console.log('Fetch by names called');
    const fetchNames: Set<string> = new Set(names);
    const cached = [...this.cache.values()];
    const local = cached.flat().filter((it) => {
      if (names.includes(it.name) && fetchNames.has(it.name)) {
        fetchNames.delete(it.name);
        return true;
      } else {
        return false;
      }
    });

    // All pokemon names found in cache, skip requests
    if (fetchNames.size === 0 && cached.length !== 0) {
      this._pokemonsByNames$.next(local);
      return;
    }

    // Fetch the pokemons not found locally
    const requests: Observable<Pokemon>[] = [...fetchNames].map((it) => {
      return this.http
        .get<PokemonDetailsResponse>(`https://pokeapi.co/api/v2/pokemon/${it}`)
        .pipe(map(PokemonAdapter.transformDetailsResponse));
    });

    forkJoin(requests).subscribe((pokemons) => {
      // Save to page -1
      this.cache.set(-1, pokemons);
      this._pokemonsByNames$.next(local.concat(pokemons));
    });
  }

  private updatePageCount = (response: PokemonResponse): PokemonResponse => {
    if (this._pageCount$.value === 1) {
      this._pageCount$.next(response.count / BATCH_SIZE);
    }
    return response;
  };

  //Function for finding pokemon with parameter name from cache
  public pokemonByName(name: string): Pokemon | undefined {
    const cached = [...this.cache.values()];
    if (cached.flat().find((e) => e.name.toLowerCase() === name.toLowerCase()) !== undefined) {
      return cached.flat().find((e) => e.name.toLowerCase() === name.toLowerCase())
    }
    return undefined
  }
}
