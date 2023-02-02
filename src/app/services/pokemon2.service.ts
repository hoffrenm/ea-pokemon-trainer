import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  finalize,
  BehaviorSubject,
  Observable,
  map,
  concatMap,
  Subscription,
} from 'rxjs';
import { Pokemon } from '../models/pokemon/pokemon';

@Injectable({
  providedIn: 'root',
})
export class Pokemon2Service {
  private readonly _pokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<
    Pokemon[]
  >([]);
  private _pokemons: Pokemon[] = [];
  private _error: string = '';
  private _loading: boolean = false;

  // get pokemons$(): Observable<Pokemon[]> {
  //   return this._pokemons$
  // }

  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) {}

  public fetchPokemons(): void {
    //   if (this.loading) {
    //     return
    //   }

    this._loading = true;
    this.http
      .get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=100')
      .pipe(
        map((pokemonResponse: PokemonResponse) => {
          console.log(pokemonResponse);
          return pokemonResponse.results;
        }),
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemons: Pokemon[]) => {
          this._pokemons$.next(pokemons);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      });
  }

  public fetchAllPokemons(): void {
    if (this.loading) {
      return;
    }

    this._loading = true;
    this.http
      .get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=25')
      .pipe(
        map((pokemonResponse: PokemonResponse) => {
          return pokemonResponse.results;
        }),
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemons: Pokemon[]) => {
          this._pokemons = pokemons;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      });
  }

  public get pokemons$(): Observable<Pokemon[]> {
    return this._pokemons$.asObservable();
  }

  // public pokemonByName(name: string): Pokemon | undefined {
  public pokemonByName(name: string): Pokemon | undefined {
    for (let i = 0; i < this._pokemons.length; i++) {
      if (this._pokemons[i].name === name) {
        return this._pokemons[i];
      }
    }
    return undefined;

    // if (this._pokemons[0].name === name) {
    //   console.log("true")
    //   return this._pokemons[0]
    // }

    // return this._pokemons.find((pokemon: Pokemon) => {
    //   pokemon.name == name
    // })

    // this.pokemons$.subscribe({
    //   next: (response: Pokemon[]) => {
    //     response.map((e) => console.log(e))
    //   }
    // })

    // this.pokemons$.subscribe(
    //   (val) => { z = val }
    // )

    // this._pokemons$.forEach((e) => {
    //   if (e.find((pokemon: Pokemon) => pokemon.name === name) !== undefined)
    //     x = e.find((pokemon: Pokemon) => pokemon.name === name)
    //   return x
    // })
  }
}

interface PokemonResponse {
  results: Pokemon[];
}
