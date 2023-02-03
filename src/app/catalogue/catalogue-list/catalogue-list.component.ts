import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';

@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.css'],
})
export class CatalogueListComponent {
  @Input() public pokemons: Pokemon[] = [];
}
