import { POKEMON_SPRITE_BASE_URL } from 'src/app/values/url';
import { Pokemon } from './pokemon';
import { PokemonDetailsResponse, PokemonResponse } from './pokemon-responses';

/**
 * Class containing the methods to transform
 * the pokemon server responses into Pokemon objects.
 * @see Pokemon
 */
export class PokemonAdapter {
  static transformResponse(response: PokemonResponse): Pokemon[] {
    return response.results.map(PokemonAdapter.buildPokemon);
  }

  static transformDetailsResponse(response: PokemonDetailsResponse): Pokemon {
    return {
      id: response.id,
      name: response.name.charAt(0).toUpperCase() + response.name.slice(1),
      imageUrl: `${POKEMON_SPRITE_BASE_URL}/${response.id}.png`,
      stats: response.stats,
    };
  }

  private static buildPokemon(obj: { name: string; url: string }): Pokemon {
    const id = Number(obj.url.split('pokemon')[1].replace(RegExp(/\//gi), ''));
    const name = obj.name.charAt(0).toUpperCase() + obj.name.slice(1);
    return {
      id,
      name,
      imageUrl: `${POKEMON_SPRITE_BASE_URL}/${id}.png`,
    };
  }
}
