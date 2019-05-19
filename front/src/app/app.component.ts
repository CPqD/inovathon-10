import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authenticated$: Observable<boolean>;
  user$: Observable<User>;

  constructor() {
  }
}
