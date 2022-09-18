import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CRBPortalServices } from '../Services/crb-portal.services';

@Component({
  selector: 'app-crb-portal',
  templateUrl: './crb-portal.component.html',
  styleUrls: ['../../Shared/SCSS/paralex-cards.scss']
})

export class CRBPortalComponent implements OnInit {
  crbTitle: string = "CRB-PORTAL";

  stringifiedData : string; 
  cpserve : CRBPortalServices;
  httpRoute : Router;
  constructor(private route: Router,crbPortalServices : CRBPortalServices ) { 
    this.httpRoute = route;
    this.cpserve = crbPortalServices;
  }

  ngOnInit() {
  }
  processCRBUsers(){
    this.route.navigateByUrl('/crbusers');
  }
  processCRBOrders(){
    this.route.navigateByUrl('/crborders');
  }
}
