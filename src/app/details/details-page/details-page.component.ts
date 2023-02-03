import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
})
export class DetailsPageComponent implements OnDestroy {
  public pokemons$: Subscription;
  public pokemon?: Pokemon;

  constructor(private route: ActivatedRoute, private service: PokemonService) {
    this.pokemons$ = service.pokemonsById$.subscribe((arr) => {
      if (arr.length !== 1) return;
      this.pokemon = arr.at(0);
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.service.fetchByIds([params['id']]);
    });
  }

  ngOnDestroy(): void {
    this.service.fetchByIds([]);
    this.pokemons$.unsubscribe();
  }
}
