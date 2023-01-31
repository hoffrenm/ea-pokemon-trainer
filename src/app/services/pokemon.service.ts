import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon/pokemon';
// import { PokemonResponse } from '../models/pokemon/pokemon-responses';
// import { map } from 'rxjs';
// import { PokemonAdapter } from '../models/pokemon/pokemon-adapter';

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
    this._pokemons$.next(fakePokemons);
    // this.http
    //   .get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
    //   .pipe(map(PokemonAdapter.transformResponse))
    //   .subscribe({
    //     next: (value: Pokemon[]) => {
    //       this._pokemons$.next(value);
    //     },
    //   });
  }
}

// to not spam the pokemon api
const fakePokemons: Pokemon[] = [
  {
    id: 1,
    name: 'bulbasaur',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    id: 2,
    name: 'ivysaur',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
  },
  {
    id: 3,
    name: 'venusaur',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
  },
  {
    id: 4,
    name: 'charmander',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  {
    id: 5,
    name: 'charmeleon',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
  },
  {
    id: 6,
    name: 'charizard',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  },
  {
    id: 7,
    name: 'squirtle',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  },
  {
    id: 8,
    name: 'wartortle',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
  },
  {
    id: 9,
    name: 'blastoise',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
  },
  {
    id: 10,
    name: 'caterpie',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png',
  },
];
