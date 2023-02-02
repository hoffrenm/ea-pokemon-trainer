import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon2Service } from './pokemon2.service';
import { TrainerService } from './trainer.service';
import { Pokemon } from '../models/pokemon';
import { Trainer } from '../models/trainer.model';
import { Observable, tap } from 'rxjs';

const url = 'https://noroff-api-production-70b3.up.railway.app/trainers'

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private http: HttpClient,
    private readonly pokemonService: Pokemon2Service,
    private readonly trainerService: TrainerService
  ) { }

  public updateCollection(pokemonName: string): Observable<Trainer> {
    if (!this.trainerService.trainer) {
      throw new Error("addToCollection: There is no trainer")
    }
    const trainer: Trainer = this.trainerService.trainer;

    const pokemon: Pokemon | undefined = this.pokemonService.pokemonByName(pokemonName);

    if (!pokemon) {
      throw new Error("addToCollection: No pokemon with name: " + pokemonName)
    }

    if (this.trainerService.inCollection(pokemonName)) {
      this.trainerService.removeFromCollection(pokemonName)
    } else {
      this.trainerService.addToCollection(pokemonName)
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "x-api-key": "KLz98453JKLF90KJ8yffj"
    })

    const newUrl = url + "/" + trainer.id

    return this.http.patch<Trainer>(newUrl, {
      pokemon: [...trainer.pokemon]
    }, { headers })
      .pipe(
        tap((updatedTrainer: Trainer) => {
          this.trainerService.trainer = updatedTrainer
        })
      )
  }
}
