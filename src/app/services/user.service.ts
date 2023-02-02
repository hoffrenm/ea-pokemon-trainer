import { Injectable } from '@angular/core';
import { User } from '../models/user/user';
import { StorageUtils } from '../utils/storage.util';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor() {
    this._user = StorageUtils.storageRead<User>('user');
  }

  private _user?: User;

  get user(): User | undefined {
    return this._user;
  }

  set user(user: User | undefined) {
    StorageUtils.storageSave<User>('user', user!);
    this._user = user;
  }
}
