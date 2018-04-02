import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RecentIntroduced } from './recent.introduced';

@Injectable()
export class RecentIntroducedService {

    private recentIntroducedURL = "https://api.propublica.org/congress/v1/115/both/bills/introduced.json";

    constructor (private httpclient: HttpClient) {}

    getRecentIntroducedPlain() : Observable<RecentIntroduced> {
        return this.httpclient.get<RecentIntroduced>(this.recentIntroducedURL, httpOptions);
    }

}

const httpOptions = {
    headers: new HttpHeaders({
      'X-API-Key':  'jLo4tPcHFLExBAqXXM88X0P3dkEQEuSYnkZYmFsG'
    })
}
