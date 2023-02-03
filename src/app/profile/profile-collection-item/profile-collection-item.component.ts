import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';

@Component({
  selector: 'app-profile-collection-item',
  templateUrl: './profile-collection-item.component.html',
  styleUrls: ['./profile-collection-item.component.css'],
})
export class ProfileCollectionItemComponent implements OnInit {
  //@Input() pokemon: Pokemon | undefined = undefined
  // @Input() collectionItem: string = '';
  @Input() pokemon: Pokemon = { id: 0, name: "", imageUrl: "" };

  constructor() { }

  ngOnInit(): void { }
}
