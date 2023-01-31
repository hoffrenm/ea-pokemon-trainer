import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.css'],
})
export class CatalogueListComponent {
  constructor(private service: PokemonService) {
    // this.service.fetchPokemons();
    // this.service.pokemons.subscribe((val) => {
    //   console.log('Pokemons: ', val);
    // });
  }
}
