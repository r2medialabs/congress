import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SenateMember, Member } from './senate.member';

@Injectable()
export class SenateMemberService {

    private senateMembersURL = 'https://api.propublica.org/congress/v1/115/senate/members.json';

    constructor (private httpclient: HttpClient) {}

    // getSenateMembers(): Observable<Member[]> {
    //     return this.httpclient.get<SenateMember>(this.senateMembersURL, httpOptions)
    //     .map(senateMember => senateMember.results[0].members);
    // }

    getSenateMembersPlain() : Observable<SenateMember> {
        return this.httpclient.get<SenateMember>(this.senateMembersURL, httpOptions);
    }

} 

const httpOptions = {
    headers: new HttpHeaders({
      'X-API-Key':  'jLo4tPcHFLExBAqXXM88X0P3dkEQEuSYnkZYmFsG'
    })
}
