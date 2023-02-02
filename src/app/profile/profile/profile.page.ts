import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { Trainer } from 'src/app/models/trainer.model';
import { CollectionService } from 'src/app/services/collection.service';
import { Pokemon2Service } from 'src/app/services/pokemon2.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit {
  //public pokemons: Pokemon[] = []

  trainerCollection: Pokemon[] = []
  collectionPokemon?: Pokemon;

  // get pokemons$(): Observable<Pokemon[]> {
  //   return this.pokemonService2.pokemons$
  // }

  public handleCollectionUpdate() {

  }

  get pokemons(): Pokemon[] {
    return this.pokemonService2.pokemons
  }

  get error(): string {
    return this.pokemonService2.error
  }

  get loading(): boolean {
    return this.pokemonService2.loading
  }

  get trainer(): Trainer | undefined {
    return this.trainerService.trainer
  }

  get username(): string | undefined {
    return this.trainerService.trainer?.username
  }

  get collection(): string[] {
    if (this.trainerService.trainer) {
      return this.trainerService.trainer.pokemon
    } return []
  }

  public get pokemons$(): Observable<Pokemon[]> {
    return this.pokemonService2.pokemons$
  }

  get trainersCollection(): Pokemon[] {
    this.pokemonService2.pokemons$.subscribe((e) => {
      //this.pokemons = e
    })
    const _this = this
    this.pokemons$.subscribe({
      next: (response: Pokemon[]) => {
        console.log(response)
        response.map((e) => {
          _this.pokemons.push(e)
        })
      }
    })

    //this.pokemonService2.fetchPokemonByName("bulbasaur")
    this.pokemonService2.fetchAllPokemons()

    console.log(this.pokemons)

    let x: Pokemon | undefined
    this.collection.map((pokemon) => {
      x = this.pokemons.find((entry: Pokemon) => pokemon === entry.name)

      if (x !== undefined) this.trainerCollection.push(x)

      //console.log(console.log(this.pokemonService2.pokemonByName(pokemon)))
      // if (this.pokemonService2.pokemonByName(pokemon) !== undefined) {
      // console.log(this.pokemonService2.pokemonByName(pokemon))
      // this.collectionPokemon = this.pokemonService2.pokemonByName(pokemon)
      // if (this.collectionPokemon !== undefined && this.trainerCollection.some(e => e.name === pokemon)) this.trainerCollection.push(this.collectionPokemon)
    }
    )
    return this.trainerCollection
  }


  constructor(
    private readonly pokemonService2: Pokemon2Service,
    private readonly trainerService: TrainerService,
    private readonly collectionService: CollectionService
  ) {
    //console.log(this.pokemonService2.pokemonByName("onyx"))
    //this.collectionService.addToCollection("squirtle")

    // this.collectionService.updateCollection("bulbasaur").subscribe({
    //   next: (response: any) => {
    //     console.log("NEXT", response)

    //   }, error: (error: HttpErrorResponse) => {
    //     console.log("ERROR", error.message)
    //   }
    // })

  }

  ngOnInit(): void {
    this.pokemonService2.fetchAllPokemons()
    //this.pokemonService2.fetchPokemons();
    this.trainersCollection
  }

}
