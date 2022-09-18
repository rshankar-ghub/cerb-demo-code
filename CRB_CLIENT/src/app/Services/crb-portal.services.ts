import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class CRBPortalServices{
    private BASE_URL: string = 'http://localhost:4600/route';
    stringifiedData : any;
    prodStr : any;
    prodstr1 = [];
    constructor(private client: HttpClient){
    }
    getProd(){
        
        //alert(" invoking db function by calling http client .. localhost/4500 ...") 
        return this.client.get(this.BASE_URL)           
            .toPromise();                      
    }
   
}