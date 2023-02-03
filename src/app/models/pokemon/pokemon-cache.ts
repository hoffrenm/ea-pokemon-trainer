import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { StorageUtils } from 'src/app/utils/storage.utils';
import { Pokemon } from './pokemon';

// 'pages' to save non paged pokemons
export enum CacheExtras {
  Details = -1, // Save pokemons with all the fields fetched
  Extra = -2, // Save pokemons with only name & id
}

/**
 * Cache pokemons in pages to session storage.
 */
export class PokemonCache {
  private pageCount = 1;
  private pokemons = new Map<number, Pokemon[]>();

  constructor() {
    this.load();
  }

  public get(page: number): Pokemon[] | undefined {
    return this.pokemons.get(page);
  }

  public set(page: number, value: Pokemon[]): void {
    this.pokemons.set(page, value);
    this.updateSaved();
  }

  public has(page: number): boolean {
    return this.get(page) !== undefined;
  }

  public all(): Pokemon[] {
    return [...this.pokemons.values()].flat();
  }

  public setPageCount(count: number): void {
    this.pageCount = count;
    StorageUtils.storageSave(StorageKeys.PokemonCount, count);
  }

  public getPageCount(): number {
    return this.pageCount;
  }

  private load(): void {
    const count = StorageUtils.storageRead<number>(StorageKeys.PokemonCount);
    const pages = StorageUtils.storageRead<string>(StorageKeys.PokemonList);

    this.pageCount = count ?? 1;

    if (pages) {
      this.pokemons = new Map(JSON.parse(pages));
      return;
    }
    this.pokemons = new Map();
  }

  private updateSaved(): void {
    const json = JSON.stringify([...this.pokemons.entries()]);
    StorageUtils.storageSave(StorageKeys.PokemonList, json);
  }
}
