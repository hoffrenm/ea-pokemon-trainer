import { POKEMON_SPRITE_BASE_URL } from 'src/app/values/url';
import { Pokemon } from './pokemon';
import { PokemonResponse } from './pokemon-responses';

/**
 * Class containing the methods to transform
 * the pokemon server responses into Pokemon objects.
 * @see Pokemon
 */
export class PokemonAdapter {
  static transformResponse(response: PokemonResponse): Pokemon[] {
    return response.results.map(PokemonAdapter.buildPokemon);
  }

  private static buildPokemon(obj: { name: string; url: string }): Pokemon {
    const id = Number(obj.url.split('pokemon')[1].replace(RegExp(/\//gi), ''));
    return {
      id,
      name: obj.name,
      imageUrl: `${POKEMON_SPRITE_BASE_URL}/${id}.png`,
    };
  }
}
