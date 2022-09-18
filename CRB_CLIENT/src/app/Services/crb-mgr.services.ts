import {Injectable, Output} from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable,of } from 'rxjs';
import { CommonService } from './common.services';

@Injectable()
export class CRBManagerServices{
    private BASE_URL: string = 'http://localhost:4700/';
    constructor(private client: HttpClient, private commonService: CommonService){
    }
    public getCRBUsersListFromDB(startId: Number,endId: Number): Observable<string> {  
        let crbParams = new HttpParams().set('paramid', "0")
                                         .set('startid', startId.toString())
                                         .set('endid', endId.toString());
        return this.client.get<string>(this.BASE_URL + "crbUsers",{params:crbParams, responseType: 'json'})
    }
    public getCRBOrdersListFromDB(empId: Number, startId: Number,endId: Number): Observable<string> {  
        //alert( " I am firing rest service here ")
        let crbParams = new HttpParams().set('paramid', empId.toString())
                                         .set('startid', startId.toString())
                                         .set('endid', endId.toString());
        return this.client.get<string>(this.BASE_URL + "crborders",{params:crbParams, responseType: 'json'})
    }
    public getCRBOrderDtlListFromDB(orderId: Number,startId: Number,endId: Number): Observable<string> {  
        let crbParams = new HttpParams().set('paramid', orderId.toString())
                                        .set('startid', startId.toString())
                                         .set('endid', endId.toString());
        return this.client.get<string>(this.BASE_URL + "crborderdetails",{params:crbParams, responseType: 'json'})
    }
    public getEmpHirearchyData(): Observable<string> {               
        return this.client.get<string>(this.BASE_URL + "empHierList",{responseType: 'json'})
    }
}