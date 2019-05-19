// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { Invoice } from '../../models/invoice';
// import { environment } from './../../../environments/environment';
// import { catchError, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class InvoiceService {

//   readonly url = environment.APIEndpoint;

//   constructor(private http: HttpClient) { }

//   getInvoice(): Observable<Invoice[]> {
//     return this.http.get<Invoice[]>(`${this.url}/invoice`)
//       .pipe(
//         tap(c => console.log(c)),
//         catchError((err) => {
//           console.log(err);
//           return throwError(err);
//         })
//       );
//   }

//   registerInvoice(invoice: Invoice): Observable<Invoice> {
//     return this.http
//       .post<Invoice>(`${this.url}/invoice`, { invoice, session: localStorage.getItem('token') });
//   }


// }
