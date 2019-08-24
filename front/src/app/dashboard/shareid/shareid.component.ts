import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CordaService } from 'src/app/services/corda.service';
@Component({
  selector: 'app-shareid',
  templateUrl: './shareid.component.html',
  styleUrls: ['./shareid.component.scss']
})
export class ShareidComponent implements OnInit {

  constructor(    private corda: CordaService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  find() {
    this.corda.getId().then(resp => {
      for (let bla in resp) {
        if (resp[bla].state.data.id.uid === '123.456.789-10') {
          console.log( resp[bla].state.data)
          this.router.navigateByUrl('/dashboard/solicitado');
        }; 
      }
    });


  // public triggerSnapshot(): void {
  //   this.trigger.next();
  // }

}

}
