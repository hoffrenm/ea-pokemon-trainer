import { Pokemon } from './pokemon';

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
export interface PokemonDetailsResponse {}
