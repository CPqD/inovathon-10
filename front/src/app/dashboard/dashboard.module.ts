import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule, routingComponents } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgMaterialModule } from '../ng-material/ng-material.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { ResultComponent } from './result/result.component';
import { SolicitationComponent } from './solicitation/solicitation.component';
import { IdentityComponent } from './identity/identity.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ShareidComponent } from './shareid/shareid.component';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
    NgMaterialModule,
    NgbModalModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    WebcamModule
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    routingComponents,
    QrcodeComponent,
    ResultComponent,
    SolicitationComponent,
    IdentityComponent,
    MarketplaceComponent,
    ShareidComponent,

  ],
})
export class DashboardModule { }
