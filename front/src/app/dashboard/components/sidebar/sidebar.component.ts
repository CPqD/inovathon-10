import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user$: User = {
    'birthdate': '7781-10-21',
    'identificationNumber': '39525663817',
    'address': {
      'street': 'occaecat in',
      'number': 'ullamco in',
      'district': 'elit',
      'cep': '68409454',
      'complement': 'complemento',
      'city': 'cidade',
      'state': 'estado'
    },
    'name': 'username',
    'municipalRegistration': 47476048,
    'notificationURL': 'sit dolor in Ut eu',
    'stateRegistration': -41682635,
    'phoneNumbers': [
      {
        'type': 'residential',
        'number': '86'
      }
    ],
    'email': '9a5M_l07jf@jF7foydEiF.QyoGX',
    'password': null,
    'hasDigitalAccount': false,
    'token': null,
    'person': null,
    'confirmPassword': null
  };

  constructor(
  ) { }

  ngOnInit() {
    
  }

}
