import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collection-update-button',
  templateUrl: './collection-update-button.component.html',
  styleUrls: ['./collection-update-button.component.css']
})
export class CollectionUpdateButtonComponent implements OnInit {

  @Input() pokemonName: string = ""

  constructor(
    private readonly collectionService: CollectionService
  ) {

  }

  ngOnInit(): void {

  }


  onClick(): void {
    this.collectionService.updateCollection(this.pokemonName).subscribe({
      next: (response: any) => {
        console.log("NEXT", response)

      }, error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message)
      }
    })
  }
}
