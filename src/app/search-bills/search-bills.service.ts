import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SearchBill, Bill } from './search.bills';

@Injectable()
export class SearchBillService {

    
    constructor (private httpclient: HttpClient) {}
        
    getSearchBillsPlain(searchTerm: string) : Observable<SearchBill> {
        let searchBillsURL = 'https://api.propublica.org/congress/v1/bills/search.json?query="'+ searchTerm +'"';
        return this.httpclient.get<SearchBill>(searchBillsURL, httpOptions);
    }

} 

const httpOptions = {
    headers: new HttpHeaders({
      'X-API-Key':  'jLo4tPcHFLExBAqXXM88X0P3dkEQEuSYnkZYmFsG'
    })
}
