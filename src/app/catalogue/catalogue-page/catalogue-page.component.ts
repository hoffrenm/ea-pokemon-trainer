import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { CollectionService } from 'src/app/services/collection.service';
import { PagerService } from 'src/app/services/pager.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.css'],
})
export class CataloguePageComponent implements OnDestroy {
  private subs: Subscription[];
  public pokemons: Pokemon[] = [];
  public currentPage: number = 1;
  public pages: number[] = [];

  constructor(
    private service: PokemonService,
    private pagerService: PagerService
  ) {
    this.subs = [
      this.service.pageCount$.subscribe((it) => {
        pagerService.registerPageCount(it);
      }),
      this.pagerService.displayedPages$.subscribe((it) => {
        this.pages = it;
      }),
      this.pagerService.currentPage$.subscribe((it) => {
        this.currentPage = it;
        this.service.fetchPokemons(it);
      }),
      this.service.pokemons$.subscribe((it) => {
        this.pokemons = it;
      }),
    ];
  }

  public onPageChanged(page: number): void {
    this.pagerService.onPageChange(page);
  }

  ngOnDestroy(): void {
    this.subs.forEach((it) => it.unsubscribe());
  }
}
