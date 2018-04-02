import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { from } from 'rxjs/observable/from';
import 'rxjs/add/operator/map';

import { CompareMember } from './compare.member';
import { MemberVotes, InMemRecord } from './compare.votes';

@Injectable()
export class CompareMembersService {
    vresult;
    inTableCreated: boolean = false;

    constructor (private httpclient: HttpClient) {}

    getCompareSenateMembersPlain(firstID: string, secondID: string) : Observable<CompareMember> {
        let compareSenateMembersURL = 'https://api.propublica.org/congress/v1/members/' + firstID + '/votes/' + secondID + '/115/senate.json';
        return this.httpclient.get<CompareMember>(compareSenateMembersURL, httpOptions);
    }

    getCompareHouseMembersPlain(firstID: string, secondID: string) : Observable<CompareMember> {
        let compareHouseMembersURL = 'https://api.propublica.org/congress/v1/members/' + firstID + '/votes/' + secondID + '/115/house.json';
        return this.httpclient.get<CompareMember>(compareHouseMembersURL, httpOptions);
    }

    populateMemTable(memberIDs: string[], totVotes:number)  {
        let rowInserted: number = 0;
        let local_offset_value = 0
        var ids = Array<any>();

        let promise = new Promise((resolve, reject) => {
            memberIDs.forEach(element => {  
                for(
                    local_offset_value =0; 
                    local_offset_value <= totVotes; 
                    local_offset_value+=20 
                ){
                    ids.push(  {
                        id : element ,
                        offset : local_offset_value 
                    });
                }
            });

            forkJoin(this.generateAPICalls(ids)).subscribe(results => {
                this.vresult =[];

                results.forEach(one => {
                    var vote_data = one.results[0].votes;
                    let mem1or2 = memberIDs.indexOf(one.results[0].member_id);
                    mem1or2++;

                    vote_data.reduce((res, value)=> {
                        if (value.congress === '115') {                        
                            if (!res[value.bill.bill_id]) {
                                res[value.bill.bill_id] = {
                                    billid : value.bill.bill_id,
                                    description : value.description,
                                    congress: value.congress,
                                    memberid2: '',
                                    m1countYes : 0,
                                    m1countNo : 0,
                                    m2countYes: 0,
                                    m2countNo: 0,
                                    memberid1: '',
                                    m1countNV : 0,
                                    m2countNV : 0,
                                }
                                res[value.bill.bill_id].memberid1 = (mem1or2 == 1) ? value.member_id :'';
                                res[value.bill.bill_id].memberid2 = (mem1or2 == 2) ? value.member_id :'';
                                this.vresult.push(res[value.bill.bill_id]);
                            }
    
                            if ( value.position === 'Yes') {
                                res[value.bill.bill_id].m1countYes += (mem1or2 == 1) ? 1 :0;
                                res[value.bill.bill_id].m2countYes += (mem1or2 == 2) ? 1 :0;
                            }

                            if (value.position === 'No') {
                                res[value.bill.bill_id].m1countNo += (mem1or2 == 1) ? 1 :0;
                                res[value.bill.bill_id].m2countNo += (mem1or2 == 2) ? 1 :0;
                            }

                            if ( value.position !== 'No' && value.position !== 'Yes') {
                                res[value.bill.bill_id].m1countNV += (mem1or2 == 1) ? 1 :0;
                                res[value.bill.bill_id].m2countNV += (mem1or2 == 2) ? 1 :0;
                            }

                            return res;
                        }
                    }, {});
                });
                
                resolve( "Populate table...");
            });
            
        });

        return promise;
    }     
    
    generateAPICalls(ids: Array<query_int>): Observable<MemberVotes>[] {
        var apicalls=[];

        ids.forEach(e => {
            const myhttpOptions = {
                headers: new HttpHeaders({
                    'X-API-Key':  'jLo4tPcHFLExBAqXXM88X0P3dkEQEuSYnkZYmFsG'
                }),

                params: new HttpParams().set('offset', e.offset.toString())
            }

            let urlVotes = 'https://api.propublica.org/congress/v1/members/' + e.id +'/votes.json';
            let apicall = this.httpclient.get<MemberVotes>(urlVotes, myhttpOptions);
            apicalls.push(apicall);
        });
        
        return (apicalls);
    }

    querythetable(): Promise<any> {
          let promise = new Promise((resolve, reject) => {
            var groups =[] ;
            // this.vresult = this.vresult.filter(a =>
            //     a.congress === '115'
            // );   // set your own filter
            this.vresult.reduce((res, one)=> {
                if (!res[one.billid]) {
                    res[one.billid] = {
                        billid : one.billid,
                        description : one.description,
                        congress: one.congress,
                        m1countYes : 0,
                        m1countNo : 0,
                        m2countYes: 0,
                        m2countNo: 0,
                        m1countNV: 0,
                        m2countNV: 0
                    }
                    groups.push(res[one.billid]);
                }
                if (one.memberid1 ) {
                    res[one.billid].memberid1 = one.memberid1;
                }
                if ( one.memberid2 ) {
                    res[one.billid].memberid2 = one.memberid2;
                }
                res[one.billid].m1countYes += one.m1countYes;
                res[one.billid].m2countYes += one.m2countYes;
                res[one.billid].m1countNo += one.m1countNo;
                res[one.billid].m2countNo += one.m2countNo;
                res[one.billid].m1countNV += one.m1countNV;
                res[one.billid].m2countNV += one.m2countNV
                return res;
            }, {});
            // console.log( groups );
            var groups2 = groups.filter(a =>
                a.memberid1 && a.memberid2
            );
            // console.log(groups2.length);  
            // let sumofvotes =[0,0,0,0,0,0];
            // groups2.forEach(element=>{
            //     sumofvotes[0] += element.m1countYes;
            //     sumofvotes[1] += element.m1countNo;
            //     sumofvotes[2] += element.m2countYes;
            //     sumofvotes[3] += element.m2countNo;
            //     sumofvotes[4] += element.m1countNV;
            //     sumofvotes[5] += element.m2countNV;
            // });
            // console.log("New:",sumofvotes);
            // var source = from(groups2);
             resolve( groups2);
        //     // return source;
         });
          return promise;
    }

    emptyArray() {
        this.vresult = [];
    }
}

const httpOptions = {
    headers: new HttpHeaders({
      'X-API-Key':  'jLo4tPcHFLExBAqXXM88X0P3dkEQEuSYnkZYmFsG'
    })
}
export interface query_int {
    id:string,
    offset:number
}
