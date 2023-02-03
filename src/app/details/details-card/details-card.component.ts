import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokemonType, resolveColor } from 'src/app/models/pokemon/pokemon-type';
import { capFirstCharacter } from 'src/app/utils/string.utils';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.css'],
})
export class DetailsCardComponent {
  @Input() pokemon?: Pokemon;

  public resolveTypeColor(type: PokemonType): string {
    return resolveColor(type);
  }

  public capFirst(str: string): string {
    return capFirstCharacter(str);
  }
}
