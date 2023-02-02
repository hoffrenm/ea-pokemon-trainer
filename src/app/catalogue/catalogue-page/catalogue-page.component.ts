import { Component, OnDestroy } from '@angular/core';
import { last, Subscription } from 'rxjs';
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
  public allPages: number[] = [1, 2, 3, 4, 5, 6, 7];
  public displayedPageNumbers: number[] = [];
  public pokemons$: Subscription;
  public pageCount$: Subscription;
  public pokemons: Pokemon[] = [];

  constructor(private service: PokemonService) {
    this.service.fetchPokemons(1);
    this.pokemons$ = this.service.pokemons$.subscribe((val) => {
      this.pokemons = val;
    });
    this.pageCount$ = this.service.pageCount$.subscribe((count) => {
      this.allPages = Array.from({ length: count }, (_, i) => i + 1);
      this.calculatePages(this.currentPage);
    });
    this._service = service;
  }

  public onPageChanged(page: number): void {
    this.currentPage = page;
    this.service.fetchPokemons(page);
    this.calculatePages(page);
  }

  // Calculate displayed pages based on the provided page number
  private calculatePages(page: number) {
    const additionalPages = 2;
    const lastPage = this.allPages[this.allPages.length - 1];

    let before: number[] = [];
    let after: number[] = [];

    for (let i = 1; i <= additionalPages; i++) {
      before.push(page - i);
      after.push(page + i);
    }

    const fB = before.filter((it) => Math.sign(it) === 1);
    fB.sort();
    const fA = after.filter((it) => it < lastPage);

    const pagesToDisplay = new Set([1, ...fB, page, ...fA, lastPage]);
    this.displayedPageNumbers = [...pagesToDisplay];
  }

  ngOnDestroy(): void {
    this.pokemons$.unsubscribe();
  }
}
