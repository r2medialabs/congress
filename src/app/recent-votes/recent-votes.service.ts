import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RecentVotes, Votes, Bill, Amendment, Democratic, Republican, Independent, Total } from './recent.votes';

@Injectable()
export class RecentVotesService {

    private recentVotesURL = "https://api.propublica.org/congress/v1/both/votes/recent.json";

    constructor (private httpclient: HttpClient) {}

    getRecentVotesPlain() : Observable<RecentVotes> {
        return this.httpclient.get<RecentVotes>(this.recentVotesURL, httpOptions);
    }

}

const httpOptions = {
    headers: new HttpHeaders({
      'X-API-Key':  'jLo4tPcHFLExBAqXXM88X0P3dkEQEuSYnkZYmFsG'
    }),

    params: new HttpParams().set('offset', '0')
}
