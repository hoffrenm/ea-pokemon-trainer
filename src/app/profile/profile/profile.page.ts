import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { Trainer } from 'src/app/models/trainer.model';
import { CollectionService } from 'src/app/services/collection.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon2Service } from 'src/app/services/pokemon2.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage implements OnInit, OnDestroy {

  public pokemons: Pokemon[] = []

  trainerCollection: Pokemon[] = [];
  collectionPokemon?: Pokemon;

  // get pokemons$(): Observable<Pokemon[]> {
  //   return this.pokemonService2.pokemons$
  // }

  public handleCollectionUpdate() { }

  // get pokemonss(): Pokemon[] {
  //   return this.pokemonService2.pokemons;
  // }

  // get error(): string {
  //   return this.pokemonService2.error;
  // }

  // get loading(): boolean {
  //   return this.pokemonService2.loading;
  // }

  get trainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  get username(): string | undefined {
    return this.trainerService.trainer?.username;
  }

  get collection(): string[] {
    if (this.trainerService.trainer) {
      return this.trainerService.trainer.pokemon;
    }
    return [];
  }

  get trainersCollection(): Pokemon[] {
    //console.log(this.collectionService.trainerCollection)
    return this.collectionService.trainerCollection
  }

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly trainerService: TrainerService,
    private readonly collectionService: CollectionService
  ) {
    pokemonService.fetchByNames(trainerService.trainer?.pokemon!)
    pokemonService.pokemonsByNames$.subscribe((it) => this.pokemons = it)

  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {

  }
}
