import { Component, OnInit,ChangeDetectionStrategy,Input,Output,EventEmitter,ViewChild } from '@angular/core';
import * as $ from 'jquery';
import 'jquery-resizable-dom/dist/jquery-resizable';
import { Router } from '@angular/router';
import { Grid , GridApi, GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-crb-grid',
  templateUrl: './crb-grid.component.html',
  styleUrls: ['./crb-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CRBGridComponent implements OnInit {
  @Input() gridOptions : GridOptions;
  @Input() columnDefs: any;
  @Input() rowData : []; 
  @Input() btntoolbar : boolean = false;
  @Input() dragtoolbar : boolean = false;
  @Input() editType : string = "";
  paginationPageSize = 20;
  
  // Raise events from the grid
  @Output() firstDataRendered = new EventEmitter<any>();
  @Output() gridReady = new EventEmitter<any>();
  @Output() dataRowChanged = new EventEmitter<any>();
  @Output() rowClicked = new EventEmitter<any>();
  @Output() cellValChanged = new EventEmitter<any>();
  // tool bar button events 
  @Output() addNewRec = new EventEmitter<any>();
  @Output() editRec = new EventEmitter<any>();
  @Output() deleteRec = new EventEmitter<any>();
  @Output() editStopped = new EventEmitter<any>();

  @ViewChild('ngxGrid') ngxGrid: AgGridAngular;
  constructor() { 
    if ( this.editType != "" ){
      this.gridOptions.editType = this.editType;
    }
  }

  ngOnInit(): void {
  }
  onGridReady(params) {          
    this.gridReady.emit(params);
  }
  onFirstDataRendered(params) {
   this.firstDataRendered.emit(params);
  }
  onRowClicked(params) {
    this.rowClicked.emit(params);
  }
  onDataRowChanged(params) {
    this.dataRowChanged.emit(params);
  }
  onAddNewRec(params) {    
    this.addNewRec.emit(params);
  }
  onEditRec(param) {    
    this.editRec.emit(param);
  }
  onDeleteRec(param) {    
    this.deleteRec.emit(param);
  }

  onMoveUpRec(param) {    
    
  }
  onMoveDownRec(param){    
    
  }
  onRowEditingStopped(param){
    this.editStopped.emit(param);
  }
  onCellValueChanged(param){
    this.cellValChanged.emit(param);
  }
  
}
