import { Component, OnInit,Input,Output,EventEmitter,AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'jquery-resizable-dom/dist/jquery-resizable'
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
interface FeedHierarchy {
    id: number;
    name: string;
    children?: FeedHierarchy[];
  }
  
  interface FlatNodeModel {
    expandable: boolean;
    id: number;
    name: string;  
    level: number;
  }
@Component({
    selector: 'fin-tree',    
    styles: [`mat-tree-node {
                min-height: 1.3em !important;
                height: 1.3em;
                text-indent: .5em;
                }`],
    template: `
                <mat-tree [dataSource]="treeDataSource" [treeControl]="treeControl">
                  <!-- This is the tree node template for leaf nodes -->
                  <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding matTreeNodePaddingIndent="10" style="font-size: medium;">
                    <!-- use a disabled button to provide padding for tree leaf -->
                    <button mat-icon-button disabled></button>
                    <span (click)="onNodeClick(node)" style="background-color: aqua;">{{node.name}}</span>
                  </mat-tree-node>
                  <!-- This is the tree node template for expandable nodes -->
                  <mat-tree-node *matTreeNodeDef="let node;when: hasChild" matTreeNodePadding matTreeNodePaddingIndent="10">
                    <button mat-icon-button matTreeNodeToggle
                            [attr.aria-label]="'toggle ' + node.name">
                        <mat-icon class="mat-icon-rtl-mirror">
                        {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
                        </mat-icon>
                    </button>
                    <span (click)="onOtherNodeClick(node)">{{node.name}}</span>               
                  </mat-tree-node>
                </mat-tree>`,
  })
  export class CRBTreeComponent implements OnInit,AfterViewInit,OnChanges {
  
    @Input() treeDataSourceData: any;    
    @Input() allowdLevels: number[];
    @Output() nodeClicked = new EventEmitter<any>();
    @Input() dataSource: any;    

    treeControl = new FlatTreeControl<FlatNodeModel>(
        node => node.level, node => node.expandable);      
    private _transformer = (node: FeedHierarchy, level: number) => {
        return {
          expandable: !!node.children && node.children.length > 0,
          name: node.name,
          id: node.id,
          level: level
        };
    }
    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children);      
    treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);  
    
    ngOnInit(): void {
        this.treeDataSource.data = this.treeDataSourceData;
    }    
    ngAfterViewInit() {
      this.treeDataSource.data = this.treeDataSourceData;
    }
    ngOnChanges(){
      this.treeDataSource.data = this.treeDataSourceData;
    }
    hasChild = (_: number, node: FlatNodeModel) => node.expandable;

    onNodeClick(node){
      this.nodeClicked.emit(node);
    }    
    onOtherNodeClick(node){
      if (this.allowdLevels.length > 0){
        if (this.allowdLevels.indexOf(node.level) !== -1){
          this.nodeClicked.emit(node);
        }
      }
    }  
  }
