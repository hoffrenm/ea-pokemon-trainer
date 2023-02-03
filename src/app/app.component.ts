import { Component, OnInit } from '@angular/core';
import { Pokemon2Service } from './services/pokemon2.service';
import { TrainerService } from './services/trainer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ea-pokemon-trainer';

  constructor(
    private readonly trainerService: TrainerService,
    private readonly pokemonService: Pokemon2Service
  ) {}
  ngOnInit(): void {
    if (this.trainerService.trainer) {
      // this.pokemonService.fetchPokemons()
      this.pokemonService.fetchAllPokemons();
    }
  }
}
