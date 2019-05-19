import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/invoice';
import { CordaService } from 'src/app/services/corda.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  filter = '';

  invoices$: Observable<Invoice[]>;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private corda: CordaService
  ) {

  }

  ngOnInit() {
    // this.invoices$ = this.invoiceService.getInvoice();
    this.corda.createId();

    // this.find();
    
    }

    // find(){ 
    //   this.corda.getId().then(resp => {
    //     for (let bla in resp) {
    //       if (resp[bla].state.data.id.uid === '111.111.111-11') {
    //         console.log( resp[bla].state.data.id.uid)
    //       }; 
    //     }
    //   });
    //}

  // openDialogRegisterInvoice(): void {
  //   const dialogRef = this.dialog.open(RegisterInvoiceComponent, {
  //     panelClass: 'dialog-lg'
  //   });
    
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

  // cleanFilter() {
  //   this.filter = '';
  // }


}
