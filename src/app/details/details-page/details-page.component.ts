import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
})
export class DetailsPageComponent implements OnDestroy {
  public pokemons$: Subscription;
  public pokemon?: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private service: PokemonService,
    private location: Location
  ) {
    this.pokemons$ = service.pokemonDetails$.subscribe((it) => {
      this.pokemon = it;
    });
  }

  public back() {
    this.location.back();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.service.fetchDetails(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.service.fetchDetails(null);
    this.pokemons$.unsubscribe();
  }
}
