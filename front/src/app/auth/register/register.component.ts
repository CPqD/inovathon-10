import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatStepper } from '@angular/material';
import { User } from '../../models/user';
import { MustMatch } from '../register/_helpers/must-match.validators';
import { ExistingEmails } from '../register/_helpers/existing-emails.validators';
import { CpfCnpj } from './_helpers/cpfCnpj.validators';
import { CepQueryService } from '../../services/cep-query.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  
  }

}
