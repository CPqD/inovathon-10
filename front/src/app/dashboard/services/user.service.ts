// import { Injectable } from '@angular/core';
// import { environment } from './../../../environments/environment';
// import { Observable, throwError } from 'rxjs';
// import { User } from '../../models/user';
// import { HttpClient } from '@angular/common/http';
// import { tap, catchError, map } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   readonly url = environment.APIEndpoint;
//   session = localStorage.getItem('token');

//   constructor(private http: HttpClient) { }

//   getUser(): Observable<User> {
//     return this.http.get<any>(`${this.url}/user?session=${this.session}`)
//       .pipe(
//         map(body => body.user),
//       );
//   }
// }
