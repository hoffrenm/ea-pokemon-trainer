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
import { PokemonCache } from '../models/pokemon/pokemon-cache';

// How many pokemons per fetch
const BATCH_SIZE = 50;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly detailsPageNum = -1;
  private cache: PokemonCache = new PokemonCache();
  private readonly _pageCount$ = new BehaviorSubject<number>(1);
  private readonly _pokemons$ = new BehaviorSubject<Pokemon[]>([]);
  private readonly _pokemonsByIds$ = new BehaviorSubject<Pokemon[]>([]);
  private readonly _pokemonsByNames$ = new BehaviorSubject<Pokemon[]>([]);
  private readonly _withDetails$ = new BehaviorSubject<Pokemon | undefined>(
    undefined
  );

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
  /** Last pokemon fetched via fetchDetails() */
  public get pokemonDetails$(): Observable<Pokemon | undefined> {
    return this._withDetails$.asObservable();
  }

  /** Total available page count of pokemons. */
  public get pageCount$(): Observable<number> {
    return this._pageCount$;
  }

  public fetchPokemons(page: number): void {
    if (this.cache.has(page)) {
      const pokemons = this.cache.get(page)!!;
      this._pokemons$.next(pokemons);
      this._pageCount$.next(this.cache.getPageCount());
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
    const fetchIds: Set<number> = new Set(ids);
    const cached = this.cache.all();
    const local = cached.filter((it) => {
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
      const existing = this.cache.get(this.detailsPageNum) ?? [];
      this.cache.set(this.detailsPageNum, existing.concat(pokemons));
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
    const cached = this.cache.all();
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
  /** Fetch single pokemon details and expose it via pokemonDetails$. Pass null to clear. */
  public fetchDetails(id: number | null) {
    if (id === null) {
      this._withDetails$.next(undefined);
      return;
    }

    // If page -1 contains the pokemon, use that since it has been fetched with the detail query.
    const cached = this.cache.get(-1)?.find((it) => it.id === id);
    if (cached) {
      this._withDetails$.next(cached);
      return;
    }

    this.http
      .get<PokemonDetailsResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(map(PokemonAdapter.transformDetailsResponse))
      .subscribe((it) => {
        const ex = this.cache.get(this.detailsPageNum) ?? [];
        this.cache.set(this.detailsPageNum, ex.concat(it));
        this._withDetails$.next(it);
      });
  }

  private updatePageCount = (response: PokemonResponse): PokemonResponse => {
    if (this._pageCount$.value === 1) {
      const count = Math.ceil(response.count / BATCH_SIZE);
      this._pageCount$.next(count);
      this.cache.setPageCount(count);
    }
    return response;
  };

  //Function for finding pokemon with parameter name from cache
  public pokemonByName(name: string): Pokemon | undefined {
    const cached = this.cache.all();
    if (cached.flat().find((e) => e.name.toLowerCase() === name.toLowerCase()) !== undefined) {
      return cached.flat().find((e) => e.name.toLowerCase() === name.toLowerCase())
    }
    return undefined
  }
}
