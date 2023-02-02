import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-profile-collection',
  templateUrl: './profile-collection.component.html',
  styleUrls: ['./profile-collection.component.css']
})
export class ProfileCollectionComponent implements OnInit {

  // @Input() pokemons: Pokemon[] | null = []
  @Input() collection: string[] | null = []

  constructor() {

  }

  ngOnInit(): void {

  }

}
