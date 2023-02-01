import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.css'],
})
export class CataloguePageComponent implements OnDestroy {
  private readonly _service: PokemonService;
  public currentPage: number = 1;
  public pages: number[] = [1, 2, 3, 4, 5, 6, 7];
  public pokemons$: Subscription;
  public pageCount$: Subscription;
  public pokemons: Pokemon[] = [];

  constructor(private service: PokemonService) {
    this.service.fetchPokemons(1);
    this.pokemons$ = this.service.pokemons$.subscribe((val) => {
      this.pokemons = val;
    });
    this.pageCount$ = this.service.pageCount$.subscribe((count) => {
      this.pages = Array.from({ length: count }, (_, i) => i + 1);
    });
    this._service = service;
  }

  // Needs to be an arrow function to keep [this] reference
  onPageChanged = (page: number): void => {
    this.currentPage = page;
    this.service.fetchPokemons(page);
  };

  ngOnDestroy(): void {
    this.pokemons$.unsubscribe();
  }
}
