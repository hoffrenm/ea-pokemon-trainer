import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  @Input() trainerName: string | undefined = ""

  constructor() {

  }

  ngOnInit(): void {

  }


}
