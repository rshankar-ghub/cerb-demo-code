import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent } from './login/login.component';
import {HomeComponent} from './home/home.component';
import {CRBPortalComponent} from './crb-portal/crb-portal.component';
/****** CRB code base refs ****************************************/
import { CRBUsersComponent } from './crb-users/crb-users.component';
import { CRBOrdersComponent } from './crb-orders/crb-orders.component';
/****** CRB code base refs ****************************************/

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'login' , component:LoginComponent},
  { path: 'crbportal', component:CRBPortalComponent},
  { path: 'crbusers' , component:CRBUsersComponent},
  { path: 'crborders', component:CRBOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
