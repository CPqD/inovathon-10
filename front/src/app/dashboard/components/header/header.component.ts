import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$: User;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

}
