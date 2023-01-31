import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';

@Component({
  selector: 'app-catalogue-list-item',
  templateUrl: './catalogue-list-item.component.html',
  styleUrls: ['./catalogue-list-item.component.css'],
})
export class CatalogueListItemComponent {
  @Input() pokemon?: Pokemon;
}
