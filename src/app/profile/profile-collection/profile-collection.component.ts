import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { TrainerService } from 'src/app/services/trainer.service';

//Component for generating collection items using catalogue-list-item component

@Component({
  selector: 'app-profile-collection',
  templateUrl: './profile-collection.component.html',
  styleUrls: ['./profile-collection.component.css'],
})
export class ProfileCollectionComponent implements OnInit {

  get collectionSize(): number | undefined {
    if (this.service.trainer)
      return this.service.trainer?.pokemon.length
    return undefined
  }

  @Input() collection: Pokemon[] = [];

  constructor(private service: TrainerService) { }

  ngOnInit(): void { }
}
