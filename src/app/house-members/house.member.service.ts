import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HouseMember, Member } from './house.member';

@Injectable()
export class HouseMemberService {

    private houseMembersURL = 'https://api.propublica.org/congress/v1/115/house/members.json';

    constructor (private httpclient: HttpClient) {}

    // getHouseMembers(): Observable<Member[]> {
    //     return this.httpclient.get<HouseMember>(this.houseMembersURL, httpOptions)
    //     .map(houseMember => houseMember.results[0].members);
    // }

    getHouseMembersPlain() : Observable<HouseMember> {
        return this.httpclient.get<HouseMember>(this.houseMembersURL, httpOptions);
    }

}

const httpOptions = {
    headers: new HttpHeaders({
      'X-API-Key':  'jLo4tPcHFLExBAqXXM88X0P3dkEQEuSYnkZYmFsG'
    })
}
