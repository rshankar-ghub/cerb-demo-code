import { Component, OnInit, NgZone,ViewChild,Directive } from '@angular/core';
import * as $ from 'jquery';
import 'jquery-resizable-dom/dist/jquery-resizable';
import { Router } from '@angular/router';
import { CRBManagerServices } from '../Services/crb-mgr.services';
import { CRBServiceHeaders } from '../models/crbServiceData';
//import { Grid , GridApi, GridOptions } from 'ag-grid-community';
import { Schema,JsonSchemaFormModule,JsonSchemaFormService, DefaultChoiceHandler} from "@dashjoin/json-schema-form";
import * as CRBUserForm from '../JSON-Schemas/crb_user_config.json';

//declare var $: any;
// Generic coldef and row def for ag-grid which will be used thruout the miodules. 
@Component({
  selector: 'app-crbusers',
  templateUrl: './crb-users.component.html',
  styleUrls: ['./crb-users.component.scss']
})
export class CRBUsersComponent implements OnInit {
  //gridOptions : GridOptions;
  private crbHeader = new CRBServiceHeaders();
  columnDefs: any;
  rowData : []; 
  paginationPageSize = 10;
  gridApi : any;
  gridColumnApi : any;
  selectedMenu : string; 

  formSchema: Schema = {};
  formValue: any; 
  formerror: string;

  stringifiedData : string; 
  crbServe : CRBManagerServices;
  httpRoute : Router;
  private funcMap;

  constructor(private route: Router,crbMstServices : CRBManagerServices) { 
      this.httpRoute = route;
      this.crbServe = crbMstServices;        
    }
    
    ngOnInit() {
      $(document).ready(function() {     
        
        $(".panel-left").resizable({
          handleSelector: ".splitter",
          resizeHeight: false
        });
      
        $(".panel-top").resizable({
          handleSelector: ".splitter-horizontal",
          resizeWidth: false,        
        });      
        //alert ( " form load completed ... ");     
      });                
      this.getDataFromCRBService(0,100); 
    
    }  
    getDataFromCRBService(startID: Number, endID: Number) {        
      this.selectedMenu = "USERS";          
      this.crbServe.getCRBUsersListFromDB(startID,endID).subscribe(result => 
        { 
          this.columnDefs = this.crbHeader.CRBUsersDef;    
          this.rowData =  JSON.parse(result.toString());
        },              
        error => { alert( " ERROR :-" + error); } );
    }  
    onGridReady(params) {      
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;        
      this.selectFirstRow()
    }
    onFirstDataRendered(params) {
      this.gridApi.getDisplayedRowAtIndex(0).setSelected(true);
      this.gridApi.getRowNode(0).selectThisNode(true);    
    }
    getSelectedRowData(params) {
      let selectedNodes = this.gridApi.getSelectedNodes();
      let selectedData = selectedNodes.map(node => node.data);    
      //alert(`Selected Nodes:\n${JSON.stringify(selectedData[0])}`);
      this.formValue = JSON.parse(JSON.stringify(selectedData[0]));       
      return selectedData;    
    }
    initControls() {
      
      this.formSchema = (CRBUserForm as any).default.formSchema;   
      this.formValue = JSON.parse(JSON.stringify((CRBUserForm as any).default.formValues));            
    }  
    AddNewRec(){    
      this.formValue = JSON.parse(JSON.stringify((this.funcMap.get(this.selectedMenu)[2] as any).default.formValues));
    }
    dataRowChanged(param){
      this.initControls();         
      this.selectFirstRow()
    }
    selectFirstRow(){
      this.gridApi.getDisplayedRowAtIndex(0).setSelected(true);
        this.gridApi.getRowNode(0).selectThisNode(true);      
        this.getSelectedRowData("")     
    }
}
