import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { Trainer } from 'src/app/models/trainer.model';
import { CollectionService } from 'src/app/services/collection.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { TrainerService } from 'src/app/services/trainer.service';

//Component for profile page

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage implements OnInit {

  get username(): string | undefined {
    return this.trainerService.trainer?.username;
  }

  get trainersCollection(): Pokemon[] {
    return this.collectionService.trainerCollection
  }

  constructor(
    private readonly trainerService: TrainerService,
    private readonly collectionService: CollectionService
  ) {

  }

  ngOnInit(): void {
  }
}
