import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { PlansComponent } from './plans/plans.component';
import { DashboardComponent } from './dashboard.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { ResultComponent } from './result/result.component';
import { SolicitationComponent } from './solicitation/solicitation.component';
import { IdentityComponent } from './identity/identity.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ShareidComponent } from './shareid/shareid.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: InvoiceComponent
      },
      {
        path: 'solicitacao',
        component: PlansComponent
      },
      {
        path: 'qrcode',
        component: QrcodeComponent
      },
      {
        path: 'resultado',
        component: ResultComponent
      },
      {
        path: 'solicitado',
        component: SolicitationComponent
      },
      {
        path: 'identidade',
        component: IdentityComponent
      },
      {
        path: 'marketplace',
        component: MarketplaceComponent
      },
      {
        path: 'compartilhar-id',
        component: ShareidComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
export const routingComponents = [InvoiceComponent, PlansComponent];
