import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { MaterialModule } from '../Shared/Components/meterial.modules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent } from './login/login.component';
import { CRBPortalComponent } from './crb-portal/crb-portal.component';
import { AgGridModule } from 'ag-grid-angular';
/****** CRB code base refs ****************************************/
import { CRBUsersComponent } from './crb-users/crb-users.component';
import { CRBOrdersComponent } from './crb-orders/crb-orders.component';
import { CRBManagerServices } from './Services/crb-mgr.services';
/****** CRB code base refs ****************************************/
import  { HttpClientModule } from '@angular/common/http';
import { CRBPortalServices } from './Services/crb-portal.services';
import { CommonService } from './Services/common.services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonSchemaFormModule } from '@dashjoin/json-schema-form';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CRBGridComponent } from './common/crb-grid/crb-grid.component';
import { CRBTreeComponent } from './common/crb-tree/crb-tree.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CRBPortalComponent,
    CRBGridComponent,
    CRBTreeComponent,
    CRBUsersComponent,
    CRBOrdersComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    FormsModule, 
    JsonSchemaFormModule,
    CommonModule
  ],
  providers: [
    CRBPortalServices,
    CommonService,
    CRBManagerServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
