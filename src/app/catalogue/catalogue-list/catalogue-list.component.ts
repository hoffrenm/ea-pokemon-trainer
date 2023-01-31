import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.css'],
})
export class CatalogueListComponent implements OnDestroy {
  public pokemons$: Subscription;
  public pokemons: Pokemon[] = [];

  constructor(private service: PokemonService) {
    // todo move to parent
    this.service.fetchPokemons();
    this.pokemons$ = this.service.pokemons$.subscribe((val) => {
      this.pokemons = val;
    });
  }

  ngOnDestroy(): void {
    this.pokemons$.unsubscribe();
  }
}
