import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { CollectionService } from 'src/app/services/collection.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-collection-update-button',
  templateUrl: './collection-update-button.component.html',
  styleUrls: ['./collection-update-button.component.css']
})
export class CollectionUpdateButtonComponent implements OnInit {

  @Input() pokemon?: Pokemon;

  get inCollection(): boolean {

    if (this.pokemon) {
      return this.trainerService.inCollection(this.pokemon.name)
    }
    else return false
  }

  constructor(
    private readonly collectionService: CollectionService,
    private readonly trainerService: TrainerService
  ) {

  }

  ngOnInit(): void {

  }


  onClick(): void {
    if (this.pokemon) {
      this.collectionService.updateCollection(this.pokemon.name).subscribe({
        next: (response: any) => {
        }, error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message)
        }
      })
    } else {
      console.log("cant update undefined")
    }

  }
}
