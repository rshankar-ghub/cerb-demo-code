import { Component, OnInit,EventEmitter,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'jquery-resizable-dom/dist/jquery-resizable'
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CRBManagerServices } from '../Services/crb-mgr.services';
import { CRBServiceHeaders } from '../models/crbServiceData';
import { Grid , GridApi, GridOptions,IDatasource, IGetRowsParams } from 'ag-grid-community';
import { Observable, of } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'crb-orders-manager',
  templateUrl: './crb-orders.component.html',
  styleUrls: ['./crb-orders.component.scss']
})
export class CRBOrdersComponent implements OnInit {
  stringifiedData : string; 
  crbServe : CRBManagerServices;
  httpRoute : Router;
  gridOptions : any;
  fileCfgGridOptions : GridOptions;
  private orderLoadHdr = new CRBServiceHeaders();
  columnDefs: any;
  rowData : any[]; 
  dtlColumnDefs: any;
  dtlRowData : any; 
  orderConfigRowData: any;
  orderConfigColDefs:any;
  gridApi : any;
  gridColumnApi : any;
  cfgGridApi:any;
  cfgGridColApi: any;
  currSelEmp: Number = 1;
  @ViewChild('ngxGrid') ngxGrid: AgGridAngular;

  constructor(private route: Router,crbServices:CRBManagerServices) 
  { 
      this.httpRoute = route;
      this.crbServe = crbServices;
      this.columnDefs = this.orderLoadHdr.CRBOrderDef;        
      this.gridOptions = {
        rowSelection: 'single',
        cacheBlockSize: 50,
        maxBlocksInCache: 2,
        enableServerSideFilter: false,
        enableServerSideSorting: false,
        rowModelType: 'infinite',
        pagination: true, 
        paginationAutoPageSize: true
      };
  }
  crbTreeDataSourceData : any;
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
    });
    this.getcrbHirearchyData();
    //alert(this.crbTreeDataSourceData);
  }
  onGridReady(params) {      
    console.log("onGridReady");
    var datasource = {
      getRows: (params: IGetRowsParams) => {
        console.log("Getting datasource rows, start: " + params.startRow + ", end: " + params.endRow);      
        this.crbServe.getCRBOrdersListFromDB(this.currSelEmp,params.startRow, params.endRow)
                  .subscribe(data => params.successCallback(JSON.parse(data.toString())));                
      }
    };
    params.api.setDatasource(datasource);    
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;        
    //this.selectFirstRow(this.gridApi);
  }
  
  onFirstDataRendered(params) {
    this.gridApi.getDisplayedRowAtIndex(0).setSelected(true);
    this.gridApi.getRowNode(0).selectThisNode(true);    
  }
  dataRowChanged(param){

  }
  getSelectedRowData(params) {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.data);    
    //alert(`Selected Nodes:\n${JSON.stringify(selectedData[0].FileLoadId)}`);
    this.getOrderDetailsFromService(selectedData[0].OrderID);       
    return selectedData;    
  }
  selectFirstRow(currGridApi){
    currGridApi.getDisplayedRowAtIndex(0).setSelected(true);
    currGridApi.getRowNode(0).selectThisNode(true);      
    this.getSelectedRowData("");     
  }
  getcrbHirearchyData() {
   
    //alert(" CRB master data maintenance service called here row data will be set ...===> Check ");    
    this.crbServe.getEmpHirearchyData().subscribe(result => 
        { //alert(JSON.stringify(JSON.parse(result.toString())));
          this.crbTreeDataSourceData = JSON.parse(result.toString());        
        },              
        error => { alert( " ERROR :-" + error); } );
  }
  getCRBOrdersDetails($event){
    alert($event.id);
    this.currSelEmp = $event.id;
    this.rowData = [];
  }
  getOrderDetailsFromService(OrderId: Number) {
    this.crbServe.getCRBOrderDtlListFromDB(OrderId,0,100).subscribe(result => 
      { 
        this.dtlColumnDefs = this.orderLoadHdr.CRBOrderDtlDef;
        this.dtlRowData =  JSON.parse(result.toString());
      },              
      error => { alert( " ERROR :-" + error); } );        
  }  
}
