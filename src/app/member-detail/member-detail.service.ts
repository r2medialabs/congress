import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SpecificMember } from './specific.member';

@Injectable()
export class SpecificMemberService {

    constructor (private httpclient: HttpClient) {}

    getSpecificMembersPlain(selectedID: string) : Observable<SpecificMember> {
        let specificMembersURL = 'https://api.propublica.org/congress/v1/members/' + selectedID + '.json';
        return this.httpclient.get<SpecificMember>(specificMembersURL, httpOptions);
    }

}

const httpOptions = {
    headers: new HttpHeaders({
      'X-API-Key':  'jLo4tPcHFLExBAqXXM88X0P3dkEQEuSYnkZYmFsG'
    })
}
