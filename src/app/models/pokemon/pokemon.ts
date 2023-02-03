import { PokemonStat } from './pokemon-stat';
import { PokemonType } from './pokemon-type';

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types?: PokemonType[];
  stats?: PokemonStat[];
  flavorTexts?: string[];
}
