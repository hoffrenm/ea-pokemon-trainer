import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { TrainerService } from './trainer.service';
import { Pokemon } from '../models/pokemon/pokemon';
import { Trainer } from '../models/trainer.model';
import { Observable, Subscription, tap } from 'rxjs';
import { PokemonService } from './pokemon.service';
import { environment } from 'src/environments/environment';

const { userApi, apiKey } = environment

//Service for trainer pokemon collection

@Injectable({
  providedIn: 'root',
})
export class CollectionService implements OnDestroy {

  public pokemons$: Subscription;

  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonService,
    private readonly trainerService: TrainerService
  ) {
    if (trainerService.trainer) this.pokemonService.fetchByNames(trainerService.trainer.pokemon)
    this.pokemons$ = this.pokemonService.pokemonsByNames$.subscribe((val) => {
      this.setCollection(val)
    })
  }
  ngOnDestroy(): void {
    this.pokemons$.unsubscribe
  }
  //Trainer pokemon collection
  private collection: Pokemon[] = []

  //Getter for trainer pokemon collection
  get trainerCollection(): Pokemon[] {
    return this.collection
  }

  //Setter for trainer pokemon collection
  public setCollection(list: Pokemon[]): void {
    this.collection = list
  }

  //Function for forming list of pokemon names
  private formPokemonStrings(): string[] {
    let list: string[] = []
    this.collection.map((e) => list.push(e.name))
    return list
  }

  //Function for update collection, (add or remove).
  public updateCollection(pokemonName: string): Observable<Trainer> {
    if (!this.trainerService.trainer) {
      throw new Error('addToCollection: There is no trainer');
    }
    let pokeName = pokemonName.toLowerCase()
    const trainer: Trainer = this.trainerService.trainer;

    const isPokemon: Pokemon | undefined = this.pokemonService.pokemonByName(pokemonName)

    if (isPokemon === undefined) {
      throw new Error('addToCollection: No pokemon with name: ' + pokeName);
    }

    let pokemonList: string[] = []
    let addablePokemon: Pokemon | undefined

    //If trainer has parameter pokemon remove it from the collection else add it to the collection 
    if (this.trainerService.inCollection(pokeName)) {
      let index = this.collection.findIndex(item => item.name.toLowerCase() === pokeName)
      if (index !== -1) {
        this.collection.splice(index, 1)
      }
      this.trainerService.removeFromCollection(pokemonName)
      pokemonList = this.formPokemonStrings()
    } else {
      addablePokemon = this.pokemonService.pokemonByName(pokemonName)
      if (addablePokemon !== undefined) this.collection.push(addablePokemon)
      pokemonList = this.trainerService.trainer.pokemon
      this.trainerService.addToCollection(pokeName);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    });

    //HTTP request
    return this.http
      .patch<Trainer>(
        `${userApi}/${trainer.id}`,
        {
          pokemon: [...pokemonList],
        },
        { headers }
      )
      .pipe(
        tap((updatedTrainer: Trainer) => {
          this.trainerService.trainer = updatedTrainer;
        })
      );
  }
}
