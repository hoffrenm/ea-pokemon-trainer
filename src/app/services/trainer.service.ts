import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtils } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private _trainer?: Trainer;

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtils.storageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor() {
    this._trainer = StorageUtils.storageRead<Trainer>(StorageKeys.Trainer);
  }

  public inCollection(pokemonName: string): boolean {
    if (this._trainer) {
      return Boolean(
        this.trainer?.pokemon.find((name: string) => name.toLowerCase() === pokemonName.toLowerCase())
      );
    }
    return false;
  }

  public addToCollection(pokemonName: string): void {
    if (this._trainer) {
      this._trainer.pokemon.push(pokemonName);
    }
  }

  public removeFromCollection(pokemonName: string): void {
    if (this._trainer) {
      this._trainer.pokemon = this._trainer.pokemon.filter(
        (name: string) => name.toLowerCase() !== pokemonName.toLowerCase()
      );
    }
  }
}
