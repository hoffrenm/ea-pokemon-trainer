import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtils } from '../utils/storage.utils';

//Service for trainer data

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private _trainer?: Trainer;

  //Getter for trainer object
  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  //Setter for trainer object
  set trainer(trainer: Trainer | undefined) {
    StorageUtils.storageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor() {
    this._trainer = StorageUtils.storageRead<Trainer>(StorageKeys.Trainer);
  }

  //Function for checking if user has pokemon using parameter string
  public inCollection(pokemonName: string): boolean {
    if (this._trainer) {
      return Boolean(
        this.trainer?.pokemon.find((name: string) => name.toLowerCase() === pokemonName.toLowerCase())
      );
    }
    return false;
  }

  //Function for adding pokemon for trainer collection
  public addToCollection(pokemonName: string): void {
    if (this._trainer) {
      this._trainer.pokemon.push(pokemonName);
    }
  }

  //Function for removing pokemon from trainer collection
  public removeFromCollection(pokemonName: string): void {
    if (this._trainer) {
      this._trainer.pokemon = this._trainer.pokemon.filter(
        (name: string) => name.toLowerCase() !== pokemonName.toLowerCase()
      );
    }
  }
}
