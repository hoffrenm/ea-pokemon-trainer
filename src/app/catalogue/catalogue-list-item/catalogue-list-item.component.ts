import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon/pokemon';

@Component({
  selector: 'app-catalogue-list-item',
  templateUrl: './catalogue-list-item.component.html',
  styleUrls: ['./catalogue-list-item.component.css'],
})
export class CatalogueListItemComponent {
  @Input() pokemon?: Pokemon;

  constructor(private router: Router) {}

  public onClick() {
    this.router.navigate(['/pokemon'], {
      queryParams: { id: this.pokemon?.id },
    });
  }
}
