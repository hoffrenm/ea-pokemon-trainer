import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { TrainerService } from 'src/app/services/trainer.service';
import { StorageUtils } from 'src/app/utils/storage.utils';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  @Input() trainerName: string | undefined = "";

  constructor(
    private readonly router: Router,
    private readonly trainerService: TrainerService) { }

  ngOnInit(): void {

  }

  public handleLogout(): void {
    this.trainerService.trainer = undefined;
    StorageUtils.storageClearKey(StorageKeys.Trainer)
    this.router.navigateByUrl('/login');
  }
}
