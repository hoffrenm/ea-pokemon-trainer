import { Pokemon } from './pokemon';
import { PokemonStat } from './pokemon-stat';
import { PokemonType } from './pokemon-type';

/**
 * Server JSON Responses for the endpoints.
 * Used temporarily to transform the objects
 * into the easier-to-use Pokemon type.
 * @see Pokemon
 */

/**
 * /pokemon/
 */
export interface PokemonResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

/**
 * /pokemon/{id}
 */
export interface PokemonDetailsResponse {
  id: number;
  name: string;
  stats: PokemonStat[];
  types: PokemonType[];
}

/**
 * /pokemon-species/{id}
 */
export interface PokemonSpeciesResponse {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}

export interface PokemonTypeResponse {
  damage_relations: {
    double_damage_from: {
      name: string;
    }[];
  };
}
