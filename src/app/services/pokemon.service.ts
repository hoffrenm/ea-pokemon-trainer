import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon/pokemon';
import {
  PokemonDetailsResponse,
  PokemonResponse,
  PokemonSpeciesResponse,
} from '../models/pokemon/pokemon-responses';
import { map } from 'rxjs';
import { PokemonAdapter } from '../models/pokemon/pokemon-adapter';
import { CacheExtras, PokemonCache } from '../models/pokemon/pokemon-cache';

// How many pokemons per fetch
const BATCH_SIZE = 50;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private cache: PokemonCache = new PokemonCache();
  private readonly _pageCount$ = new BehaviorSubject<number>(1);
  private readonly _pokemons$ = new BehaviorSubject<Pokemon[]>([]);
  private readonly _pokemonsByIds$ = new BehaviorSubject<Pokemon[]>([]);
  private readonly _withDetails$ = new BehaviorSubject<Pokemon | undefined>(
    undefined
  );

  constructor(private http: HttpClient) {}

  /** List of the pokemons on the most recently fetched page. */
  public get pokemons$(): Observable<Pokemon[]> {
    return this._pokemons$.asObservable();
  }

  /** List of the pokemons matching the last fetch by ids result. */
  public get pokemonsById$(): Observable<Pokemon[]> {
    return this._pokemonsByIds$.asObservable();
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
      const existing = this.cache.get(CacheExtras.Extra) ?? [];
      this.cache.set(CacheExtras.Extra, existing.concat(pokemons));
      this._pokemonsByIds$.next(local.concat(pokemons));
    });
  }

  /** Fetch single pokemon details and expose it via pokemonDetails$. Pass null to clear. */
  public fetchDetails(id: number | null) {
    if (id === null) {
      this._withDetails$.next(undefined);
      return;
    }

    const cached = this.cache
      .get(CacheExtras.Details)
      ?.find((it) => it.id == id);

    if (cached) {
      this._withDetails$.next(cached);
      return;
    }

    forkJoin({
      details: this.http.get<PokemonDetailsResponse>(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      ),
      species: this.http.get<PokemonSpeciesResponse>(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      ),
    }).subscribe(({ details, species }) => {
      const pokemon = PokemonAdapter.combineResponses(details, species);
      const ex = this.cache.get(CacheExtras.Details) ?? [];
      this.cache.set(CacheExtras.Details, ex.concat(pokemon));
      this._withDetails$.next(pokemon);
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
}
